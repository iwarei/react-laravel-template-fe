import React from 'react';

type BlockProps = {
  children: React.ReactNode;
};

export const Block = ({ children }: BlockProps) => {
  return (
    <div className="p-4 my-8 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
      {children}
    </div>
  );
};
