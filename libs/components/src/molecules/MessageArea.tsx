import { FC } from "react";

// interface MessageArProps {}
const MessageArea: FC = ({ ...props }) => {
  return (
    <div
      {...props}
      contentEditable={true}
      data-placeholder="Message"
      className={`
        bg-slate-800
        grow
        px-3 py-2
        border border-gray-600 focus:border-gray-400
        outline-none
        rounded
      `}
    ></div>
  );
};

export default MessageArea;
