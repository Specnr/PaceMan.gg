"use client"
import { useEffect, useState } from "react"
import Title from "@/components/Title";

export default function TokenPage({ params }: { params: { token: string } }) {
  const [btnTxt, setBtnTxt] = useState("Click to copy");
  const [code, setCode] = useState("Loading...");

  useEffect(() => {
    setCode(window.atob(decodeURIComponent(params.token)));
  }, [params.token]);

  return (
    <div className="container-height">
      <div className="pt-16">
        <Title />
        <p className="invisible h-0 md:h-auto md:pt-4 md:visible">
          Here is your access token for PaceMan, please keep it a secret!
        </p>
      </div>
      <div className="grid h-4/6 place-items-center">
        <div>
          <p className="py-4 text-3xl">
            <span className="text-gray-950 bg-gray-950 rounded-md">
              { code }
            </span>
          </p>
          <div className="pb-4">
            <button
              onClick={() => {
                if (code !== "Loading...") {
                  navigator.clipboard.writeText(code)
                  setBtnTxt("Copied!")
                  setTimeout(() => setBtnTxt("Click to copy"), 2000);
                }
              }}
              className="text-xs bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 border border-purple-700 rounded">
              {btnTxt}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};