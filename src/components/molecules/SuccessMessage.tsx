import { CheckCircleIcon } from '@heroicons/react/24/outline';

interface SuccessMessageProps {
  title: string;
  message: string;
  onAction?: () => void;
  actionText?: string;
}

export const SuccessMessage = ({ title, message, onAction, actionText }: SuccessMessageProps) => {
  return (
    <div className="text-center py-12 px-4">
      <div className="rounded-lg bg-green-50 p-6 max-w-md mx-auto">
        <div className="flex justify-center mb-4">
          <CheckCircleIcon className="h-12 w-12 text-green-500" />
        </div>
        <h3 className="text-lg font-medium text-green-800 mb-2">{title}</h3>
        <p className="text-green-700 mb-4">{message}</p>
        {onAction && actionText && (
          <button
            onClick={onAction}
            className="text-green-600 hover:text-green-800 font-medium transition-colors"
          >
            {actionText}
          </button>
        )}
      </div>
    </div>
  );
};
