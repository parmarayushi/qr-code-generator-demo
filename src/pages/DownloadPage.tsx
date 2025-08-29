import React from "react";
import { useSearchParams } from "react-router-dom";

const DownloadPage: React.FC = () => {
  const [params] = useSearchParams();
  const fileUrl = params.get("file");
  const fileName = params.get("name");

  if (!fileUrl) {
    return <p className="p-6 text-red-600">No file to download</p>;
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Download File</h1>
      <a
        href={fileUrl}
        download={fileName || "downloaded-file"}
        className="px-6 py-2 bg-blue-600 text-white rounded"
      >
        Download {fileName || "File"}
      </a>
    </section>
  );
};

export default DownloadPage;
