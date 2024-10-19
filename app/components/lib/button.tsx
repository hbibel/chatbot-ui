import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<Element> {}

export default (props: Props) => {
  return (
    <button className="bg-gray-300 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
      {props.children}
    </button>
  );
};
