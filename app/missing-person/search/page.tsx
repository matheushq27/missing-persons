"use client";

import React, { useEffect, useState } from "react";
import MissingPersonCard from "@/app/components/missing-person/MissingPersonCard";
import MissingPersonSearchFilter, {
  OnSubmitProps,
} from "@/app/components/MissingPersonSearchFilter";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";
import { MissingPersonsService } from "@/app/services/MissingPersons";
import { MissingPerson } from "@/app/@types/services/MissingPersons";
import { ProgressSpinner } from "primereact/progressspinner";
import { Button } from "primereact/button";

export default function SearchMissingPerson() {
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const [totalRecords, setTotalRecords] = useState(0);
  const [missingPersons, setMissingPersons] = useState<MissingPerson[]>([]);
  const [filters, setFilters] = useState<OnSubmitProps>({
    name: "",
    minAge: null,
    maxAge: null,
    gender: null,
    status: null,
  });

  const scrollToTop = (behavior: ScrollBehavior = "smooth") => {
    if (typeof window !== "undefined") {
      window.scrollTo({
        top: 0,
        behavior,
      });
    }
  };

  const getMissingPersons = async (paramPage: number) => {
    setLoading(true);
    setPage(paramPage);
    try {
      const data = await MissingPersonsService.getMissingPersons({  
        nome: filters.name,
        faixaIdadeInicial: filters.minAge,
        faixaIdadeFinal: filters.maxAge,
        sexo: filters.gender,
        status: filters.status,
        pagina: paramPage ? paramPage : page,
        porPagina: perPage,
      });
      scrollToTop();
      setTotalRecords(data.totalElements);
      setMissingPersons(data.content);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const submitGetMissingPersons = (filters: OnSubmitProps) => {
    setFilters(filters);
  };

  useEffect(() => {
    getMissingPersons(1);
  }, [filters, perPage]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Buscar por Pessoas Desaparecidas
      </h1>

      <MissingPersonSearchFilter onSubmit={submitGetMissingPersons} />
      <div className="my-4 text-gray-700">
        <span className="text-md">
          Exibindo <b>{perPage}</b> registros de <b>{totalRecords}</b>{" "}
          encontrados.
        </span>
      </div>

      {!loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-5">
          {missingPersons.length > 0 ? (
            missingPersons.map((person) => (
              <MissingPersonCard key={person.id} person={person} />
            ))
          ) : (
            <div className="col-span-full text-center py-8 h-screen flex justify-center items-center">
              <p className="text-xl text-gray-500">
                Nenhuma pessoa encontrada com os critérios de busca.
              </p>
            </div>
          )}
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <ProgressSpinner />
        </div>
      )}

      <div className="mt-10 flex justify-center">
        <div>
          <div className="flex justify-center items-center gap-2 mb-2">
            <Button
              label="Anterior"
              disabled={page <= 1 || loading}
              onClick={() => {
                if (page > 1) {
                  getMissingPersons(page - 1);
                  scrollToTop();
                }
              }}
            />
            <Button
              label="Próximo"
              disabled={page * perPage >= totalRecords || loading}
              onClick={() => {
                if (page * perPage < totalRecords) {
                  getMissingPersons(page + 1);
                  scrollToTop();
                }
              }}
            />
          </div>
          <div className="text-black">
            <span className="text-md">
              Exibindo <b>{(page - 1) * perPage + 1}</b> a{" "}
              <b>{page * perPage}</b> de <b>{totalRecords}</b> encontrados.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
