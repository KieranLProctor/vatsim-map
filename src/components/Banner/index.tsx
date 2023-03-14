import React from 'react';

interface Props {
  type: 'success' | 'error' | 'warning' | 'info' | 'default';
  status?: string;
  message: string;
}

const getColours = (type: string) => {
  let bgColour;
  let borderColour;
  let textColour;

  switch (type) {
    case 'success':
      bgColour = 'bg-green-100';
      borderColour = 'border-green-800';
      textColour = 'text-green-800';
      break;

    case 'error':
      bgColour = 'bg-red-100';
      borderColour = 'border-red-800';
      textColour = 'text-red-800';
      break;

    case 'warning':
      bgColour = 'bg-yellow-100';
      borderColour = 'border-yellow-800';
      textColour = 'text-yellow-800';
      break;

    case 'info':
      bgColour = 'bg-blue-100';
      borderColour = 'border-blue-800';
      textColour = 'text-blue-800';
      break;

    default:
      bgColour = 'bg-zinc-800';
      borderColour = 'border-zinc-600';
      textColour = 'text-gray-200';
      break;
  }

  return { bgColour, borderColour, textColour };
};

const Banner: React.FC<Props> = ({ type, status, message }) => {
  const { bgColour, borderColour, textColour } = getColours(type);

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 tablet:flex tablet:justify-center tablet:px-6 tablet:pb-5 desktop:px-8">
      <div
        className={`pointer-events-auto flex items-center justify-between gap-x-6 border py-2.5 px-6 tablet:rounded-xl tablet:py-3 tablet:pr-3.5 tablet:pl-4 ${bgColour} ${borderColour}`}
      >
        <p className={`text-sm leading-6 ${textColour}`}>
          <a href="#">
            <strong className="font-semibold">{status}</strong>
            {status && (
              <svg
                viewBox="0 0 2 2"
                className="mx-2 inline h-0.5 w-0.5 fill-current"
                aria-hidden="true"
              >
                <circle cx="1" cy="1" r="1" />
              </svg>
            )}
            {message}
          </a>
        </p>
        <button type="button" className="-m-1.5 flex-none p-1.5">
          <span className="sr-only">Dismiss</span>
          <svg
            className={`h-5 w-5 ${textColour}`}
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Banner;
