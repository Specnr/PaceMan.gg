"use client"
import { useState } from "react"

export default function TokenPage({ params }: { params: { token: string } }) {
  const [btnTxt, setBtnTxt] = useState("Click to copy")

  return (
    <div>
      <p>
        Here is your access token for PaceMan, please keep it a secret!
      </p>
      <p className="py-4 text-3xl">
        { params.token }
      </p>
      <div className="pb-4">
        <button
          onClick={() => {
            navigator.clipboard.writeText(params.token)
            setBtnTxt("Copied!")
            setTimeout(() => setBtnTxt("Click to copy"), 2000);
          }}
          className="text-xs bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-3 border border-purple-700 rounded">
          {btnTxt}
        </button>
      </div>
    </div>
  );
};