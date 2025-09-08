'use client';

import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Button } from 'primereact/button';
import { FileUpload } from 'primereact/fileupload';
import { Card } from 'primereact/card';

export default function RegisterMissingPerson() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    lastSeenDate: null as Date | null | undefined,
    lastSeenLocation: '',
    description: '',
    physicalCharacteristics: '',
    contactInfo: ''
  });

  const genderOptions = [
    { label: 'Masculino', value: 'Masculino' },
    { label: 'Feminino', value: 'Feminino' },
    { label: 'Outro', value: 'Outro' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você implementaria a lógica para salvar os dados
    console.log('Dados do formulário:', formData);
    alert('Registro de desaparecimento enviado com sucesso!');
    // Reset form
    setFormData({
      name: '',
      age: '',
      gender: '',
      lastSeenDate: null as Date | null | undefined,
      lastSeenLocation: '',
      description: '',
      physicalCharacteristics: '',
      contactInfo: ''
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card title="Registrar Pessoa Desaparecida" className="shadow-lg">
        <form onSubmit={handleSubmit} className="p-fluid">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="field">
              <label htmlFor="name" className="font-bold">Nome Completo</label>
              <InputText 
                id="name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            
            <div className="field">
              <label htmlFor="age" className="font-bold">Idade</label>
              <InputText 
                id="age" 
                name="age" 
                value={formData.age} 
                onChange={handleInputChange} 
                keyfilter="int" 
                required 
              />
            </div>
            
            <div className="field">
              <label htmlFor="gender" className="font-bold">Gênero</label>
              <Dropdown 
                id="gender" 
                name="gender" 
                value={formData.gender} 
                options={genderOptions} 
                onChange={(e) => setFormData(prev => ({ ...prev, gender: e.value }))} 
                placeholder="Selecione o gênero" 
                required 
              />
            </div>
            
            <div className="field">
              <label htmlFor="lastSeenDate" className="font-bold">Data do Desaparecimento</label>
              <Calendar 
                id="lastSeenDate" 
                value={formData.lastSeenDate} 
                onChange={(e) => setFormData(prev => ({ ...prev, lastSeenDate: e.value }))} 
                showIcon 
                dateFormat="dd/mm/yy" 
                required 
              />
            </div>
            
            <div className="field col-span-full">
              <label htmlFor="lastSeenLocation" className="font-bold">Local do Desaparecimento</label>
              <InputText 
                id="lastSeenLocation" 
                name="lastSeenLocation" 
                value={formData.lastSeenLocation} 
                onChange={handleInputChange} 
                required 
              />
            </div>
            
            <div className="field col-span-full">
              <label htmlFor="description" className="font-bold">Descrição do Desaparecimento</label>
              <InputTextarea 
                id="description" 
                name="description" 
                value={formData.description} 
                onChange={handleInputChange} 
                rows={3} 
                required 
              />
            </div>
            
            <div className="field col-span-full">
              <label htmlFor="physicalCharacteristics" className="font-bold">Características Físicas</label>
              <InputTextarea 
                id="physicalCharacteristics" 
                name="physicalCharacteristics" 
                value={formData.physicalCharacteristics} 
                onChange={handleInputChange} 
                rows={3} 
                required 
              />
            </div>
            
            <div className="field col-span-full">
              <label htmlFor="contactInfo" className="font-bold">Informações de Contato</label>
              <InputTextarea 
                id="contactInfo" 
                name="contactInfo" 
                value={formData.contactInfo} 
                onChange={handleInputChange} 
                rows={2} 
                required 
              />
            </div>
            
            <div className="field col-span-full">
              <label className="font-bold block mb-2">Foto da Pessoa</label>
              <FileUpload 
                mode="basic" 
                name="photo" 
                accept="image/*" 
                maxFileSize={1000000} 
                chooseLabel="Escolher Foto" 
              />
            </div>
          </div>
          
          <div className="flex justify-center mt-6">
            <Button type="submit" label="Registrar Desaparecimento" icon="pi pi-save" className="w-auto" />
          </div>
        </form>
      </Card>
    </div>
  );
}