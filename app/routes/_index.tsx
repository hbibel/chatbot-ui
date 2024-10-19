import type { MetaFunction } from "@remix-run/node";

import HistoryButton from "@/components/history-button";
import { useApplicationState } from "@/state/state";

export const meta: MetaFunction = () => {
  return [
    { title: "Chat Bot" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  const historyVisible = useApplicationState(s => s.ui.historyVisible);

  return (
    <div className="flex flex-col mt-1">
      <div className="flex justify-between">
        <HistoryButton />
        {!historyVisible && "history is not visible"}
        {historyVisible && "history is visible"}
      </div>
    </div>
  );
}
