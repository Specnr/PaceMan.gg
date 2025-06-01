import { useState } from "react";
import Link from "./Link";
import { getTwitchOAuthURL } from "./twitch/Twitch-OAuth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function Modal({ onClose }: { onClose: () => void }) {
  const [authToken, setAuthToken] = useState("");

  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-[100] outline-none focus:outline-none bg-gray-900/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md mx-auto slide-in">
        <div className="bg-gray-800/90 text-white border border-gray-700 rounded-xl shadow-xl relative flex flex-col w-full outline-none focus:outline-none">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-gray-700">
            <h3 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-indigo-500">
              <FontAwesomeIcon icon={faKey} className="mr-2" />
              Generate Access Token
            </h3>
            <button
              onClick={onClose}
              className="w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-700 transition-colors duration-200 text-gray-400 hover:text-white"
              aria-label="Close modal"
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6">
            <p className="text-gray-300 mb-4 text-sm">
              Enter your Minecraft Auth Token to generate an access token for PaceMan.
            </p>
            <div className="mb-6">
              <input
                className="w-full bg-gray-700 text-white border border-gray-600 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                placeholder="Minecraft Auth Token"
                value={authToken}
                onChange={(e) => setAuthToken(e.target.value)}
              />
              <p className="mt-2 text-xs text-gray-400">
                Your token should be 6 characters long
              </p>
            </div>

            {/* Footer */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                link="https://auth.aristois.net/auth"
                variant="subtle"
                className="text-sm"
              >
                Get a Minecraft Auth Token
              </Link>
              
              <a
                className={`inline-flex items-center justify-center px-4 py-2 rounded-md font-medium shadow-sm transition-all duration-200 ${
                  authToken.length === 6
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white hover:shadow-purple-500/20"
                    : "bg-gray-700 text-gray-400 cursor-not-allowed"
                }`}
                href={
                  authToken.length === 6
                    ? getTwitchOAuthURL(authToken).toString()
                    : "#"
                }
              >
                Generate Token
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
