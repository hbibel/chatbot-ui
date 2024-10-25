interface AddFileParameters {
  name: string;
  id: string;
}

// TODO database
const files: { name: string; id: string }[] = [];

export const addFile = async ({
  name,
  id,
}: AddFileParameters): Promise<void> => {
  files.push({ name, id });
};

export const getFiles = async () => {
  // TODO get by chat ID
  return files;
};
