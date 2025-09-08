"use client";

import { Tag } from "primereact/tag";

export default function TagRemovable({
  value,
  onRemove
}: {
  value: string;
  onRemove: () => void;
}) {
  return (
    <Tag
     severity="info"
    >
      <div className="flex items-center gap-2">
        <span className="text-sm">{value}</span>
        <i className="pi pi-times text-xs" onClick={onRemove}></i>
      </div>
    </Tag>
  );
}
