export const getPriorityStyles = (priority: 'high' | 'medium' | 'low') => {
    const styles = {
        high: 'bg-red-100 text-red-700',
        medium: 'bg-yellow-100 text-yellow-700',
        low: 'bg-gray-100 text-gray-700'
    };
    return styles[priority];
};