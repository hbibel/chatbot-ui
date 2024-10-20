import { DetailedHTMLProps, InputHTMLAttributes } from "react";

type Props = {
  id: string;
  label: string;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "type"
>;

export default (props: Props) => {
  const { id, ...remainingProps } = props;

  return (
    <>
      <label
        htmlFor={id}
        className={`
        text-white font-bold py-2 px-4 rounded bg-gray-600 cursor-pointer

        enabled:hover:bg-gray-700

        disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200
      `}
      >
        {props.label}
      </label>
      <input className="hidden" type="file" id={id} {...remainingProps} />
    </>
  );
};
