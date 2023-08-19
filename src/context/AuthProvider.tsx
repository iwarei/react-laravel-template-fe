import React, { createContext, ReactNode, useState, useMemo } from 'react';

type UserInfo = {
  id: number;
  name: string;
  email: string;
};

type AuthContextType = {
  userInfo: UserInfo | undefined;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | undefined>>;
};

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [userInfo, setUserInfo] = useState<UserInfo | undefined>(undefined);

  const authContextValue: AuthContextType = useMemo(
    () => ({
      userInfo,
      setUserInfo,
    }),
    [userInfo]
  );

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
