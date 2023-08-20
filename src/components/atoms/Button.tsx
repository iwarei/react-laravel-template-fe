import React from 'react';

type PrimaryButtonProps = {
  type?: 'button' | 'submit' | 'reset';
  text: string;
  className?: string[];
  addClass?: string[];
  id: string;
  name?: string;
  disabled?: boolean;
  onClick?: () => void;
};

export const PrimaryButton = ({
  type = 'button',
  text,
  className = [
    'text-white',
    'bg-blue-700',
    'hover:bg-blue-800',
    'focus:outline-none',
    'focus:ring-4',
    'focus:ring-blue-300',
    'font-medium',
    'rounded-full',
    'text-sm',
    'px-5',
    'py-2.5',
    'text-center',
    'mx-2',
    'mb-2',
    'dark:bg-blue-600',
    'dark:hover:bg-blue-700',
    'dark:focus:ring-blue-800',
  ],
  addClass = [],
  id,
  name,
  disabled = false,
  onClick,
}: PrimaryButtonProps) => {
  const classNames = [...className, ...addClass].join(' ');

  return (
    <button
      type={type}
      className={classNames}
      name={name ?? ''}
      id={id}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

type CommonButtonProps = {
  text: string;
  className?: string[];
  id: string;
  name?: string;
  disabled?: boolean;
};

export const CommonButton = ({
  text,
  className,
  id,
  name,
  disabled = false,
}: CommonButtonProps) => {
  const classNames = className ? className.join(' ') : '';

  return (
    <button
      className={classNames}
      name={name ?? ''}
      id={id}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
