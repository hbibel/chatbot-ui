interface AttachedFile {
  id: string;
  name: string;
}

interface Props {
  files: AttachedFile[];
}

// TODO placeholder component, need to style properly
export function AttachedFilesList(props: Props) {
  return (
    <>
      <ul>
        {props.files.map(f => (
          <li key={f.id}>{f.name}</li>
        ))}
      </ul>
    </>
  );
}
