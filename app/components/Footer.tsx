"use client";

import Link from "next/link";
import { Button } from "primereact/button";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-center items-center">
          <div className="mb-4 md:mb-0 text-center">
            <h3 className="text-xl font-bold">
              SNPD - Sistema Nacional de Pessoas Desaparecidas
            </h3>
            <p className="text-gray-400">
              Ajudando a reunir famílias desde 2025
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
