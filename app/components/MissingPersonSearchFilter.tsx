"use client";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { InputNumber } from "primereact/inputnumber";
import Label from "@/app/components/Label";
import { useState } from "react";
import { Sidebar } from "primereact/sidebar";
import TagRemovable from "./TagRemovable";

export interface OnSubmitProps {
  name: string;
  minAge: number | null;
  maxAge: number | null;
  gender: "MASCULINO" | "FEMININO" | null;
  status: "DESAPARECIDO" | "ENCONTRADO" | null;
}

type GenderType = "MASCULINO" | "FEMININO" | null;
type StatusType = "DESAPARECIDO" | "ENCONTRADO" | null;

export default function MissingPersonSearchFilter({
  onSubmit,
}: {
  onSubmit: (filters: OnSubmitProps) => void;
}) {
  const [nameFilter, setNameFilter] = useState("");
  const [minAgeFilter, setMinAgeFilter] = useState<number | null>(null);
  const [maxAgeFilter, setMaxAgeFilter] = useState<number | null>(null);
  const [genderFilter, setGenderFilter] = useState<GenderType>(null);
  const [statusFilter, setStatusFilter] = useState<StatusType>(null);
  const [visible, setVisible] = useState(false);

  const closeSidebar = () => {
    setVisible(false);
  };

  const openSidebar = () => {
    setVisible(true);
  };

  const statusOptions = [
    { label: "Desaparecido", value: "DESAPARECIDO" },
    { label: "Encontrado", value: "LOCALIZADO" },
  ];

  const genderOptions = [
    { label: "Masculino", value: "MASCULINO" },
    { label: "Feminino", value: "FEMININO" },
  ];

  const handleSearch = () => {
    onSubmit({
      name: nameFilter,
      minAge: minAgeFilter,
      maxAge: maxAgeFilter,
      gender: genderFilter,
      status: statusFilter,
    });
    closeSidebar();
  };

  const cleanFilters = () => {
    setNameFilter("");
    setMinAgeFilter(null);
    setMaxAgeFilter(null);
    setGenderFilter(null);
    setStatusFilter(null);
  };

  const removeFilter = (filterType: string) => {
    switch (filterType) {
      case "name":
        setNameFilter("");
        break;
      case "minAge":
        setMinAgeFilter(null);
        break;
      case "maxAge":
        setMaxAgeFilter(null);
        break;
      case "gender":
        setGenderFilter(null);
        break;
      case "status":
        setStatusFilter(null);
        break;
    }
    handleSearch();
  };

  const hasActiveFilters =
    nameFilter ||
    minAgeFilter !== null ||
    maxAgeFilter !== null ||
    genderFilter !== null ||
    statusFilter !== null;

  const getGenderLabel = (value: GenderType) => {
    return (
      genderOptions.find((option) => option.value === value)?.label || value
    );
  };

  return (
    <div>
      <div className="fixed right-2 bottom-2 flex flex-col items-end gap-2 z-10">
        {hasActiveFilters && (
          <div className="bg-white p-2 rounded-lg shadow-md mb-2 max-w-xs">
            <div className="text-sm font-semibold mb-1 text-black">
              Filtros ativos:
            </div>
            <div className="flex flex-wrap gap-1">
              {nameFilter && (
                <TagRemovable
                  value={`Nome: ${nameFilter}`}
                  onRemove={() => removeFilter("name")}
                />
              )}
              {minAgeFilter && (
                <TagRemovable
                  value={`Idade mín: ${minAgeFilter}`}
                  onRemove={() => removeFilter("minAge")}
                />
              )}
              {maxAgeFilter && (
                <TagRemovable
                  value={`Idade máx: ${maxAgeFilter}`}
                  onRemove={() => removeFilter("maxAge")}
                />
              )}
              {genderFilter && (
                <TagRemovable
                  value={`Sexo: ${getGenderLabel(genderFilter)}`}
                  onRemove={() => removeFilter("gender")}
                />
              )}
              {statusFilter && (
                <TagRemovable
                  value={`Status: ${statusFilter}`}
                  onRemove={() => removeFilter("status")}
                />
              )}
            </div>
          </div>
        )}
        <Button
          className="shadow-lg"
          icon="pi pi-filter"
          onClick={openSidebar}
          tooltip="Filtros"
          tooltipOptions={{
            position: "left",
          }}
        />
      </div>

      <Sidebar visible={visible} position="right" onHide={closeSidebar}>
        <div className="h-full flex flex-col justify-between">
          <div className="grid grid-cols-1 gap-4 overflow-y-auto">
            <div className="field">
              <Label label="Nome da Pessoa" htmlFor="name" />
              <InputText
                id="name"
                value={nameFilter}
                onChange={(e) => setNameFilter(e.target.value)}
                placeholder="Digite o nome da pessoa"
                className="w-full"
              />
            </div>

            <div className="field">
              <Label label="Faixa Etária Inicial" htmlFor="minAge" />
              <InputNumber
                id="minAge"
                value={minAgeFilter}
                onValueChange={(e) =>
                  setMinAgeFilter(e.value !== undefined ? e.value : null)
                }
                placeholder="Idade mínima"
                className="w-full"
                min={0}
                max={120}
              />
            </div>

            <div className="field">
              <Label label="Faixa Etária Final" htmlFor="maxAge" />
              <InputNumber
                id="maxAge"
                value={maxAgeFilter}
                onValueChange={(e) =>
                  setMaxAgeFilter(e.value !== undefined ? e.value : null)
                }
                placeholder="Idade máxima"
                className="w-full"
                min={0}
                max={120}
              />
            </div>

            <div className="field">
              <Label label="Sexo" htmlFor="gender" />
              <Dropdown
                id="gender"
                value={genderFilter}
                options={genderOptions}
                onChange={(e) => setGenderFilter(e.value)}
                placeholder="Selecione o sexo"
                className="w-full"
                showClear={true}
              />
            </div>

            <div className="field">
              <Label label="Status" htmlFor="status" />
              <Dropdown
                id="status"
                value={statusFilter}
                options={statusOptions}
                onChange={(e) => setStatusFilter(e.value)}
                placeholder="Selecione o status"
                className="w-full"
                showClear={true}
              />
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-200 text-center sticky bottom-0 bg-white">
            <Button
              icon="pi pi-search"
              label="Buscar"
              onClick={handleSearch}
              className="w-full !mb-2"
            />
            <Button
              severity="secondary"
              icon="pi pi-times"
              label="Limpar Filtros"
              onClick={cleanFilters}
              className="w-full"
            />
          </div>
        </div>
      </Sidebar>
    </div>
  );
}
