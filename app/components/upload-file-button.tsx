import { useTranslation } from "react-i18next";

import { uploadFiles } from "@/actions/chat";

import { FileInput } from "./lib";

export default function UploadFileButton() {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.uploadFileButton",
  });

  return (
    <FileInput
      id="chat-upload-file"
      label={t("label")}
      onFilesSelected={uploadFiles}
    />
  );
}
