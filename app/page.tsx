"use client";

import { Button } from "primereact/button";
import Link from "next/link";
import { MissingPersonsService } from "./services/MissingPersons";
import { useEffect, useState } from "react";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<{
    numberOfMissingPeople: number;
    amountPeopleFound: number;
  } | null>(null);

  const calculatePercentage = () => {
    if (!statistics) {
      return `0%`;
    }
    return `${(
      (statistics.amountPeopleFound /
        (statistics.amountPeopleFound + statistics.numberOfMissingPeople)) *
      100
    ).toFixed(1)}%`;
  };

  const findMissingPersonStatistics = async () => {
    setLoading(true);
    try {
      const statistics =
        await MissingPersonsService.findMissingPersonStatistics();
      setStatistics({
        numberOfMissingPeople: statistics.quantPessoasDesaparecidas,
        amountPeopleFound: statistics.quantPessoasEncontradas,
      });
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findMissingPersonStatistics();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">
            Sistema Nacional de Pessoas Desaparecidas
          </h1>
          <p className="text-xl mb-8">
            Uma plataforma para ajudar na localização e identificação de pessoas
            desaparecidas no Brasil.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/missing-person/search">
              <Button
                label="Buscar Pessoas"
                icon="pi pi-search"
                className="p-button-raised p-button-secondary"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      {statistics && statistics.amountPeopleFound > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold mb-8 text-center text-black">
              Estatísticas de Desaparecimentos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-blue-700 mb-2">
                  700.000+
                </div>
                <div className="text-gray-600">
                  Pessoas desaparecidas na última década
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="text-4xl font-bold text-blue-700 mb-2">
                  {calculatePercentage()}
                </div>
                <div className="text-gray-600">Taxa de localização atual</div>
              </div>
              {statistics && (
                <div className="bg-white p-6 rounded-lg shadow-md text-center">
                  <div className="text-4xl font-bold text-blue-700 mb-2">
                    {statistics.amountPeopleFound}
                  </div>
                  <div className="text-gray-600">
                    Pessoas encontradas até o momento
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* About Section */}
      <section className="py-12 text-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-6 text-center">
            Sobre o Sistema
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="mb-4">
              O Sistema Nacional de Pessoas Desaparecidas foi criado para suprir
              uma lacuna histórica no Brasil com relação ao enfrentamento do
              desaparecimento de pessoas: a ausência de um sistema nacional e
              integrado de informações.
            </p>
            <p className="mb-4">
              Mais do que um sistema de tecnologia, esta plataforma visa
              fomentar a articulação de vários órgãos e agentes públicos em
              torno de uma política nacional de descoberta de paradeiros.
            </p>
            <p>
              As primeiras horas após o desaparecimento são fundamentais para a
              localização da pessoa. Registre o desaparecimento o quanto antes e
              ajude a aumentar as chances de localização.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
