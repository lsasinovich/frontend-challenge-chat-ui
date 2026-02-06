import { MessagesContainer, SearchBlock } from "@/app/_components";

export default function Page() {
  return (
    <div className="min-h-screen bg-[url(/body_bg.png)]">
      <MessagesContainer />
      <SearchBlock />
    </div>
  );
}
