import React from "react";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import Image from "next/image";
import { MissingPerson } from "@/app/@types/services/MissingPersons";
import Link from "next/link";
import { formatDateToBrazilian } from "@/app/utils/DateTime";

interface MissingPersonCardProps {
  person: MissingPerson;
}

export default function MissingPersonCard({ person }: MissingPersonCardProps) {
  return (
    <div className="shadow-md bg-white p-2 rounded text-gray-700 h-auto min-h-[30rem] flex flex-col">
      <h2 className="mb-2 uppercase font-bold text-2xl">{person.nome}</h2>
      <div className="flex flex-col flex-grow justify-between gap-5">
        <div>
          <div className="relative w-full h-48">
            <Image
              src={person.urlFoto || "/photo-empty.png"}
              alt={person.nome}
              fill
              style={{ objectFit: "contain" }}
            />
          </div>
          <div className="text-sm flex flex-col gap-1">
            <p>
              <strong>Idade:</strong>{" "}
              {`${person.idade ? `${person.idade} anos` : "Não informada"}`}
            </p>
            <p>
              <strong>Sexo:</strong> {person.sexo}
            </p>
            <p>
              <strong>Visto por último:</strong>{" "}
              {formatDateToBrazilian(person.ultimaOcorrencia.dtDesaparecimento)}
            </p>
            <p>
              <strong>Local:</strong>{" "}
              {person.ultimaOcorrencia.localDesaparecimentoConcat}
            </p>
            <div>
              <Tag
                value={
                  person.ultimaOcorrencia.dataLocalizacao
                    ? "Encontrado"
                    : "Desaparecido"
                }
                severity={
                  person.ultimaOcorrencia.dataLocalizacao ? "success" : "danger"
                }
              />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center w-full mt-auto pt-2">
          <Link href={`/missing-person/${person.id}`} className="w-full">
            <Button
              label="Ver Detalhes"
              className="w-full"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
