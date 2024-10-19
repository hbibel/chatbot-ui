import { useTranslation } from "react-i18next";

import { Button } from "@/components/lib";

export default () => {
  let { t } = useTranslation("translation", {
    keyPrefix: "components.historyButton",
  });

  return <Button>{t("label")}</Button>;
};
