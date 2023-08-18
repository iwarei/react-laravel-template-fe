import React, { ReactNode } from 'react';
import { Navbar } from '../organism/Navbar';

type PageTemplateProps = {
  headerText?: string;
  children: ReactNode;
};

export const PageTemplete: React.FC<PageTemplateProps> = ({
  headerText,
  children,
}) => {
  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto py-4 px-2">
        {headerText && (
          <div className="mb-6">
            <h3 className="text-3xl font-bold dark:text-white">{headerText}</h3>
          </div>
        )}
        {children}
      </main>
    </>
  );
};
