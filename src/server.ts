import express, { Request, Response, NextFunction } from "express";
import localtunnel from "localtunnel";

const LOCALTUNNEL_SUBDOMAIN = "heic-to-png-test";
const LOCALTUNNEL_HOST = "https://processor-proxy.sook.ch/";
const LOCAL_PORT = 3000;

const app = express();
app.use(express.json());

// Logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

app.get("/", (req: Request, res: Response) => {
  res.type("html");
  res.send(require("./public/index.html"));
});

app.get("/assets/index-Do1G2Y9F.js", (req: Request, res: Response) => {
  res.type("application/javascript");
  res.send(require("./public/assets/index-Do1G2Y9F.js"));
});

app.get("/debug", (req: Request, res: Response) => {
  res.send("Hello World");
});

// Serve static files from the dist directory
app.use(express.static("public"));

const startTunnel = async () => {
  try {
    const tunnel = await localtunnel({
      subdomain: LOCALTUNNEL_SUBDOMAIN,
      host: LOCALTUNNEL_HOST,
      port: LOCAL_PORT,
    });

    console.log("Tunnel started at", tunnel.url);

    tunnel.on("error", (err) => {
      console.error("Tunnel error:", err);
    });

    tunnel.on("close", () => {
      console.log("Tunnel closed");
    });
  } catch (error) {
    console.error("Failed to start tunnel:", error);
    process.exit(1);
  }
};

const server = app.listen(LOCAL_PORT, () => {
  console.log(`Server listening on port ${LOCAL_PORT}!`);
});

server.on("error", (error) => {
  console.error("Server error:", error);
});

startTunnel().catch(console.error);

export default app;
