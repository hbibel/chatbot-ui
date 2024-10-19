import type { MetaFunction } from "@remix-run/node";

import HistoryButton from "@/components/history-button";

export const meta: MetaFunction = () => {
  return [
    { title: "Chat Bot" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div className="flex flex-col mt-1">
      <div className="flex justify-between">
        <HistoryButton />
      </div>
    </div>
  );
}
