import React, { useContext } from 'react';
import { AuthInfoContext } from '../../context/AuthProvider';
import { PageTemplete } from '../templates/PageTemplate';

export const Home = () => {
  const { userInfo, setUserInfo } = useContext(AuthInfoContext)!;
  console.log(userInfo);

  return (
    <PageTemplete headerText="Home">
      <p>テスト</p>
    </PageTemplete>
  );
};
