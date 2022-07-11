import { FC, ReactElement } from "react";

import { FormFieldError } from "../atoms";

interface FormInputProps {
  label: string;
  id?: string;
  field: ReactElement;
  error?: string;
}

const FormInput: FC<FormInputProps> = ({ label, id, field, error }) => {
  return (
    <div className="flex flex-col pb-5">
      <label htmlFor={id} className="pb-1 text-sm">
        {label.toUpperCase()}
      </label>
      {field}
      <FormFieldError>{error}</FormFieldError>
    </div>
  );
};

export default FormInput;
