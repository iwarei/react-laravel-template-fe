import React, { createContext, ReactNode, useState, useEffect } from 'react';

type UserInfo = {
  name: string;
  email: string;
};

type AuthContextType = UserInfo | null | undefined;

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthContextType>(undefined);

  const authContextValue: AuthContextType = user;

  const loginSuccessHandler = (userInfo: UserInfo) => {
    setUser(userInfo);
  };

  const logoutHandler = () => {
    setUser(undefined);
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
