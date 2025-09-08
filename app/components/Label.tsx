"use client";


export default function Label({ label, htmlFor }: { label: string, htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="font-bold block mb-2">
      {label}
    </label>	
  );
}
