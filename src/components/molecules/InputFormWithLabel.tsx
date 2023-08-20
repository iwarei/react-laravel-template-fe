import React from 'react';
import { InputForm } from '../atoms/Input';
import { Label } from '../atoms/Label';

type InputFormWithLabelProps = {
  type?: string;
  value?: string;
  formClass?: string[];
  formId?: string;
  formName: string;
  placeholder?: string;
  disabled?: boolean;
  labelText: string;
  labelClass?: string[];
  labelId?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const InputFormWithLabel = ({
  type = 'text',
  value,
  formClass,
  formId,
  formName,
  placeholder,
  disabled,
  labelText,
  labelClass,
  labelId,
  onChange,
}: InputFormWithLabelProps) => {
  return (
    <div className="mb-4">
      <Label
        text={labelText}
        className={labelClass}
        htmlFor={formId ?? formName}
        id={labelId ?? ''}
      />
      <InputForm
        type={type}
        className={formClass}
        id={formId ?? formName}
        name={formName}
        value={value ?? ''}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
      />
    </div>
  );
};