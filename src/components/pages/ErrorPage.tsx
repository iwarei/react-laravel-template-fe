import React from 'react';
import { PageTemplete } from '../templates/PageTemplate';

type ErrorPageProps = {
  code?: number;
  message?: string;
};

export const ErrorPage = ({
  code = 404,
  message = 'お探しのページは見つかりませんでした',
}: ErrorPageProps) => {
  return (
    <PageTemplete headerText={String(code)}>
      <p>{message}</p>
    </PageTemplete>
  );
};
