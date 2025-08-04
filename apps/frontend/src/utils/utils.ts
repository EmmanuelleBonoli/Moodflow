export function getToday(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    return today;
}


export function normalizeDates<T>(input: T): T {
    if (Array.isArray(input)) {
        return input.map(normalizeDates) as T;
    }

    if (input && typeof input === 'object') {
        const output: Record<string, unknown> = {};

        for (const [key, value] of Object.entries(input)) {
            if (typeof value === 'string' && isIsoDate(value)) {
                const date = new Date(value);
                date.setHours(0, 0, 0, 0);
                output[key] = date;
            } else {
                output[key] = normalizeDates(value);
            }
        }

        return output as T;
    }

    return input;
}

function isIsoDate(str: string): boolean {
    // Vérifie si la string correspond à un format ISO valide
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(str);
}
