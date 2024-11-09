import { DdcClient, File, MAINNET } from '@cere-ddc-sdk/ddc-client';
import { JsonSigner } from '@cere-ddc-sdk/blockchain'; 
import { ddcConfig } from '../../config/ddc.config';
import { keyData } from '../../config/keys.config';

let ddcClient = null;

const PASSWORD = "11111111"; 

export async function initializeDDC() {
  if (!ddcClient) {
    try {
      const signer = new JsonSigner(keyData, PASSWORD);
      
      await signer.unlock(PASSWORD);
      await signer.isReady();
      
      console.log("Signer initialized and unlocked successfully");
      
      ddcClient = await DdcClient.create(signer, {
        ...MAINNET,
        blockchain: "wss://archive.mainnet.cere.network/ws",
        baseUrl: "https://storage.mainnet.cere.network",
        logLevel: 'debug'
      });

      console.log("DDC Client initialized successfully");
      
      const balance = await ddcClient.getBalance();
      console.log("Account balance:", balance.toString());
      
    } catch (error) {
      console.error("Failed to initialize DDC client:", error);
      throw error;
    }
  }
  return ddcClient;
}

export async function uploadFile(file) {
  try {
    const client = await initializeDDC();
    
    const fileStream = file.stream();
    const ddcFile = new File(fileStream, { 
      size: file.size,
      name: file.name
    });

    console.log("Uploading file to bucket:", ddcConfig.bucketId);

    const result = await client.store(
      BigInt(ddcConfig.bucketId),
      ddcFile
    );

    console.log("Upload result:", result);
    
    return {
      cid: result.cid,
      bucketId: ddcConfig.bucketId
    };
  } catch (error) {
    console.error('Error in uploadFile:', error);
    throw error;
  }
}