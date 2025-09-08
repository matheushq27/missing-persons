"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import {
  MissingPerson,
  MissingPersonOccurrences,
} from "@/app/@types/services/MissingPersons";
import { MissingPersonsService } from "@/app/services/MissingPersons";
import { formatDateToBrazilian } from "@/app/utils/DateTime";
import { Image } from "primereact/image";
import IncidentInformationModal from "@/app/components/IncidentInformationModal";
import { ProgressSpinner } from "primereact/progressspinner";

export default function MissingPersonDetails() {
  const { id } = useParams();
  const [person, setPerson] = useState<MissingPerson | null>(null);
  const [occurrences, setOccurrences] = useState<MissingPersonOccurrences[]>(
    []
  );

  const [dialogVisible, setDialogVisible] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [loadingOccurrences, setLoadingOccurrences] = useState(false);
  const [missingPersonId, setMissingPersonId] = useState<number>(0);
  const [occurrenceId, setOccurrenceId] = useState<number>(0);

  const handleOpenModal = () => {
    if (!person) {
      return;
    }

    setDialogVisible(true);
    setOccurrenceId(person.ultimaOcorrencia.ocoId);
  };

  const getMissingPersonById = async () => {
    setLoading(true);
    try {
      const resp = await MissingPersonsService.getMissingPersonById(
        missingPersonId
      );
      setPerson(resp);
    } catch (error) {
      setPerson(null);
    } finally {
      setLoading(false);
    }
  };

  const getMissingPersonOccurrences = async () => {
    if (!person) {
      return;
    }

    setLoadingOccurrences(true);
    try {
      const resp = await MissingPersonsService.getMissingPersonOccurrences(
        person.ultimaOcorrencia.ocoId
      );
      setOccurrences(resp);
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingOccurrences(false);
    }
  };

  const informationNotAvailable = (value: any) => {
    if (!value) {
      return "Informação não disponível";
    }
    return value;
  };

  useEffect(() => {
    if (id && !Array.isArray(id)) {
      const numericId = +id;
      if (!isNaN(numericId)) {
        setMissingPersonId(numericId);
      }
    }
  }, [id]);

  useEffect(() => {
    if (missingPersonId) {
      getMissingPersonById();
    }
  }, [missingPersonId]);

  useEffect(() => {
    if (person) {
      getMissingPersonOccurrences();
    }
  }, [person]);

  return (
    <div className="h-full">
      <div className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <ProgressSpinner />
          </div>
        ) : (
          <>
            {!person && (
              <div className="flex justify-center items-center h-96 text-gray-700 text-4xl">
                <p>Nenhum registro encontrado.</p>
              </div>
            )}
          </>
        )}

        {person && (
          <Card className="shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <div className="relative w-full mb-4">
                  <Image
                    src={person.urlFoto || "/photo-empty.png"}
                    alt={person.nome}
                    style={{ objectFit: "cover" }}
                    className="rounded-lg"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <Button
                    label="Tenho Informações"
                    icon="pi pi-info-circle"
                    severity="success"
                    onClick={handleOpenModal}
                  />
                </div>
              </div>

              <div className="md:col-span-2">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-3xl font-bold">{person.nome}</h1>
                  <Tag
                    value={
                      person.ultimaOcorrencia.dataLocalizacao
                        ? "Encontrado"
                        : "Desaparecido"
                    }
                    severity={
                      person.ultimaOcorrencia.dataLocalizacao
                        ? "success"
                        : "danger"
                    }
                    className="text-lg"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <p className="font-semibold">Idade:</p>
                    <p>{person.idade} anos</p>
                  </div>
                  <div>
                    <p className="font-semibold">Gênero:</p>
                    <p>{person.sexo}</p>
                  </div>
                  <div>
                    <p className="font-semibold">Data do Desaparecimento:</p>
                    <p>
                      {formatDateToBrazilian(
                        person.ultimaOcorrencia.dtDesaparecimento
                      )}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <p className="font-semibold">Local do Desaparecimento:</p>
                  <p>
                    {informationNotAvailable(
                      person.ultimaOcorrencia.localDesaparecimentoConcat
                    )}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="font-semibold">Descrição do Desaparecimento:</p>
                  <p>
                    {informationNotAvailable(
                      person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                        .informacao
                    )}
                  </p>
                </div>

                <div className="mb-6">
                  <p className="font-semibold">Vestimentas:</p>
                  <p>
                    {informationNotAvailable(
                      person.ultimaOcorrencia.ocorrenciaEntrevDesapDTO
                        .vestimentasDesaparecido
                    )}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        )}

        {person && (
          <>
            <h2 className="mt-10 mb-5 text-gray-700 text-2xl font-bold">
              Ocorrências
            </h2>

            {loadingOccurrences ? (
              <div className="flex justify-center items-center h-96">
                <ProgressSpinner />
              </div>
            ) : occurrences.length > 0 ? (
              <div className="card mt-5">
                {occurrences.map((occurrence) => (
                  <Card
                    title={formatDateToBrazilian(occurrence.data)}
                    key={occurrence.id}
                    className="mb-5"
                  >
                    <div className="flex flex-wrap justify-start gap-2 mt-3">
                      {occurrence.anexos.map((url, index) => (
                        <Image
                          key={index}
                          src={url}
                          alt={`Imagem ${index + 1}`}
                          className="shadow-1"
                          width="100%"
                          style={{ maxWidth: "150px", height: "auto" }}
                          preview
                        />
                      ))}
                    </div>
                    <p className="mt-5">{occurrence.informacao}</p>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <div className="flex justify-center items-center h-96 text-gray-700 text-3xl font-bold">
                  <p>Nenhuma ocorrência encontrada.</p>
                </div>
              </Card>
            )}
          </>
        )}

        <IncidentInformationModal
          occurrenceId={occurrenceId}
          isOpen={dialogVisible}
          onClose={() => setDialogVisible(false)}
          onBeforeSend={() => getMissingPersonOccurrences()}
        />
      </div>
    </div>
  );
}
