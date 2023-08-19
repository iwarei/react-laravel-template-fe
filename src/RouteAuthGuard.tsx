import React, { ReactNode, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IsAuthedContext } from './context/AuthProvider';

type RouteAuthGuardProps = {
  children: ReactNode;
  redirect: string;
};

export const RouteAuthGuard: React.FC<RouteAuthGuardProps> = ({
  children,
  redirect,
}) => {
  const navigate = useNavigate();
  const { isAuthed } = useContext(IsAuthedContext)!;

  useEffect(() => {
    if (!isAuthed) {
      navigate(redirect);
    }
  }, []);

  return React.cloneElement(children as React.ReactElement);
};
