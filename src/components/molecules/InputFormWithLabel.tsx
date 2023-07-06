import { InputForm } from '../atoms/Input';
import { Label } from '../atoms/Label';

type InputFormWithLabelProps = {
  value?: string;
  formClass?: string[];
  formId: string;
  formName?: string;
  placeholder?: string;
  disabled?: boolean;
  labelText: string;
  labelClass?: string[];
  labelId?: string;
};

export const InputFormWithLabel = ({
  value,
  formClass,
  formId,
  formName,
  placeholder,
  disabled,
  labelText,
  labelClass,
  labelId,
}: InputFormWithLabelProps) => {
  return (
    <>
      <Label
        text={labelText}
        className={labelClass}
        htmlFor={formId}
        id={labelId ?? ''}
      />
      <InputForm
        className={formClass}
        id={formId}
        name={formName}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
    </>
  );
};
