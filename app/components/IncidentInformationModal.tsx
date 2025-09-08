"use client";

import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
import { useEffect, useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { ProgressBar } from "primereact/progressbar";
import { Tag } from "primereact/tag";
import { Tooltip } from "primereact/tooltip";
import { Toast } from "primereact/toast";
import { InputMask } from "primereact/inputmask";
import { MissingPersonsService } from "../services/MissingPersons";
import { convertDate } from "../utils/DateTime";

export default function IncidentInformationModal({
  occurrenceId,
  isOpen,
  onClose,
  onBeforeSend,
}: {
  occurrenceId: number;
  isOpen: boolean;
  onClose: () => void;
  onBeforeSend?: (success: boolean) => void;
}) {
  const [infoMessage, setInfoMessage] = useState("");
  const toast = useRef<any>(null);
  const [totalSize, setTotalSize] = useState(0);
  const fileUploadRef = useRef<FileUpload | null>(null);
  const [viewDate, setViewDate] = useState("");
  const [loading, setLoading] = useState(false);
  const [descriptionImages, setDescriptionImages] = useState("");

  const resetStates = () => {
    setInfoMessage("");
    setTotalSize(0);
    setViewDate("");
    setDescriptionImages("");
  };

  const toastMessage = ({
    severity,
    summary,
    detail,
  }: {
    severity: "error" | "success" | "info" | "warn";
    summary: string;
    detail: string;
  }) => {
    if (toast && toast.current) {
      toast.current.show({
        severity,
        summary,
        detail,
      });
    }
  };

  const emitOnBeforeSend = (success: boolean) => {
    if (onBeforeSend) {
      onBeforeSend(success);
    }
  };

  const createMissingPersonOccurrences = async () => {
    if (!occurrenceId) {
      toastMessage({
        severity: "error",
        summary: "Erro",
        detail: "Ocorrência inválida",
      });
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("informacao", infoMessage);
      formData.append("descricao", descriptionImages);
      formData.append(
        "data",
        convertDate(viewDate, "dd/mm/yyyy", "yyyy-mm-dd")
      );
      formData.append("ocoId", occurrenceId.toString());

      if (fileUploadRef && fileUploadRef.current) {
        const files = fileUploadRef.current.getFiles();
        files.forEach((file: File, index: number) => {
          formData.append(`files`, file);
        });
      }

      await MissingPersonsService.createMissingPersonOccurrences(formData);

      toastMessage({
        severity: "success",
        summary: "Sucesso",
        detail: "Ocorrência criada com sucesso",
      });

      emitOnBeforeSend(true);
      onClose();
    } catch (error) {
      toastMessage({
        severity: "error",
        summary: "Erro",
        detail: "Erro ao criar ocorrência",
      });
      emitOnBeforeSend(false);
    } finally {
      setLoading(false);
    }
  };

  const onTemplateSelect = (e: any) => {
    let _totalSize = totalSize;
    let files = e.files;

    Object.keys(files).forEach((key) => {
      _totalSize += files[key].size || 0;
    });

    setTotalSize(_totalSize);
  };

  const onTemplateUpload = (e: any) => {
    let _totalSize = 0;

    e.files.forEach((file: any) => {
      _totalSize += file.size || 0;
    });

    setTotalSize(_totalSize);
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };

  const onTemplateRemove = (file: any, callback: any) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const onTemplateClear = () => {
    setTotalSize(0);
  };

  const headerTemplate = (options: any) => {
    const { className, chooseButton, cancelButton } = options;
    const value = totalSize / 10000;
    const formatedValue =
      fileUploadRef && fileUploadRef.current
        ? fileUploadRef.current.formatSize(totalSize)
        : "0 B";

    useEffect(() => {
      resetStates();
    }, [isOpen]);

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
        }}
      >
        {chooseButton}
        {cancelButton}
        <div className="flex items-center gap-3 ml-auto">
          <span>{formatedValue} / 1 MB</span>
          <ProgressBar
            value={value}
            showValue={false}
            style={{ width: "10rem", height: "12px" }}
          ></ProgressBar>
        </div>
      </div>
    );
  };

  const itemTemplate = (file: any, props: any) => {
    return (
      <div className="flex items-center flex-wrap">
        <div className="flex items-center" style={{ width: "40%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            width={100}
          />
          <span className="flex flex-column text-left ml-3">
            {file.name}
            <small className="ml-2">{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        <Tag
          value={props.formatSize}
          severity="warning"
          className="px-3 py-2 mr-2"
        />
        <Button
          type="button"
          icon="pi pi-times"
          className="p-button-outlined p-button-rounded p-button-danger"
          onClick={() => onTemplateRemove(file, props.onRemove)}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex items-center">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "5em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1.2em", color: "var(--text-color-secondary)" }}
          className="my-5"
        >
          Arraste e solte as imagens
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-images",
    iconOnly: true,
    className: "custom-choose-btn p-button-rounded p-button-outlined",
  };
  const uploadOptions = {
    icon: "pi pi-fw pi-cloud-upload",
    iconOnly: true,
    className:
      "custom-upload-btn p-button-success p-button-rounded p-button-outlined",
  };
  const cancelOptions = {
    icon: "pi pi-fw pi-times",
    iconOnly: true,
    className:
      "custom-cancel-btn p-button-danger p-button-rounded p-button-outlined",
  };

  return (
    <Dialog
      header="Enviar Informações"
      visible={isOpen}
      style={{ width: "50vw" }}
      onHide={() => onClose()}
      footer={
        <div>
          <Button
            label="Cancelar"
            icon="pi pi-times"
            onClick={() => onClose()}
            className="p-button-text"
            disabled={loading}
          />
          <Button
            label="Enviar"
            icon="pi pi-check"
            autoFocus
            onClick={createMissingPersonOccurrences}
            loading={loading}
          />
        </div>
      }
    >
      <div className="field">
        <div>
          <div>
            <Toast ref={toast}></Toast>

            <Tooltip
              target=".custom-choose-btn"
              content="Choose"
              position="bottom"
            />
            <Tooltip
              target=".custom-upload-btn"
              content="Upload"
              position="bottom"
            />
            <Tooltip
              target=".custom-cancel-btn"
              content="Clear"
              position="bottom"
            />

            <label htmlFor="viewDate" className="font-bold block mb-2 mt-5">
              Visto em *
            </label>
            <InputMask
              value={viewDate}
              onChange={(e) =>
                setViewDate(e.target.value ? e.target.value : "")
              }
              mask="99/99/9999"
              placeholder="dd/mm/aaaa"
              className="mb-2"
            />

            <label htmlFor="upload" className="font-bold block mb-2 mt-5">
              Anexos *
            </label>

            <FileUpload
              ref={fileUploadRef}
              name="images[]"
              multiple
              accept="image/*"
              maxFileSize={5000000}
              onUpload={onTemplateUpload}
              onSelect={onTemplateSelect}
              onError={onTemplateClear}
              onClear={onTemplateClear}
              headerTemplate={headerTemplate}
              itemTemplate={itemTemplate}
              emptyTemplate={emptyTemplate}
              chooseOptions={chooseOptions}
              uploadOptions={uploadOptions}
              cancelOptions={cancelOptions}
              onBeforeUpload={(e) => console.log(e)}
              invalidFileSizeMessageDetail="O tamanho máximo do arquivo é 5MB."
              invalidFileSizeMessageSummary="Tamanho inválido"
            />
          </div>
        </div>
        <label
          htmlFor="descriptionImages"
          className="font-bold block mb-2 mt-5"
        >
          Descrição dos Anexos *
        </label>
        <InputTextarea
          id="descriptionImages"
          value={descriptionImages}
          onChange={(e) => setDescriptionImages(e.target.value)}
          rows={5}
          className="w-full mb-2"
        />
        <label htmlFor="infoMessage" className="font-bold block mb-2 mt-5">
          Descrição *
        </label>
        <InputTextarea
          id="infoMessage"
          value={infoMessage}
          onChange={(e) => setInfoMessage(e.target.value)}
          rows={5}
          className="w-full"
        />
        <small className="text-gray-500 block mt-2">
          Suas informações serão tratadas com confidencialidade e encaminhadas
          às autoridades competentes.
        </small>
      </div>
    </Dialog>
  );
}
