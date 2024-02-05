import React from 'react';

type InputFormProps = {
  value?: string;
  type?: string;
  className?: string;
  id: string;
  name?: string;
  placeholder?: string;
  autocomplete?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputForm = ({
  value,
  type = 'text',
  className = '',
  id,
  name,
  disabled = false,
  placeholder,
  autocomplete,
  required = false,
  onChange,
}: InputFormProps) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
      placeholder={placeholder}
      autoComplete={autocomplete}
      disabled={disabled}
      onChange={onChange}
      required={required}
      defaultValue={value}
    />
  );
};

type InputFileProps = {
  className?: string;
  id?: string;
  name: string;
  disabled?: boolean;
  multiple?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputFile = ({
  className = '',
  id,
  name,
  disabled = false,
  multiple = false,
  onChange,
}: InputFileProps) => {
  return (
    <input
      className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${className}`}
      type="file"
      id={id}
      name={name}
      disabled={disabled}
      multiple={multiple}
      onChange={onChange}
    />
  );
};
