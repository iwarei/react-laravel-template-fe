import React, { useState } from 'react';
import { Alert } from 'flowbite-react';

type AlertProps = {
  message: string;
  color?: string;
  addClass?: string[];
};

export const DismissableAlert = ({
  message,
  color = 'success',
  addClass = [],
}: AlertProps) => {
  const classNames = [...addClass].join(' ');

  const [display, setDisplay] = useState<boolean>(true);

  const dismissHandler = () => {
    setDisplay(false);
  };

  if (!display) {
    return null;
  }

  return (
    <Alert color={color} className={classNames} onDismiss={dismissHandler}>
      <span>
        <p>{message}</p>
      </span>
    </Alert>
  );
};
