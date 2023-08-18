import React from 'react';

type InputFormProps = {
  value?: string;
  className?: string[];
  id: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputForm = ({
  value,
  className,
  id,
  name,
  disabled,
  placeholder,
  onChange,
}: InputFormProps) => {
  const classNames = className ? className.join(' ') : '';

  return (
    <input
      className={classNames}
      id={id}
      name={name ?? ''}
      // value={value ?? ''}
      placeholder={placeholder ?? ''}
      disabled={disabled ?? false}
      onChange={onChange}
    />
  );
};
