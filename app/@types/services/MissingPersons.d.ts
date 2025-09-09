export interface GetMissingPersonsParams {
    nome: string | null;
    faixaIdadeInicial: number | null;
    faixaIdadeFinal: number | null;
    sexo: 'MASCULINO' | 'FEMININO' | null;
    status: 'DESAPARECIDO' | 'ENCONTRADO' | null;
    pagina: number;
    porPagina: number;
}

export interface MissingPersonsDataApi {
    totalPages: number
    totalElements: number
    first: boolean
    last: boolean
    numberOfElements: number
    pageable: Pageable
    size: number
    content: MissingPerson[]
    number: number
    sort: Sort2
    empty: boolean
}

export interface Pageable {
    pageNumber: number
    pageSize: number
    sort: Sort
    offset: number
    unpaged: boolean
    paged: boolean
}

export interface Sort {
    unsorted: boolean
    sorted: boolean
    empty: boolean
}

export interface MissingPerson {
    id: number
    nome: string
    idade: number
    sexo: string
    vivo: boolean
    urlFoto: string
    ultimaOcorrencia: UltimaOcorrencia
}

export interface UltimaOcorrencia {
    dtDesaparecimento: string
    dataLocalizacao: string | null
    encontradoVivo: boolean
    localDesaparecimentoConcat: string
    ocorrenciaEntrevDesapDTO: OcorrenciaEntrevDesapDto
    listaCartaz: any[]
    ocoId: number
}

export interface OcorrenciaEntrevDesapDto {
    informacao?: string
    vestimentasDesaparecido: string
}

export interface Sort2 {
    unsorted: boolean
    sorted: boolean
    empty: boolean
}

export interface MissingPersonOccurrences {
    ocoId: number
    informacao: string
    data: string
    id: number
    anexos: string[]
}

export interface CreateMissingPersonOccurrencesData {
    informacao: string
    descricao: string
    data: string
    ocoId: number
    files: File[]
}


