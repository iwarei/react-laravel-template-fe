import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthProvider';
import { PageTemplete } from '../templates/PageTemplate';

export const Home = () => {
  const { userInfo, setUserInfo } = useContext(AuthContext)!;
  console.log(userInfo);

  return (
    <PageTemplete headerText="Home">
      <p>テスト</p>
    </PageTemplete>
  );
};
