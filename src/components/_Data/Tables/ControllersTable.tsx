import * as DropdownMenuPrimitive from '@radix-ui/react-dropdown-menu';
import { CheckIcon, ChevronDownIcon } from '@radix-ui/react-icons';
import React, { useRef, useState } from 'react';
import Moment from 'react-moment';

import type Controller from '@/interfaces/Controller';
import type Facility from '@/interfaces/Facility';
import type Rating from '@/interfaces/Rating';
import { searchData } from '@/utils/SearchData';

interface Props {
  controllers: Controller[];
  facilities: Facility[];
  ratings: Rating[];
}

const ControllersTable: React.FC<Props> = ({
  controllers,
  facilities,
  ratings,
}) => {
  const [allControllers] = useState<Controller[]>(controllers);
  const [filteredControllers, setFilteredControllers] =
    useState<Controller[]>(allControllers);
  const searchRef = useRef<any>(null);
  const [showingOBS, setShowingOBS] = useState<boolean>(false);

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
                    checked={showingOBS}
                    onCheckedChange={setShowingOBS}
                  >
                    <DropdownMenuPrimitive.ItemIndicator className="absolute left-0 inline-flex items-center justify-center text-white">
                      <CheckIcon />
                    </DropdownMenuPrimitive.ItemIndicator>
                    Show Observers
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
              Position
            </th>
            <th scope="col" className="px-6 py-3">
              Frequency
            </th>
            <th scope="col" className="px-6 py-3">
              Controller
            </th>
            <th scope="col" className="px-6 py-3">
              Rating
            </th>
            <th scope="col" className="px-6 py-3">
              Online For
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
                      {
                        ratings.filter(
                          (r: Rating) => r.id === controller.rating
                        )[0]?.short
                      }
                    </td>
                    <td className="px-6 py-4 text-gray-200">
                      <Moment durationFromNow>{controller.logon_time}</Moment>
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
