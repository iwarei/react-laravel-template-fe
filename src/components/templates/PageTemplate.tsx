import React, { ReactNode, useContext, useEffect } from 'react';
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
  const { alert, setAlert } = useContext(AlertContext)!;

  useEffect(() => {
    setAlert(undefined);
  }, [location.pathname]);

  return (
    <>
      <Navbar />
      <main className="max-w-5xl mx-auto py-4 px-6">
        {(alert?.msg || location.state?.msg) && (
          <DismissableAlert
            addClass={['mb-3']}
            color={
              alert?.msg
                ? alert?.color ?? 'success'
                : location.state?.color ?? 'success'
            }
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
