import React from 'react';

type HeadingProps = {
  text: string;
};

const H3 = ({ text }: HeadingProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-3xl font-bold dark:text-white">{text}</h3>
    </div>
  );
};

export const Heading = {
  H3,
};
