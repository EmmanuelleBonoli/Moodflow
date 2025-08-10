interface PaginationControlsProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export function PaginationControls({
                                       currentPage,
                                       totalPages,
                                       onPageChange,
                                   }: PaginationControlsProps) {
    return (
        <div className="flex justify-center items-center gap-2 mt-4">
            <button
                type="button"
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="cursor-pointer px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-50"
            >
                ← Précédent
            </button>

            {Array.from({length: totalPages}, (_, i) => i + 1).map((page) => (
                <button
                    type="button"
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`cursor-pointer px-3 py-1 text-sm rounded border ${
                        page === currentPage
                            ? "bg-indigo-500 text-white border-indigo-500"
                            : "border-gray-300 text-gray-700"
                    }`}
                >
                    {page}
                </button>
            ))}

            <button
                type="button"
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="cursor-pointer px-3 py-1 text-sm rounded border border-gray-300 disabled:opacity-50"
            >
                Suivant →
            </button>
        </div>
    );
}