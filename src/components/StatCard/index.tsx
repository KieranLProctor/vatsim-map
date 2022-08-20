import React from 'react';

interface Props {
  title: string;
  value: any; // Can be either a string or number.
}

const StatCard: React.FC<Props> = ({ title, value }) => {
  return (
    <div className="overflow-hidden border border-zinc-600 bg-zinc-800 px-4 py-5 tablet:p-6">
      <dt className="truncate text-sm font-medium text-gray-400">{title}</dt>
      <dd className="mt-1 text-3xl font-semibold tracking-tight text-gray-200">
        {value}
      </dd>
    </div>
  );
};

export default StatCard;
