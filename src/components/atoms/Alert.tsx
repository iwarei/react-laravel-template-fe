import React, { useState, useEffect, useContext } from 'react';
import { Alert } from 'flowbite-react';

type AlertProps = {
  message: string;
  color?: string;
  addClass?: string[];
};

export const DismissableAlert: React.FC<AlertProps> = ({
  message,
  color = 'success',
  addClass = [],
}) => {
  const classNames = [...addClass].join(' ');

  const [display, setDisplay] = useState<boolean>(true);

  const dismissHandler = () => {
    setDisplay(false);
  };

  return (
    <>
      {display && (
        <Alert color={color} className={classNames} onDismiss={dismissHandler}>
          <span>
            <p>{message}</p>
          </span>
        </Alert>
      )}
    </>
  );
};
