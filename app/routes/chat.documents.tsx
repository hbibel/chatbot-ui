import {
  ActionFunctionArgs,
  json,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";

import { addFile, deleteFile } from "@/.server/documents";

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method.toLowerCase() === "get") {
    return null;
  } else if (request.method.toLowerCase() === "post") {
    const fileUUID = crypto.randomUUID();
    let originalFileName: string | undefined = undefined;

    const uploadHandler = unstable_createFileUploadHandler({
      directory: ".uploaded-files",
      file: ({ filename }) => {
        originalFileName = filename;
        return fileUUID;
      },
    });

    await unstable_parseMultipartFormData(request, uploadHandler);
    console.log(`File ${originalFileName} persisted as ${fileUUID}`);

    if (!originalFileName) {
      console.warn("No file name provided to upload handler");
    }
    await addFile({ name: originalFileName ?? "unknown", id: fileUUID });

    return json({});
  } else if (request.method.toLowerCase() === "delete") {
    const id = await request.formData().then(data => data.get("id"));
    if (typeof id !== "string") {
      return json("'id' must be a string", { status: 400 });
    }

    console.log(`deleting file '${id}'`);
    await deleteFile({ id });
    return json({});
  } else {
    return json("not allowed", { status: 405 });
  }
};
