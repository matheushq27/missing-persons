"use client";

import Link from "next/link";
import { Button } from "primereact/button";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold">
              Sistema Nacional de Pessoas Desaparecidas
            </h3>
            <p className="text-gray-400">
              Ajudando a reunir famílias desde 2025
            </p>
          </div>
          <div className="flex gap-4">
            <Link href="/about">
              <Button label="Sobre" className="p-button-text p-button-plain" />
            </Link>
            <Link href="/contact">
              <Button
                label="Contato"
                className="p-button-text p-button-plain"
              />
            </Link>
            <Link href="/faq">
              <Button label="FAQ" className="p-button-text p-button-plain" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
