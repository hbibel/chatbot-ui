import { useTranslation } from "react-i18next";

import Button from "./lib/button";
import FileInput from "./lib/file-input";

export default () => {
  let { t } = useTranslation("translation", {
    keyPrefix: "components.uploadFileButton",
  });

  return <FileInput id="chat-upload-file" label={t("label")} />;
};
