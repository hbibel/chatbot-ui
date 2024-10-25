import {
  ActionFunctionArgs,
  json,
  redirect,
  unstable_createFileUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node";

import { addFile } from "@/.server/documents";

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

    return redirect("/chat");
  } else {
    return json("not allowed", { status: 405 });
  }
};
