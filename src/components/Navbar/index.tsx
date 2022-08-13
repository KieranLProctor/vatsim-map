/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';

interface Props {}

const index: React.FC<Props> = () => {
  return (
    <header className="soft-shadow z-10 flex-none bg-white pt-8 tablet:py-8">
      <div className="mx-auto max-w-site px-8 leading-loose tablet:flex tablet:items-stretch tablet:px-16 tablet:leading-none">
        <a
          className="mb-8 block h-8 w-20 shrink-0 tablet:mb-0 tablet:h-auto tablet:w-44"
          href="/"
          title="Home"
        >
          <span className="h-full w-auto">
            <img src="/assets/svgs/logo.svg" alt="Logo" />
          </span>
        </a>
        <div className="col-gap-8 tablet:row-gap-6 grid grid-cols-2 items-start tablet:ml-auto tablet:grid-cols-1 tablet:justify-end tablet:justify-items-end">
          <nav className="flex tablet:row-start-2">
            <ul className="tablet:grid tablet:grid-flow-col tablet:justify-between tablet:gap-12">
              <li>
                <a href="#" className="text-lg hover:text-gray-500">
                  Example
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
      <div className="tablet:hidden">
        <hr className="mt-8 h-[2px] rounded text-gray-400 opacity-25" />
      </div>
    </header>
  );
};

export default index;
