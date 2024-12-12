interface LoadingProps {
  size?: 'sm' | 'md' | 'lg';
}

const sizeClasses = {
  sm: 'w-5 h-5',
  md: 'w-8 h-8',
  lg: 'w-12 h-12',
};

export const Loading = ({ size = 'md' }: LoadingProps) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`${sizeClasses[size]} animate-spin rounded-full border-4 border-primary border-t-transparent`}
        role="status"
        aria-label="Carregando..."
      />
      <span className="sr-only">Carregando...</span>
    </div>
  );
};
