import {TaskFilter} from "@moodflow/types";

export const getPriorityStyles = (priority: 'high' | 'medium' | 'low') => {
    const styles = {
        high: 'bg-red-100 text-red-700',
        medium: 'bg-yellow-100 text-yellow-700',
        low: 'bg-gray-100 text-gray-700'
    };
    return styles[priority];
};

export function makeQueryParamsKey(page: number, pageSize: number, filters: TaskFilter): string {
    const params = new URLSearchParams();
    params.set("page", page.toString());
    params.set("pageSize", pageSize.toString());
    if (filters.status) params.set("status", filters.status);
    if (filters.category) params.set("category", filters.category);
    return params.toString(); // ex: "page=1&pageSize=10&status=pending"
}


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
    return /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z$/.test(str);
}

export function getCategoryStyles(category: string) {
    switch (category) {
        case 'creative':
            return 'bg-pink-100 text-pink-800';
        case 'admin':
            return 'bg-blue-100 text-blue-800';
        case 'meeting':
            return 'bg-orange-100 text-orange-800';
        case 'learning':
            return 'bg-purple-100 text-purple-800';
        case 'personal':
            return 'bg-green-100 text-green-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
}