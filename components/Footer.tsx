"use client";
import { useState } from "react";

import Link from "./Link";
import Modal from "@/components/Modal";

const Footer = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <div className="text-xs pb-1">
        <div className="mb-2 invisible lg:visible">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 border border-purple-700 rounded"
            onClick={() => setShowAuthModal(true)}
          >
            Generate Access Token
          </button>
        </div>
        <Link link="/aa">AA</Link>
        {" • "}
        <Link link="/events/latest">Events</Link>
        {" • "}
        <Link link="https://discord.gg/t63gGSWvdV">Discord</Link>
        {" • "}
        <Link link="https://github.com/PaceMan-MCSR/PaceMan-Tracker/releases">
          Tracker
        </Link>
        {" • "}
        <Link link="https://docs.google.com/document/d/1RgHUJhLvnUp0KtnCcdJEHCi6rn7naUqWwfe-0ntTAlo">
          Tutorial
        </Link>
        {" • "}
        <Link link="https://docs.google.com/document/d/118WJx5C9giWHsdc-CShhoF_6yKrPsTFB_edGmtR9F-k">
          Rules
        </Link>
        {" • "}
        <Link link="https://docs.google.com/document/d/1vybBwJT2vM7MWHP9Oc544a8WdGhjQWVA34o5Cx7N7YM">
          Privacy Policy
        </Link>
      </div>
      {showAuthModal && <Modal onClose={() => setShowAuthModal(false)} />}
    </>
  );
};

export default Footer;
