import React from 'react';

interface Props {}

const CookieBanner: React.FC<Props> = () => {
  return (
    <div className="fixed w-full bg-black align-baseline tablet:py-3">
      <div className="mx-auto max-w-site px-8 leading-loose tablet:flex tablet:items-stretch tablet:px-16 tablet:leading-none">
        {/* Badge here */}
        <span className="inline-flex items-center bg-purple-700 px-2.5 py-0.5 text-sm font-medium text-white">
          Badge
        </span>
      </div>
    </div>
  );
};

export default CookieBanner;
