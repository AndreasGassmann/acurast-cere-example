import { useState } from 'react';

function FileUploader({ onFileUpload, disabled }) {
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file?.name.toLowerCase().endsWith('.heic')) {
      onFileUpload(file);
    } else {
      alert('Please upload a HEIC file');
    }
    setDragging(false);
  };

  const handleClick = () => {
    if (!disabled) {
      document.querySelector('input[type="file"]').click();
    }
  };

  return (
    <div
      className={`upload-area ${dragging ? 'dragging' : ''}`}
      onDragOver={(e) => e.preventDefault()}
      onDragEnter={() => setDragging(true)}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={handleClick}
      style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <input
        type="file"
        accept=".heic"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileUpload(file);
        }}
        disabled={disabled}
        style={{ display: 'none' }}
      />
      <p>Drag and drop a HEIC file here, or click to select</p>
    </div>
  );
}

export default FileUploader;