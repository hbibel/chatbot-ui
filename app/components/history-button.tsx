import { useTranslation } from "react-i18next";

import { toggleHistoryVisibility } from "@/actions/history";
import { Button } from "@/components/lib";

export default () => {
  let { t } = useTranslation("translation", {
    keyPrefix: "components.historyButton",
  });

  return <Button onClick={toggleHistoryVisibility}>{t("label")}</Button>;
};
