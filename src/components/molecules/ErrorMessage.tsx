interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage = ({
  title = 'Ops! Algo deu errado',
  message,
  onRetry,
}: ErrorMessageProps) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="rounded-lg bg-red-50 p-6 max-w-md mx-auto">
        <h3 className="text-lg font-medium text-red-800 mb-2">{title}</h3>
        <p className="text-red-700 mb-4">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-red-600 hover:text-red-800 font-medium transition-colors"
          >
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
};
