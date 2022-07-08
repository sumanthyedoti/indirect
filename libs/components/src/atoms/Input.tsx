import React, { FC } from "react";

export type InputType =
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "reset"
  | "search"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week";

interface Props {
  type: InputType;
  id?: string;
  placeholder?: string;
}

const Input: FC<Props> = ({ type, id, placeholder }) => {
  return (
    <input
      className="px-4 py-2 outline-none rounded-md focus:ring ring-offset-2"
      placeholder={placeholder}
      id={id}
      type={type}
    />
  );
};

export default Input;
