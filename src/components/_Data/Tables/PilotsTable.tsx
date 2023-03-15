import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import React, { useRef, useState } from 'react';
import Moment from 'react-moment';

import type Pilot from '@/interfaces/Pilot';
import { searchData } from '@/utils/SearchData';

interface Props {
  pilots: Pilot[];
}

const PilotsTable: React.FC<Props> = ({ pilots }) => {
  const [allPilots] = useState<Pilot[]>(pilots);
  const [filteredPilots, setFilteredPilots] = useState<Pilot[]>(allPilots);
  const searchRef = useRef<any>(null);
  const [showingOnGround, setShowingOnGround] = useState<boolean>(true);
  const [showingInAir, setShowingInAir] = useState<boolean>(true);

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
            placeholder="Search pilots..."
            ref={searchRef}
            onChange={(event) => {
              const results = searchData(event, allPilots);
              setFilteredPilots(results);
            }}
          />
        </div>
        <div className="mt-6">
          <div className="relative inline-block text-left">
            <DropdownMenuPrimitive.Root>
              <DropdownMenuPrimitive.Trigger className="inline-flex w-full items-center justify-center border border-zinc-600 bg-zinc-800 px-4 py-2 text-sm font-medium text-gray-400 hover:text-gray-200 focus:border-purple-500">
                Options
                <span className="ml-2">
                  <ChevronDownIcon />
                </span>
              </DropdownMenuPrimitive.Trigger>
              <DropdownMenuPrimitive.Portal>
                <DropdownMenuPrimitive.Content
                  className="mt-2 min-w-min border border-zinc-600 bg-zinc-800 px-4 py-2 font-jetbrains"
                  align="end"
                >
                  <DropdownMenuPrimitive.CheckboxItem
                    className="group relative flex h-[25px] select-none items-center pl-6 text-sm font-medium text-gray-400 outline-none hover:text-gray-200"
                    checked={showingOnGround}
                    onCheckedChange={setShowingOnGround}
                  >
                    <DropdownMenuPrimitive.ItemIndicator className="absolute left-0 inline-flex items-center justify-center text-white">
                      <CheckIcon />
                    </DropdownMenuPrimitive.ItemIndicator>
                    Show On Ground
                  </DropdownMenuPrimitive.CheckboxItem>

                  <DropdownMenuPrimitive.CheckboxItem
                    className="group relative flex h-[25px] select-none items-center pl-6 text-sm font-medium text-gray-400 outline-none hover:text-gray-200"
                    checked={showingInAir}
                    onCheckedChange={setShowingInAir}
                  >
                    <DropdownMenuPrimitive.ItemIndicator className="absolute left-0 inline-flex items-center justify-center text-white">
                      <CheckIcon />
                    </DropdownMenuPrimitive.ItemIndicator>
                    Show In Air
                  </DropdownMenuPrimitive.CheckboxItem>
                </DropdownMenuPrimitive.Content>
              </DropdownMenuPrimitive.Portal>
            </DropdownMenuPrimitive.Root>
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
            <th scope="col" className="px-6 py-3">
              Transponder
            </th>
            <th scope="col" className="px-6 py-3">
              Pilot
            </th>
            <th scope="col" className="px-6 py-3">
              Online For
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredPilots.length === 0 ? (
            <tr className="border-b border-zinc-600 bg-zinc-800">
              <th
                scope="row"
                className="whitespace-nowrap px-6 py-4 text-center font-medium text-gray-200"
                colSpan={9}
              >
                {searchRef.current?.value.length > 0 ? (
                  <span>There are 0 results for that search term!</span>
                ) : (
                  <span>There are currently 0 pilots online!</span>
                )}
              </th>
            </tr>
          ) : (
            <>
              {filteredPilots
                .filter((x: Pilot) =>
                  showingOnGround ? x : x.altitude >= 100 && x.groundspeed > 0
                )
                .map((pilot: Pilot) => (
                  <tr
                    className="border border-zinc-600 bg-zinc-800"
                    key={`${pilot.callsign}_${pilot.cid}`}
                  >
                    <th
                      scope="row"
                      className="whitespace-nowrap px-6 py-4 text-gray-200"
                    >
                      {pilot.callsign}
                    </th>
                    <td className="px-6 py-4 text-gray-200">
                      {pilot.flight_plan?.aircraft_faa}
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      {pilot.flight_plan?.departure}
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      {pilot.flight_plan?.arrival}
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      {pilot.altitude}
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      {pilot.groundspeed}
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      {pilot.transponder}
                    </td>
                    <td className="px-6 py-4 text-gray-200">{pilot.name}</td>
                    <td className="px-6 py-4 text-gray-200">
                      <Moment durationFromNow>{pilot.logon_time}</Moment>
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

export default PilotsTable;
