import { useTranslation } from "react-i18next";

import { FileInput } from "./lib";

interface Props {
  onFileSelected: (files: FileList) => void;
  formName?: string;
}

export default function UploadFileButton(props: Props) {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.uploadFileButton",
  });

  return (
    <FileInput
      id="chat-upload-file"
      label={t("label")}
      name={props.formName}
      onFileSelected={props.onFileSelected}
    />
  );
}
