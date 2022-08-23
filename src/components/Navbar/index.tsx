/* eslint-disable @next/next/no-html-link-for-pages */
import React from 'react';

interface Props {}

const Navbar: React.FC<Props> = () => {
  return (
    <div className="z-10 flex-none bg-black py-6">
      <div className="mx-auto flex max-w-site items-stretch px-8 leading-loose tablet:px-16 tablet:leading-none">
        <a
          className="block h-8 w-20 shrink-0 tablet:h-auto tablet:w-44"
          href="/"
          title="Home"
        >
          <span className="h-full w-auto">
            <img src="/assets/svgs/logo.svg" alt="Logo" />
          </span>
        </a>
        <div className="col-gap-8 row-gap-6 ml-auto grid grid-cols-1 items-start justify-end justify-items-end">
          <nav className="flex tablet:row-start-2">
            <ul className="grid grid-flow-col justify-between gap-10">
              <li>
                <a
                  href="/"
                  className="text-md text-gray-400 hover:text-gray-200"
                >
                  Map
                </a>
              </li>

              <li>
                <a
                  href="/data"
                  className="text-md text-gray-400 hover:text-gray-200"
                >
                  Data
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
