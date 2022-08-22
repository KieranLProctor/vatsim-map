import React, { useRef, useState } from 'react';
import Moment from 'react-moment';

import type Controller from '@/interfaces/Controller';
import type Facility from '@/interfaces/Facility';
import { searchData } from '@/utils/SearchData';

interface Props {
  controllers: Controller[];
  facilities: Facility[];
}

const ControllersTable: React.FC<Props> = ({ controllers, facilities }) => {
  const [allControllers] = useState<Controller[]>(controllers);
  const [filteredControllers, setFilteredControllers] =
    useState<Controller[]>(allControllers);
  const searchRef = useRef<any>(null);
  const [isOptionsOpen, setIsOptionsOpen] = useState<boolean>(false);
  const [showingOBS, setShowingOBS] = useState<boolean>(true);

  return (
    <div className="relative overflow-x-auto">
      <div className="flex items-center justify-between pb-4">
        <label htmlFor="table-search" className="sr-only">
          Search
        </label>
        <div className="relative mt-6">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="h-5 w-5 text-gray-500"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <input
            type="text"
            id="table-search"
            className="block w-80 border border-zinc-600 bg-zinc-800 p-2 pl-10 text-sm text-gray-400 hover:text-gray-200 focus:border-purple-500"
            placeholder="Search controllers..."
            ref={searchRef}
            onChange={(event) => {
              const results = searchData(event, allControllers);
              setFilteredControllers(results);
            }}
          />
        </div>

        <div className="mt-6">
          <div className="relative inline-block text-left">
            <div>
              <button
                type="button"
                className="inline-flex w-full justify-center border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-200 focus:border-purple-500"
                onClick={() => setIsOptionsOpen(!isOptionsOpen)}
              >
                Options
                <svg
                  className="ml-2 -mr-1 h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>

            <div
              className={`${
                isOptionsOpen ? 'absolute' : 'hidden'
              } right-0 mt-2 w-56 origin-top-right border border-zinc-600 bg-zinc-800`}
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
              tabIndex={-1}
            >
              <div className="py-1" role="none">
                <div className="relative flex items-start px-4 py-2">
                  <div className="flex h-5 items-center">
                    <input
                      type="checkbox"
                      id="showOBS"
                      className="h-4 w-4 border border-zinc-600 text-purple-800 focus:ring-purple-500"
                      checked={showingOBS}
                      onClick={() => setShowingOBS(!showingOBS)}
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label
                      htmlFor="showOBS"
                      className="font-medium text-gray-200"
                    >
                      Show Observers
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <table className="w-full border border-zinc-600 bg-zinc-800 text-left text-sm text-gray-400">
        <thead className="border border-zinc-600 text-gray-200">
          <tr>
            <th scope="col" className="px-6 py-3">
              Callsign
            </th>
            <th scope="col" className="px-6 py-3">
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Frequency
            </th>
            <th scope="col" className="px-6 py-3">
              Controller
            </th>
            <th scope="col" className="px-6 py-3">
              Logon Time
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredControllers.length === 0 ? (
            <tr className="border-b border-zinc-600 bg-zinc-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 text-center font-medium text-gray-200"
                colSpan={5}
              >
                {searchRef.current?.value.length > 0 ? (
                  <span>There are 0 results for that search term!</span>
                ) : (
                  <span>There are currently 0 controllers online!</span>
                )}
              </th>
            </tr>
          ) : (
            <>
              {/* A bit hacky but it works. */}
              {filteredControllers
                .filter((x: Controller) =>
                  showingOBS
                    ? facilities[x.facility]?.short !== 'C3L'
                    : facilities[x.facility]?.short !== 'OBS'
                )
                .map((controller: Controller) => (
                  <tr
                    className="border border-zinc-600 bg-zinc-800"
                    key={`${controller.callsign}_${controller.cid}`}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 text-gray-200"
                    >
                      {controller.callsign}
                    </th>
                    <td className="px-6 py-4 text-gray-200">
                      {facilities[controller.facility]?.short}
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      {controller.frequency}
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      {controller.name}
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      <Moment>{controller.logon_time}</Moment>
                    </td>
                  </tr>
                ))}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ControllersTable;
