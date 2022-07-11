import { FC } from "react";

interface Props {
  children: string | undefined;
}

const FormFieldError: FC<Props> = ({ children }) => {
  return <p className="text-sm text-red-500">{children}</p>;
};

export default FormFieldError;
