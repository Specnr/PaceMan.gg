import { useState } from "react";

import Link from "./Link";
import { getTwitchOAuthURL } from "./twitch/Twitch-OAuth";

export default function Modal({ onClose }: { onClose: () => void }) {
  const [authToken, setAuthToken] = useState("");

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-xl my-6 mx-auto max-w-3xl">
        <div className="bg-gray-700 text-white border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none transition ease-in-out delay-150">
          <div className="flex items-start justify-between p-5">
            <h3 className="text-3xl font-semibold">Generate Access Token</h3>
            <button
              onClick={onClose}
              className="w-5 h-5 flex justify-center items-center ml-48 text-3xl hover:text-red-500"
            >
              ×
            </button>
          </div>

          <div className="relative p-6 flex-auto">
            <input
              className="shadow appearance-none border rounded w-80 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              placeholder="Minecraft Auth Token"
              value={authToken}
              onChange={(e) => setAuthToken(e.target.value)}
            />
          </div>
          <div className="text-sm">
            <a
              className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 border border-purple-700 rounded"
              href={
                authToken.length === 6
                  ? getTwitchOAuthURL(authToken).toString()
                  : "#"
              }
            >
              Submit
            </a>
          </div>

          <div className="flex items-right justify-start p-6 text-xs">
            <p>
              <Link link="https://auth.aristois.net/auth">Click here</Link> to
              get a Minecraft Auth Token.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
