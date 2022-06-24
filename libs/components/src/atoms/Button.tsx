import React, { FC } from "react";
import "@libs/styles/lib/Button.css";

interface props {
  label: string;
}

const Button: FC<props> = ({ label }) => {
  return <button className="button-primary">{label}</button>;
};

export default Button;
