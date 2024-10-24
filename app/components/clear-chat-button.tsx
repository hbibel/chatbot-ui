import { useTranslation } from "react-i18next";

import { clearChat } from "@/actions/chat";
import { Button } from "@/components/lib";
import { useApplicationState } from "@/state/state";

export default function ClearChatButton() {
  const { t } = useTranslation("translation", {
    keyPrefix: "components.clearChatButton",
  });
  const disabled = useApplicationState(s => s.chat.messages.length === 0);

  return (
    <Button onClick={clearChat} disabled={disabled}>
      {t("label")}
    </Button>
  );
}
