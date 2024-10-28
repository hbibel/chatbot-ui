interface AddFileParameters {
  name: string;
  id: string;
}

interface DeleteFileParameters {
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

export const deleteFile = async ({
  id,
}: DeleteFileParameters): Promise<void> => {
  const idx = files.findIndex(f => f.id === id);
  if (idx === -1) {
    return;
  }
  files.splice(idx, 1);
};

export const getFiles = async () => {
  // TODO get by chat ID
  return files;
};
