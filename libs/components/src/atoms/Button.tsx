import { FC } from "react";

interface props {
  label: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
}

const Button: FC<props> = ({ label, type = "button", onClick = () => {} }) => {
  return (
    <button
      type={type}
      className={`px-6 py-3 text-white
                  bg-purple-600 rounded
                  outline-none focus:ring-2`}
      onClick={onClick}
    >
      {label}!
    </button>
  );
};

export default Button;
