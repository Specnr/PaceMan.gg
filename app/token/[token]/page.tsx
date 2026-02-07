"use client";
import { use, useEffect, useState } from "react";
import Title from "@/components/Title";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faCheck } from "@fortawesome/free-solid-svg-icons";

export default function TokenPage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = use(params);
  const [btnTxt, setBtnTxt] = useState("Copy to clipboard");
  const [copied, setCopied] = useState(false);
  const [code, setCode] = useState("Loading...");

  useEffect(() => {
    setCode(window.atob(decodeURIComponent(token)));
  }, [token]);

  const handleCopy = () => {
    if (code !== "Loading...") {
      navigator.clipboard.writeText(code);
      setBtnTxt("Copied!");
      setCopied(true);
      setTimeout(() => {
        setBtnTxt("Copy to clipboard");
        setCopied(false);
      }, 2000);
    }
  };

  return (
    <div className="container-height">
      <div className="pt-16">
        <Title titleOverrite="Your Access Token" />
        <p className="text-center text-lg text-gray-300 -mt-4 mb-8 fade-in">
          Please keep this token secure and don&apos;t share it with others
        </p>
      </div>
      <div className="flex flex-col items-center justify-center flex-1">
        <div className="bg-gray-800/90 border border-gray-700 rounded-xl shadow-xl p-8 max-w-md w-full slide-in">
          <h2 className="text-xl font-semibold text-gray-200 mb-4">PaceMan Access Token</h2>

          <div className="bg-gray-900 border border-gray-700 rounded-md p-4 mb-6 overflow-x-auto">
            <p className="font-mono text-lg break-all text-gray-950 bg-gray-950">{code}</p>
          </div>

          <button
            onClick={handleCopy}
            className={`
              inline-flex items-center justify-center px-4 py-2 rounded-md 
              font-medium shadow-sm transition-all duration-200 w-full
              ${copied
                ? "bg-green-600 hover:bg-green-700"
                : "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
              }
              text-white hover:shadow-purple-500/20
            `}
            disabled={code === "Loading..."}
          >
            <FontAwesomeIcon icon={copied ? faCheck : faCopy} className="mr-2" />
            {btnTxt}
          </button>
        </div>
      </div>
    </div>
  );
}
