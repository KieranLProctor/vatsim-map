import React, { useState } from 'react';

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
  // TODO: Add in button to toggle showing observers.
  // const [showingObs, setShowingObs] = useState<boolean>(false);

  return (
    <div className="relative overflow-x-auto">
      <div className="pb-4">
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
            className="block w-80 border border-zinc-600 bg-zinc-800 p-2 pl-10 text-sm text-gray-400 hover:text-gray-200 focus:border-blue-500 focus:ring-blue-500 "
            placeholder="Search controllers..."
            onChange={(event) => {
              const results = searchData(event, allControllers);
              setFilteredControllers(results);
            }}
          />
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
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-200"
                colSpan={5}
              >
                There are currently 0 controllers online!
              </th>
            </tr>
          ) : (
            <>
              {filteredControllers.map((controller: Controller) => (
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
                  <td className="px-6 py-4 text-gray-200">{controller.name}</td>
                  <td className="px-6 py-4 text-gray-200">
                    {controller.logon_time}
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
