"use client";

import Link from "next/link";
import { Button } from "primereact/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold text-blue-700 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Página não encontrada</h2>
        
        <div className="mb-8">
          <p className="text-gray-600 text-lg mb-4">
            A página que você está procurando não existe ou foi movida.
          </p>
          <p className="text-gray-600">
            Verifique se o endereço foi digitado corretamente ou retorne à página inicial.
          </p>
        </div>
        
        <div className="flex justify-center">
          <Link href="/">
            <Button 
              label="Voltar para a página inicial" 
              icon="pi pi-home" 
              className="p-button-primary"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}