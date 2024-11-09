import { useState } from 'react';
import FileUploader from './components/FileUploader';
import { uploadFile } from './utils/ddc-client.jsx'; // добавьте расширение .jsx

function App() {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const handleFileUpload = async (file) => {
    try {
      setIsUploading(true);
      const result = await uploadFile(file);
      console.log('File uploaded successfully:', result);
      setUploadedFile({
        name: file.name,
        cid: result.cid,
        url: `https://storage.mainnet.cere.network/1052/${result.cid}`
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="container">
      <h1>HEIC to PNG Converter</h1>
      <FileUploader onFileUpload={handleFileUpload} disabled={isUploading} />
      {isUploading && <p>Uploading...</p>}
      {uploadedFile && !isUploading && (
        <div>
          <p>File uploaded successfully!</p>
          <p>CID: {uploadedFile.cid}</p>
          <a href={uploadedFile.url} target="_blank" rel="noopener noreferrer">
            View uploaded file
          </a>
        </div>
      )}
    </div>
  );
}

export default App;