"use client";
import React from "react";
import { usePathname } from 'next/navigation';
import Link from "./Link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "@/app/context/ModalContext";

const Footer = () => {
  const pathname = usePathname();
  const { openAuthModal } = useModal();

  const footerLinks = [
    { name: "Discord", link: "https://discord.gg/t63gGSWvdV", isExternal: true },
    {
      name: "Tracker",
      link: `https://github.com/PaceMan-MCSR/PaceMan${pathname?.includes("aa") ? "-AA-" : "-"}Tracker/releases`,
      isExternal: true
    },
    { name: "Tutorial", link: "https://docs.google.com/document/d/1RgHUJhLvnUp0KtnCcdJEHCi6rn7naUqWwfe-0ntTAlo", isExternal: true },
    { name: "Rules", link: "https://docs.google.com/document/d/118WJx5C9giWHsdc-CShhoF_6yKrPsTFB_edGmtR9F-k", isExternal: true },
    { name: "Privacy Policy", link: "https://docs.google.com/document/d/1vybBwJT2vM7MWHP9Oc544a8WdGhjQWVA34o5Cx7N7YM", isExternal: true },
  ];

  return (
    <div className="text-center">
      <div className="mb-6">
        <button
          className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-medium py-2 px-6 rounded-md transition-all duration-200 shadow-lg hover:shadow-purple-500/20"
          onClick={openAuthModal}
        >
          <FontAwesomeIcon icon={faKey} className="mr-2" />
          Generate Access Token
        </button>
      </div>

      <div className="flex flex-wrap justify-center gap-2 md:gap-4 text-sm">
        {footerLinks.map((link, index) => (
          <React.Fragment key={link.name}>
            <div className="flex items-center">
              <Link
                stay={!link.isExternal}
                link={link.link}
                className="text-gray-300 hover:text-white transition-colors duration-200"
              >
                {link.name}
              </Link>
            </div>
            {index < footerLinks.length - 1 && (
              <span className="text-gray-600 hidden md:inline">•</span>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-500">
        © {new Date().getFullYear()} PaceMan
      </div>
    </div>
  );
};

export default Footer;
