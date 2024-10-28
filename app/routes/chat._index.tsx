import { type MetaFunction, json } from "@remix-run/node";
import { useFetcher, useLoaderData } from "@remix-run/react";
import { Ref, useRef } from "react";

import { getFiles } from "@/.server/documents";
import { AttachedFilesList } from "@/components/attached-files-list";
import ClearChatButton from "@/components/clear-chat-button";
import HistoryButton from "@/components/history-button";
import UploadFileButton from "@/components/upload-file-button";

export const meta: MetaFunction = () => {
  return [
    { title: "Chat Bot" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  const attachedFiles = await getFiles();
  return json({
    attachedFiles,
  });
}

export default function Index() {
  const data = useLoaderData<typeof loader>();

  const uploadFileFetcher = useFetcher();
  const uploadFormRef: Ref<HTMLFormElement> = useRef(null);

  const onUploadFileSelected = () => {
    if (uploadFormRef !== null) {
      uploadFileFetcher.submit(uploadFormRef.current);
    }
  };

  return (
    <div className="flex flex-col mt-1">
      <div className="flex justify-between">
        <HistoryButton />
        <div className="flex px-1 self-end">
          <ClearChatButton />
          <uploadFileFetcher.Form
            ref={uploadFormRef}
            method="post"
            action="/chat/documents"
            encType="multipart/form-data"
          >
            <UploadFileButton
              onFileSelected={onUploadFileSelected}
              formName="file"
            />
          </uploadFileFetcher.Form>
        </div>
      </div>
      <AttachedFilesList files={data.attachedFiles} />
    </div>
  );
}
