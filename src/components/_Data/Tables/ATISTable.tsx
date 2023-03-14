import React, { useRef, useState } from 'react';
import Moment from 'react-moment';

import type ATIS from '@/interfaces/ATIS';
import { searchData } from '@/utils/SearchData';

interface Props {
  atis: ATIS[];
}

const ATISTable: React.FC<Props> = ({ atis }) => {
  const [allATIS] = useState<ATIS[]>(atis);
  const [filteredATIS, setFilteredATIS] = useState<ATIS[]>(allATIS);
  const searchRef = useRef<any>(null);
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
            className="block w-80 border border-zinc-600 bg-zinc-800 p-2 pl-10 text-sm text-gray-400 hover:text-gray-200 focus:border-purple-500"
            placeholder="Search atis..."
            ref={searchRef}
            onChange={(event) => {
              const results = searchData(event, allATIS);
              setFilteredATIS(results);
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
              Frequency
            </th>
            <th scope="col" className="px-6 py-3">
              Code
            </th>
            <th scope="col" className="px-6 py-3">
              Text
            </th>
            <th scope="col" className="px-6 py-3">
              ATIS
            </th>
            <th scope="col" className="px-6 py-3">
              Online For
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredATIS.length === 0 ? (
            <tr className="border-b border-zinc-600 bg-zinc-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 text-center font-medium text-gray-200"
                colSpan={6}
              >
                {searchRef.current?.value.length > 0 ? (
                  <span>There are 0 results for that search term!</span>
                ) : (
                  <span>There are currently 0 ATIS online!</span>
                )}
              </th>
            </tr>
          ) : (
            <>
              {filteredATIS.map((_atis: ATIS) => (
                <tr
                  className="border border-zinc-600 bg-zinc-800"
                  key={`${_atis.callsign}_${_atis.cid}`}
                >
                  <th
                    scope="row"
                    className="whitespace-nowrap px-6 py-4 text-gray-200"
                  >
                    {_atis.callsign}
                  </th>
                  <td className="px-6 py-4 text-gray-200">{_atis.frequency}</td>
                  <td className="px-6 py-4 text-gray-200">{_atis.atis_code}</td>
                  <td className="px-6 py-4 text-gray-200">{_atis.text_atis}</td>
                  <td className="px-6 py-4 text-gray-200">{_atis.name}</td>
                  <td className="px-6 py-4 text-gray-200">
                    <Moment durationFromNow>{_atis.logon_time}</Moment>
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

export default ATISTable;
