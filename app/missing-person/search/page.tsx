"use client";

import React, { useEffect, useState } from "react";
import MissingPersonCard from "@/app/components/missing-person/MissingPersonCard";
import MissingPersonSearchFilter, {
  OnSubmitProps,
} from "@/app/components/MissingPersonSearchFilter";
import {
  Paginator,
  PaginatorPageChangeEvent,
} from "primereact/paginator";
import { MissingPersonsService } from "@/app/services/MissingPersons";
import { MissingPerson } from "@/app/@types/services/MissingPersons";
import { ProgressSpinner } from "primereact/progressspinner";

export default function SearchMissingPerson() {
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
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

  const getMissingPersons = async () => {
    setLoading(true);
    try {
      const data = await MissingPersonsService.getMissingPersons({
        faixaIdadeInicial: filters.minAge,
        faixaIdadeFinal: filters.maxAge,
        sexo: filters.gender,
        status: filters.status,
        pagina: page,
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

  const onPageChange = (event: PaginatorPageChangeEvent) => {
    setPage(event.page + 1);
    setPerPage(event.rows ?? 10);
  };

  useEffect(() => {
    getMissingPersons();
  }, [filters, page, perPage]);

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
      <Paginator
        rows={perPage}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        rowsPerPageOptions={[10, 20, 30]}
      />
    </div>
  );
}
