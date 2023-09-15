"use client"
import { useState } from "react";

import Link from "./Link";
import Modal from "@/components/Modal";

const Footer = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (     
    <>
      <div className="text-xs">
        <div className="mb-2 invisible md:visible">
          <button
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 border border-purple-700 rounded"
            onClick={() => setShowAuthModal(true)}>
            Generate Access Token
          </button>
        </div>
        <Link link="https://docs.google.com/document/d/1RgHUJhLvnUp0KtnCcdJEHCi6rn7naUqWwfe-0ntTAlo">Tutorial</Link>{" • "}
        <Link link="">Privacy Policy</Link>
      </div>
      {
        showAuthModal && (
          <Modal onClose={() => setShowAuthModal(false)} />
        )
      }
    </>
  )
};

export default Footer;
