import React from 'react';

type InputFormProps = {
  value?: string;
  type?: string;
  className?: string[];
  addClass?: string[];
  id: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputForm = ({
  value,
  type = 'text',
  className = [
    'bg-gray-50',
    'border border-gray-300',
    'text-gray-900',
    'text-sm',
    'rounded-lg',
    'focus:ring-blue-500',
    'focus:border-blue-500',
    'block',
    'w-full',
    'p-2.5',
    'dark:bg-gray-700',
    'dark:border-gray-600',
    'dark:placeholder-gray-400',
    'dark:text-white',
    'dark:focus:ring-blue-500',
    'dark:focus:border-blue-500',
  ],
  addClass = [],
  id,
  name,
  disabled,
  placeholder,
  required = false,
  onChange,
}: InputFormProps) => {
  const classNames = [...className, ...addClass].join(' ');

  return (
    <input
      type={type}
      id={id}
      name={name ?? ''}
      className={classNames}
      placeholder={placeholder ?? ''}
      disabled={disabled ?? false}
      onChange={onChange}
      required={required}
      defaultValue={value ?? ''}
    />
  );
};
