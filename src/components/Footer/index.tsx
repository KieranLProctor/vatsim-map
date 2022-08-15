import React from 'react';

interface Props {}

const Footer: React.FC<Props> = () => {
  return (
    <footer className="fixed bottom-0 w-full bg-black tablet:py-3">
      <div className="mx-auto max-w-site px-8 leading-loose tablet:flex tablet:items-stretch tablet:px-16 tablet:leading-none">
        {/* Badge here */}
        <span className="inline-flex items-center bg-purple-700 px-2.5 py-0.5 text-sm font-medium text-white">
          Badge
        </span>
      </div>
    </footer>
  );
};

export default Footer;
