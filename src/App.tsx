import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import QRCode from "./pages/QRCode";
import DownloadPage from "./pages/DownloadPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QRCode />} />
        <Route path="/download" element={<DownloadPage />} />
      </Routes>
    </Router>
  );
};

export default App;
