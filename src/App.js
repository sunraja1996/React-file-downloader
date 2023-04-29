import React, { useState } from 'react';
import './App.css'
import DownloadIcon from '@mui/icons-material/Download';
import FileDownloadDoneIcon from '@mui/icons-material/FileDownloadDone';

function App() {
  const [fileUrl, setFileUrl] = useState('');
  const [downloadBtnText, setDownloadBtnText] = useState('Download File');

  const fetchFile = (url) => {
    fetch(url)
      .then((res) => res.blob())
      .then((file) => {
        const tempUrl = URL.createObjectURL(file);
        const aTag = document.createElement('a');
        aTag.href = tempUrl;
        aTag.download = url.replace(/^.*[\\\/]/, '');
        document.body.appendChild(aTag);
        aTag.click();
        setDownloadBtnText('Download File');
        URL.revokeObjectURL(tempUrl);
        aTag.remove();
      })
      .catch(() => {
        alert('Failed to download file!');
        setDownloadBtnText("Download File");
      });
  };

  const handleDownload = (e) => {
    e.preventDefault();
    setDownloadBtnText("Downloading file...");
    fetchFile(fileUrl);
  };

  return (
    <div className="wrapper">
      <header>
        <h1>File Downloader</h1>
        <p>Paste url of image, video, or pdf to download.</p>
      </header>
      <form onSubmit={handleDownload}>
        <input
          type="url"
          placeholder="Paste file url"
          required
          value={fileUrl}
          onChange={(e) => setFileUrl(e.target.value)}
        />
        <button> <DownloadIcon/> {downloadBtnText}</button>
      </form>
    </div>
  );
}

export default App;
