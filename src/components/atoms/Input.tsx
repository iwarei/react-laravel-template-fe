type InputFormProps = {
  value?: string;
  className?: string[];
  id: string;
  name?: string;
  placeholder?: string;
  disabled?: boolean;
};

export const InputForm = ({
  value,
  className,
  id,
  name,
  disabled,
  placeholder,
}: InputFormProps) => {
  const classNames = className ? className.join(' ') : '';
  return (
    <input
      className={classNames}
      id={id}
      name={name ?? ''}
      value={value ?? ''}
      placeholder={placeholder ?? ''}
      disabled={disabled ?? false}
    />
  );
};
