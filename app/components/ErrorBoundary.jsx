'use client';

import { useState } from 'react';
import { layoutTranslations } from '@/app/config/translations';

export default function ErrorBoundary({ error, reset, lang = 'id' }) {
  const [isRetrying, setIsRetrying] = useState(false);
  const t = layoutTranslations[lang];

  const handleRetry = async () => {
    setIsRetrying(true);
    try {
      await reset();
    } finally {
      setIsRetrying(false);
    }
  };

  return (
    <div className="min-h-[400px] flex flex-col items-center justify-center p-4 text-center">
      {/* Icon */}
      <svg
        className="w-16 h-16 text-red-500 mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01M5.062 19h13.876c1.54 0 2.502-1.667 1.732-3L13.732 4a2 2 0 00-3.464 0L3.33 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>

      {/* Title & Description */}
      <h2 className="text-xl font-semibold text-gray-900 mb-2">
        {t.error.title}
      </h2>
      <p className="text-gray-600 mb-4">{t.error.description}</p>

      {/* Retry Button */}
      <button
        onClick={handleRetry}
        disabled={isRetrying}
        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isRetrying ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            {t.loading}
          </>
        ) : (
          t.error.retry
        )}
      </button>
    </div>
  );
}
