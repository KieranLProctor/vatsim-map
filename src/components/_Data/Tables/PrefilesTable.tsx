import React, { useState } from 'react';

import type Prefile from '@/interfaces/Prefile';
import { searchData } from '@/utils/SearchData';

interface Props {
  prefiles: Prefile[];
}

const PrefilesTable: React.FC<Props> = ({ prefiles }) => {
  const [allPrefiles] = useState<Prefile[]>(prefiles);
  const [filteredPrefiles, setFilteredPrefiles] =
    useState<Prefile[]>(allPrefiles);

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
            placeholder="Search prefiles..."
            onChange={(event) => {
              const results = searchData(event, allPrefiles);
              setFilteredPrefiles(results);
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
              Aircraft
            </th>
            <th scope="col" className="px-6 py-3">
              Departure
            </th>
            <th scope="col" className="px-6 py-3">
              Arrival
            </th>
            <th scope="col" className="px-6 py-3">
              Altitude
            </th>
            <th scope="col" className="px-6 py-3">
              Speed
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredPrefiles.length === 0 ? (
            <tr className="border-b border-zinc-600 bg-zinc-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 font-medium text-gray-200"
                colSpan={8}
              >
                There are currently 0 pilots online!
              </th>
            </tr>
          ) : (
            <>
              {filteredPrefiles.map((prefile: Prefile) => (
                <tr
                  className="border border-zinc-600 bg-zinc-800"
                  key={`${prefile.callsign}_${prefile.cid}`}
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 text-gray-200"
                  >
                    {prefile.callsign}
                  </th>
                  <td className="px-6 py-4 text-gray-200">
                    {prefile.flight_plan?.aircraft_faa}
                  </td>
                  <td className="px-6 py-4 text-gray-200">
                    {prefile.flight_plan?.departure}
                  </td>
                  <td className="px-6 py-4 text-gray-200">
                    {prefile.flight_plan?.arrival}
                  </td>
                  <td className="px-6 py-4 text-gray-200">
                    {prefile.flight_plan?.altitude}
                  </td>
                  <td className="px-6 py-4 text-gray-200">
                    {prefile.flight_plan?.cruise_tas}
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

export default PrefilesTable;
