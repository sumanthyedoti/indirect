import { FC } from "react";

interface props {
  label: string;
  onClick?: () => void;
}

const Button: FC<props> = ({ label, onClick = () => {} }) => {
  return (
    <button
      className="bg-violet-600 text-white p-5 rounded m-10"
      onClick={onClick}
    >
      {label}!
    </button>
  );
};

export default Button;
