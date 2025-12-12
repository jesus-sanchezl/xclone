export const formatAndValidateDate = (day, month, year) => {
    const monthMap = {
        enero: "01",
        febrero: "02",
        marzo: "03",
        abril: "04",
        mayo: "05",
        junio: "06",
        julio: "07",
        agosto: "08",
        septiembre: "09",
        octubre: "10",
        noviembre: "11",
        diciembre: "12",
    };


    const monthKey = month.toLowerCase();
    const formattedMonth = monthMap[monthKey];

    if (!formattedMonth) {
        return {
            valid: false,
            error: "Por favor selecciona un mes válido.",
        };
    }

    const dayNum = Number(day);
    const yearNum = Number(year);
    const monthNum = Number(formattedMonth); 


    if (
        Number.isNaN(dayNum) ||
        Number.isNaN(yearNum) ||
        dayNum < 1 ||
        dayNum > 31
    ) {
        return {
            valid: false,
            error: "La fecha de nacimiento no es válida.",
        };
    }

    
    const birthDateObj = new Date(yearNum, monthNum - 1, dayNum);

    if (
        birthDateObj.getFullYear() !== yearNum ||
        birthDateObj.getMonth() !== monthNum - 1 ||
        birthDateObj.getDate() !== dayNum
    ) {
        return {
            valid: false,
            error: "La fecha de nacimiento no es válida.",
        };
    }

    const now = new Date();

    if (birthDateObj > now) {
        return {
            valid: false,
            error: "La fecha de nacimiento no puede ser futura.",
        };
    }


    const MIN_AGE = 13;
    const minBirthDate = new Date(
        now.getFullYear() - MIN_AGE,
        now.getMonth(),
        now.getDate()
    );

    if (birthDateObj > minBirthDate) {
        return {
            valid: false,
            error: "Debes tener al menos 13 años para registrarte.",
        };
    }


    const formattedDay = String(dayNum).padStart(2, "0");
    const formattedMonthStr = String(monthNum).padStart(2, "0");
    const birthdate = `${yearNum}-${formattedMonthStr}-${formattedDay}`;

    return { valid: true, birthdate };
};
