import React from 'react';

type ErrorPageProps = {
  code?: number;
  message?: string;
};

export const ErrorPage = ({
  code = 404,
  message = 'お探しのページは見つかりませんでした',
}: ErrorPageProps) => {
  return (
    <div>
      <h1>{`${code ?? ''} Error Page`}</h1>
      <p>{message}</p>
    </div>
  );
};
