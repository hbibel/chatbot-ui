import {
  ChangeEvent,
  DetailedHTMLProps,
  InputHTMLAttributes,
  Ref,
  useRef,
} from "react";

type Props = {
  id: string;
  label: string;
  onFilesSelected: (files: FileList) => void;
} & Omit<
  DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>,
  "type"
>;

export default (props: Props) => {
  const { id, ...remainingProps } = props;

  const inputRef: Ref<HTMLInputElement> = useRef(null);
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = inputRef.current?.files;
    if (files !== null && files !== undefined) {
      props.onFilesSelected(files);
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

        enabled:hover:bg-gray-700

        disabled:cursor-not-allowed disabled:bg-gray-400 disabled:text-gray-200
      `}
      >
        {props.label}
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
};
