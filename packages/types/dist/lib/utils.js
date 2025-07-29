"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPriorityStyles = void 0;
const getPriorityStyles = (priority) => {
    const styles = {
        high: 'bg-red-100 text-red-700',
        medium: 'bg-yellow-100 text-yellow-700',
        low: 'bg-gray-100 text-gray-700'
    };
    return styles[priority];
};
exports.getPriorityStyles = getPriorityStyles;
