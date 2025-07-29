interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({children, className = ''}: CardProps) {
    return (
        <div className={`bg-card/60 backdrop-blur-sm rounded-2xl p-6 border border-border shadow-xl ${className}`}>
            {children}
        </div>
    );
}
