import React, { createContext, ReactNode, useState, useMemo } from 'react';

type LoadingContextType = {
  loading: boolean;
  manualSetLoading: React.Dispatch<React.SetStateAction<number>>;
  clearLoading: () => void;
  setLoading: () => void;
  unsetLoading: () => void;
};

export const LoadingContext = createContext<LoadingContextType | undefined>(
  undefined
);

type LoadingProviderProps = {
  children: ReactNode;
};

export const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [manualLoading, manualSetLoading] = useState<number>(0);

  const clearLoading = () => {
    manualSetLoading(0);
  };

  const setLoading = () => {
    manualSetLoading((prev) => prev + 1);
  };

  const unsetLoading = () => {
    manualSetLoading((prev) => prev - 1);
  };

  const loading = Boolean(manualLoading);

  const LoadingContextValue: LoadingContextType = useMemo(
    () => ({
      loading,
      manualSetLoading,
      clearLoading,
      setLoading,
      unsetLoading,
    }),
    [loading]
  );

  return (
    <LoadingContext.Provider value={LoadingContextValue}>
      {children}
    </LoadingContext.Provider>
  );
};
