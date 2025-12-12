import { format } from "date-fns";
import { es } from "date-fns/locale";

const fixToLocal = (value) => {
    const date = value instanceof Date ? value : new Date(value);

    date.setHours(date.getHours() - 1);
    return date;
};

export const formatTime = (dateInput) => {
    const date = fixToLocal(dateInput);

    let diff = Date.now() - date.getTime();

    if (diff <= 0) {
        return "hace menos de 1 minuto";
    }

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (seconds < 60) return "hace menos de 1 minuto";

    if (minutes < 60) return `${minutes} min`;

    if (hours < 24) return `${hours} h`;

    const isThisYear = date.getFullYear() === new Date().getFullYear();

    return format(date, isThisYear ? "d MMM" : "d MMM yyyy", {
        locale: es,
    }).toLowerCase();
};

export const formatLongDate = (timestamp) => {
    const date = fixToLocal(timestamp);
    return format(date, "h:mm a · d MMM. yyyy", { locale: es }).toLowerCase();
};
