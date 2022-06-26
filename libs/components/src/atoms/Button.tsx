import React, { FC } from "react";
import "@libs/style/src/Button.scss";

interface props {
  label: string;
  onClick?: () => void;
}

const Button: FC<props> = ({ label, onClick = () => {} }) => {
  return (
    <button className="button-primary" onClick={onClick}>
      {label + "!"}
    </button>
  );
};

export default Button;
