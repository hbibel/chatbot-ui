import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<Element> {}

export default function Button(props: Props) {
  const { children, ...buttonProps } = { ...props };
  return (
    <button
      className={`
        text-white font-bold py-2 px-4 rounded

        bg-gray-600
        enabled:hover:bg-gray-700

        disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200
      `}
      {...buttonProps}
    >
      {children}
    </button>
  );
}
