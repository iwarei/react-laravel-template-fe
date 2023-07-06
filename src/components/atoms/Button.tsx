type PrimaryButtonProps = {
  text: string;
  className?: string[];
  id: string;
  name?: string;
  disabled?: boolean;
};

export const PrimaryButton = ({
  text,
  className,
  id,
  name,
  disabled=false,
}: PrimaryButtonProps) => {
  const classNames = className ? className.join(' ') : '';

  return (
    <button className={classNames} name={name ?? ''} id={id} disabled={disabled}>
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
