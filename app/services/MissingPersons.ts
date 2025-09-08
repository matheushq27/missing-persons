import { GetMissingPersonsParams, MissingPersonsDataApi, MissingPerson, MissingPersonOccurrences, CreateMissingPersonOccurrencesData } from "../@types/services/MissingPersons";
import { API } from "./api";

const getMissingPersons = async (params: GetMissingPersonsParams): Promise<MissingPersonsDataApi> => {
    const response = await API.get("/pessoas/aberto/filtro", {
        params,
    });
    return response.data;
};

const getMissingPersonById = async (id: number): Promise<MissingPerson> => {
    const response = await API.get(`/pessoas/${id}`);
    return response.data;
};

const getMissingPersonOccurrences = async (occurrenceId: number): Promise<MissingPersonOccurrences[]> => {
    const response = await API.get(`/ocorrencias/informacoes-desaparecido`, {
        params: {
            ocorrenciaId: occurrenceId
        }
    });
    return response.data;
}

const createMissingPersonOccurrences = async (data: FormData): Promise<any> => {
    const response = await API.post(`/ocorrencias/informacoes-desaparecido`, data, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    return response.data;
}

export const MissingPersonsService = {
    getMissingPersons,
    getMissingPersonById,
    getMissingPersonOccurrences,
    createMissingPersonOccurrences
};
