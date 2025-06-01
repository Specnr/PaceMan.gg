"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function NavBar() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "AA", path: "/aa" },
    { name: "Events", path: "/events/latest" },
    { name: "Stats", path: "/stats" },
    { name: "Leaderboard", path: "/lb/monthly" },
  ];

  return (
    <div className="z-50">
      {/* Mobile menu button */}
      <button
        className="md:hidden text-white p-2 focus:outline-none"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
      </button>

      {/* Desktop navigation */}
      <div className="hidden md:flex items-center space-x-1">
        {navItems.map((item, index) => (
          <div key={item.path} className="flex items-center">
            <Link
              href={item.path}
              className={`px-4 py-2 rounded-md transition-colors duration-200 text-lg ${pathname === item.path
                ? "text-purple-400 font-medium"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
            >
              {item.name}
            </Link>
            {index < navItems.length - 1 && (
              <span className="text-gray-600">|</span>
            )}
          </div>
        ))}
      </div>

      {/* Mobile navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-12 left-0 bg-gray-900 border border-gray-800 rounded-md shadow-lg p-2 w-48">
          {navItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`block px-4 py-2 rounded-md transition-colors duration-200 ${pathname === item.path
                ? "text-purple-400 bg-gray-800 font-medium"
                : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              onClick={() => setIsMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
