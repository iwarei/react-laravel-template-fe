import React, { ReactNode, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../organism/Navbar';
import { DismissableAlert } from '../atoms/Alert';
import { AlertContext } from '../../context/AlertProvider';

type PageTemplateProps = {
  headerText?: string;
  children: ReactNode;
};

export const PageTemplete: React.FC<PageTemplateProps> = ({
  headerText,
  children,
}) => {
  const location = useLocation();
  const { alert } = useContext(AlertContext)!;

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto py-4 px-6">
        {(alert?.msg || location.state?.msg) && (
          <DismissableAlert
            addClass={['mb-3']}
            color={alert?.color ?? location.state?.color ?? 'failure'}
            message={alert?.msg ?? location.state?.msg}
          />
        )}

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
