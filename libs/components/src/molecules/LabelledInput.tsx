import React, { FC } from "react";

import Input, { InputType } from "../atoms/Input";

interface LabelledInputProps {
  label: string;
  id?: string;
  field: React.ReactElement;
}

const LabelledInput: FC<LabelledInputProps> = ({ label, id, field }) => {
  return (
    <div className="flex flex-col pb-5">
      <label htmlFor={id} className="pb-2 text-stone-800">
        {label}
      </label>
      {field}
    </div>
  );
};

export default LabelledInput;
