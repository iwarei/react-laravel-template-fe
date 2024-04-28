import React from 'react';

type LabelProps = {
  text: string;
  className?: string;
  htmlFor: string;
  id?: string;
};

export const Label = ({ text, className, htmlFor, id }: LabelProps) => {
  return (
    <label className={className} id={id} htmlFor={htmlFor}>
      {text}
    </label>
  );
};
