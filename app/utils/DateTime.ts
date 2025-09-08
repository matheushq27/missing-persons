import { format } from "date-fns";

export const formatDateToBrazilian = (date: string) => {
    if (!date) return "";
    return format(new Date(date), "dd/MM/yyyy");
};

type DateFormat = "yyyy-mm-dd" | "dd/mm/yyyy" | "mm/dd/yyyy" | "dd/mm";

export const convertDate = (date: string, fromFormat: DateFormat, toFormat: DateFormat): string => {
    if (!date) return "";

    // Inicializar as variáveis com valores vazios
    let day: string = "";
    let month: string = "";
    let year: string = "";
    let formatValid = false;

    if (fromFormat.toLowerCase() === "yyyy-mm-dd") {
        [year, month, day] = date.split("-");
        formatValid = true;
    } else if (fromFormat.toLowerCase() === "dd/mm/yyyy") {
        [day, month, year] = date.split("/");
        formatValid = true;
    } else if (fromFormat.toLowerCase() === "mm/dd/yyyy") {
        [month, day, year] = date.split("/");
        formatValid = true;
    }

    if (!formatValid || !day || !month || !year) {
        return date;
    }

    if (toFormat.toLowerCase() === "yyyy-mm-dd") {
        return `${year}-${month}-${day}`;
    } else if (toFormat.toLowerCase() === "dd/mm/yyyy") {
        return `${day}/${month}/${year}`;
    } else if (toFormat.toLowerCase() === "mm/dd/yyyy") {
        return `${month}/${day}/${year}`;
    } else if (toFormat.toLowerCase() === "dd/mm") {
        return `${day}/${month}`;
    }

    return date;
};