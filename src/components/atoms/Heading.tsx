import React from 'react';

type HeadingProps = {
  text: string;
};

const H1 = ({ text }: HeadingProps) => {
  return (
    <div className="mb-6">
      <h1 className="text-5xl font-extrabold dark:text-white">{text}</h1>;
    </div>
  );
};

const H2 = ({ text }: HeadingProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-4xl font-bold dark:text-white">{text}</h2>
    </div>
  );
};

const H3 = ({ text }: HeadingProps) => {
  return (
    <div className="mb-6">
      <h3 className="text-3xl font-bold dark:text-white">{text}</h3>
    </div>
  );
};

const H4 = ({ text }: HeadingProps) => {
  return (
    <div className="mb-6">
      <h4 className="text-2xl font-bold dark:text-white">{text}</h4>
    </div>
  );
};

const H5 = ({ text }: HeadingProps) => {
  return (
    <div className="mb-6">
      <h5 className="text-xl font-bold dark:text-white">{text}</h5>
    </div>
  );
};

const H6 = ({ text }: HeadingProps) => {
  return (
    <div className="mb-6">
      <h6 className="text-lg font-bold dark:text-white">{text}</h6>
    </div>
  );
};

export const Heading = {
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
};
