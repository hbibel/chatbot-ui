import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  Ref,
  useRef,
} from "react";

import Button from "./button";

type Props = {
  id: string;
  label: string;
  onFileSelected: (files: FileList) => void;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "type"
>;

export default function FileInput(props: Props) {
  const { id, label, onFileSelected, ...remainingProps } = props;

  const inputRef: Ref<HTMLInputElement> = useRef(null);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = inputRef.current?.files;
    if (files !== null && files !== undefined) {
      onFileSelected(files);
    }
    if (props.onChange !== undefined) {
      props.onChange(e);
    }
  };

  return (
    <>
      <label
        htmlFor={id}
        className={`
          text-white font-bold py-2 px-4 rounded bg-gray-600 cursor-pointer
          inline-block

          enabled:hover:bg-gray-700

          disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200
        `}
      >
        {label}
      </label>
      <input
        className="hidden"
        type="file"
        id={id}
        {...remainingProps}
        onChange={onChange}
        ref={inputRef}
      />
    </>
  );
}
