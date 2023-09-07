import React, { ReactNode, useContext, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from '../organism/Navbar';
import { DismissableAlert } from '../atoms/Alert';
import { AlertContext } from '../../context/AlertProvider';
import { Spinner } from '../atoms/Spinner';

type PageTemplateProps = {
  headerText?: string;
  children: ReactNode;
  loading?: boolean;
};

export const PageTemplete: React.FC<PageTemplateProps> = ({
  headerText,
  children,
  loading = false,
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
        {/* アラートメッセージを表示 */}
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
        {/* ヘッダ用テキスト */}
        {headerText && (
          <div className="mb-6">
            <h3 className="text-3xl font-bold dark:text-white">{headerText}</h3>
          </div>
        )}
        {/* 画面要素 */}
        {children}
        {/* ロード中 画面を暗くしスピナーを表示する */}
        {loading && (
          <>
            <div
              role="status"
              className="fixed -translate-x-1/2 -translate-y-1/2 top-2/4 left-1/2 z-20"
            >
              <Spinner />
            </div>
            <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 visible z-10" />
          </>
        )}
      </main>
    </>
  );
};
