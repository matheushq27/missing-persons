"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-700">
            <i className="pi pi-search mr-2" style={{ fontSize: "1rem" }}></i>
            <span>SNPD</span>
          </Link>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6 text-blue-700"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <div className="hidden md:flex space-x-6">
            <Link href="/missing-person/register" className="text-gray-600 hover:text-gray-800">
              Registrar Desaparecimento
            </Link>
            <Link href="/missing-person/search" className="text-gray-600 hover:text-gray-800">
              Buscar pessoas
            </Link>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-2 space-y-2">
            <Link
              href="/"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Home
            </Link>
            <Link
              href="/search"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Search
            </Link>
            <Link
              href="/report"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              Report Case
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 text-gray-600 hover:bg-gray-100 rounded"
            >
              About
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}
