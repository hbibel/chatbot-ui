import History from "./History";
import Input from "./Input";

export default function Chat() {
  return (
    <>
      <div id="chat" className="flex flex-col w-full items-stretch p-8">
        <div className="grow">
          <History />
        </div>
        <div className="h-32">
          <Input />
        </div>
      </div>
    </>
  );
}
