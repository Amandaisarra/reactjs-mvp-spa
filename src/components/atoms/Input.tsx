import { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helper, className, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>}
        <div className="relative">
          <input
            ref={ref}
            className={twMerge(
              'w-full px-4 py-2.5 rounded-lg text-gray-900 placeholder:text-gray-400',
              'bg-white border border-gray-300 shadow-sm',
              'transition-all duration-200',
              'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
              'disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed',
              error && 'border-red-500 focus:border-red-500 focus:ring-red-500/20 pr-10',
              className
            )}
            {...props}
          />
          {error && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
            </div>
          )}
        </div>
        {(error || helper) && (
          <p className={twMerge('mt-1.5 text-sm', error ? 'text-red-500' : 'text-gray-500')}>
            {error || helper}
          </p>
        )}
      </div>
    );
  }
);
