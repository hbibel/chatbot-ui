import { useFetcher } from "@remix-run/react";

import { Trash2 } from "react-feather";

interface AttachedFile {
  id: string;
  name: string;
}

interface Props {
  files: AttachedFile[];
}

export function AttachedFile(props: { file: AttachedFile }) {
  const deleteFileFetcher = useFetcher();

  return (
    <li key={props.file.id} className="px-2 py-2">
      <deleteFileFetcher.Form
        className="flex flex-row items-center gap-2"
        method="delete"
        action="/chat/documents"
      >
        <button
          className={`
            text-white font-bold py-2 px-2 rounded-full
            bg-red-800 hover:bg-red-900
          `}
          type="submit"
        >
          <Trash2 size={"1em"} />
        </button>
        <input className="hidden" name="id" value={props.file.id} />
        <span>{props.file.name}</span>
      </deleteFileFetcher.Form>
    </li>
  );
}

export function AttachedFilesList(props: Props) {
  return (
    <>
      <span>Attached files:</span>
      <ul className="list-none divide-y divide-gray-200">
        {props.files.map(f => (
          <AttachedFile file={f} />
        ))}
      </ul>
    </>
  );
}
