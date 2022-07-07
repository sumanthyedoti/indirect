import { FC } from "react";

interface props {
  label: string;
  onClick?: () => void;
}

const Button: FC<props> = ({ label, onClick = () => {} }) => {
  return (
    <button
      className="p-5 m-10 text-white rounded bg-violet-600"
      onClick={onClick}
    >
      {label}!
    </button>
  );
};

export default Button;
