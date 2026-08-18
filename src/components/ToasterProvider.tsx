"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#07402E",
          color: "#fff",
          fontSize: "14px",
          borderRadius: "10px",
        },
      }}
    />
  );
}
