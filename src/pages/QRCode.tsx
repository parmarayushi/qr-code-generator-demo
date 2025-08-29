import React, { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QRCode: React.FC = () => {
  const [selectedType, setSelectedType] = useState<"URL" | "TEXT" | "FILE">(
    "URL"
  );
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [qrValue, setQrValue] = useState("");

  const handleGenerate = () => {
    if (selectedType === "URL") {
      if (!url.trim()) {
        alert("Please enter a URL");
        return;
      }
      const value = url.startsWith("http") ? url : `https://${url}`;
      setQrValue(value);
    } else if (selectedType === "TEXT") {
      if (!text.trim()) {
        alert("Please enter some text");
        return;
      }
      setQrValue(text.trim());
    } else if (selectedType === "FILE") {
      if (!file) {
        alert("Please upload a file");
        return;
      }
      // Create a temporary URL for the file
      const blobUrl = URL.createObjectURL(file);
      // Pass blobUrl as query param
      const downloadLink = `${
        window.location.origin
      }/download?file=${encodeURIComponent(blobUrl)}&name=${encodeURIComponent(
        file.name
      )}`;
      setQrValue(downloadLink);
    }
  };

  return (
    <section className="flex flex-col items-center justify-center h-full p-6">
      <h1 className="text-4xl font-bold mb-5">QR Code Generator Demo</h1>

      <div className="grid grid-cols-2 items-center gap-5">
        <div className="flex flex-col items-center">
          {/* Select Type */}
          <div className="mb-4">
            {["URL", "TEXT", "FILE"].map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type as any)}
                className={`cursor-pointer px-4 py-2 mr-2 rounded ${
                  selectedType === type
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Input */}
          {selectedType === "URL" && (
            <input
              type="text"
              placeholder="Enter website URL"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="border p-2 w-80 rounded mb-4"
            />
          )}
          {selectedType === "TEXT" && (
            <textarea
              placeholder="Enter some text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              className="border p-2 w-80 rounded mb-4"
            />
          )}
          {selectedType === "FILE" && (
            <input
              type="file"
              onChange={(e) =>
                setFile(e.target.files ? e.target.files[0] : null)
              }
              className="border p-2 rounded w-80 mb-4"
            />
          )}

          {/* Generate Button */}
          <div>
            <button
              onClick={handleGenerate}
              className="px-6 py-2 bg-green-600 text-white rounded"
            >
              Generate QR Code
            </button>
          </div>
        </div>

        {/* QR Display */}
        <div className="flex flex-col items-center">
          {qrValue ? (
            <>
              <QRCodeCanvas value={qrValue} size={250} includeMargin />
              <p className="mt-2 text-sm break-all text-gray-600">{qrValue}</p>
            </>
          ) : (
            <p className="text-gray-500">No QR code yet</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default QRCode;
