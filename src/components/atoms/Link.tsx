import React from 'react';

type LinkProps = {
  text: string;
  href: string;
  className?: string;
};

export const Link = ({ text, href, className = '' }: LinkProps) => {
  return (
    <a
      href={href}
      className={`font-medium text-blue-600 dark:text-blue-500 hover:underline mb-2 ${className}`}
    >
      {text}
    </a>
  );
};

export const PrimaryLink = ({ text, href, className = '' }: LinkProps) => {
  return (
    <a
      href={href}
      className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mx-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${className}`}
    >
      {text}
    </a>
  );
};
