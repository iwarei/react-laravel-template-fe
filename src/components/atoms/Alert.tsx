import React, { useState } from 'react';
import { Alert as FlowbiteAlert } from 'flowbite-react';

type AlertProps = {
  message: string;
  color?:
    | 'info'
    | 'gray'
    | 'failure'
    | 'success'
    | 'warning'
    | 'red'
    | 'green'
    | 'yellow'
    | 'blue'
    | 'cyan'
    | 'pink'
    | 'lime'
    | 'dark'
    | 'indigo'
    | 'purple'
    | 'teal'
    | 'light';
  className?: string;
  dismissable?: boolean;
};

export const Alert = ({
  message,
  color = 'success',
  className = '',
  dismissable = true,
}: AlertProps) => {
  const [display, setDisplay] = useState<boolean>(true);

  const dismissHandler = () => {
    setDisplay(false);
  };

  if (!display) {
    return null;
  }

  return (
    <FlowbiteAlert
      color={color}
      className={className}
      onDismiss={dismissable ? dismissHandler : undefined}
    >
      <span>
        <p>{message}</p>
      </span>
    </FlowbiteAlert>
  );
};
