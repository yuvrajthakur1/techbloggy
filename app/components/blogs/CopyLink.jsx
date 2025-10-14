import { useState } from "react";

export default function CopyLinkButton() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const url = window.location.href; // current page URL
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500); // 1.5s message
  };

  return (
    <button
      onClick={handleCopy}
      className="ml-auto px-4 py-2 bg-[#708993]/40 text-white rounded hover:bg-[#A1C2BD]/60 transition font-semibold"
    >
      {copied ? "Link Copied!" : "Copy Link"}
    </button>
  );
}
