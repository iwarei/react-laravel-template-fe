import React from 'react';
import { PageTemplate } from '../templates/PageTemplate';

type ErrorPageProps = {
  code?: number | string;
  message?: string;
};

export const ErrorPage = ({
  code = '404 Not found',
  message = 'お探しのページは見つかりませんでした',
}: ErrorPageProps) => {
  return (
    <PageTemplate headerText={String(code)}>
      <p>{message}</p>
    </PageTemplate>
  );
};
