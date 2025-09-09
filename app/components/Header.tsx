"use client";
import Link from "next/link";
export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-blue-700">
            <i className="pi pi-search mr-2" style={{ fontSize: "1rem" }}></i>
            <span>SNPD</span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
