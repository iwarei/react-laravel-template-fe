import React from 'react';
import { Toggle } from '../atoms/Toggle';
import { Label } from '../atoms/Label';

type ToggleWithLabelProps = {
  id?: string | undefined;
  labelId?: string | undefined;
  name: string;
  value?: string | number | undefined;
  checked?: boolean;
  disabled?: boolean;
  text: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ToggleWithLabel = ({
  id,
  labelId,
  name,
  value,
  checked = false,
  disabled = false,
  onChange,
  text,
}: ToggleWithLabelProps) => {
  return (
    <label
      className="flex justify-between items-center cursor-pointer"
      htmlFor={id ?? name}
    >
      {/* ラベル位置、右のほうが良い？ */}
      <Label text={text} htmlFor={id ?? name} id={labelId} />
      <Toggle
        name={name}
        id={id ?? name}
        disabled={disabled}
        onChange={onChange}
        value={value}
        checked={checked}
      />
    </label>
  );
};
