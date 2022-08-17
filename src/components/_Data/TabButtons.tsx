import React from 'react';

interface Props {
  selectedTab: string;
  setSelectedTab: (value: any) => void; // This should be value: State but was returning undefined.
}

const TABS: string[] = ['Flights', 'ATC', 'Airlines', 'Aircraft'];

const TabButtons: React.FC<Props> = ({ selectedTab, setSelectedTab }) => {
  return (
    <div className="flex space-x-2">
      {TABS.map((tab: string, index: number) => (
        <button
          key={index}
          type="button"
          className={`${
            selectedTab.toUpperCase() === tab.toUpperCase()
              ? 'border border-zinc-600 bg-zinc-800 text-gray-200'
              : 'text-gray-400'
          } px-3 py-2 text-sm hover:text-gray-200`}
          onClick={() => setSelectedTab(tab.toUpperCase())}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default TabButtons;
