// src/components/FileDownloadButton.jsx
import React from "react";
import { FaFilePdf, FaFileWord } from "react-icons/fa";

export default function FileDownloadButton({ fileName, fileType, downloadUrl }) {
  const Icon = fileType === "pdf" ? FaFilePdf : FaFileWord;

  return (
    <a
      href={downloadUrl}
      download
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center gap-3 p-4 bg-gray-100 hover:bg-gray-200 transition rounded-lg shadow-sm"
    >
      <Icon className="text-red-500 text-xl" />
      <span className="font-semibold text-gray-800">{fileName}</span>
    </a>
  );
}
