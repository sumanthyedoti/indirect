import React, { FC } from "react";

type InputType =
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
}

const Input: FC<Props> = ({ type }) => {
  return <input type={type} />;
};

export default Input;
