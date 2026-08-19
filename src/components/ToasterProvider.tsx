"use client";

import { Toaster } from "react-hot-toast";

export default function ToasterProvider() {
  return (
    <Toaster
      position="top-center"
      toastOptions={{
        style: {
          background: "#200608",
          color: "#fff",
          fontSize: "14px",
          borderRadius: "10px",
        },
      }}
    />
  );
}
