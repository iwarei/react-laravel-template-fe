import React from 'react';

type PrimaryButtonProps = {
  type: 'button' | 'submit' | 'reset';
  text: string;
  className?: string[];
  id: string;
  name?: string;
  disabled?: boolean;
  onClickHandler?: () => void;
};

export const PrimaryButton = ({
  type = 'button',
  text,
  className,
  id,
  name,
  disabled = false,
  onClickHandler,
}: PrimaryButtonProps) => {
  const classNames = className ? className.join(' ') : '';

  return (
    <button
      type={type}
      className={classNames}
      name={name ?? ''}
      id={id}
      disabled={disabled}
      onClick={onClickHandler}
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
