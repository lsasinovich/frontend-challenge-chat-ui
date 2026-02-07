"use client";

import { MessagesContainer, SearchBlock } from "@/app/_components";
import { MessagesProvider } from "@/app/context/MessagesContext";
import { UserContext } from "@/app/context/UserContext";

export default function Page() {
  return (
    <div className="min-h-screen bg-[url(/body_bg.png)]">
      <UserContext.Provider value={{ author: "Lizaveta" }}>
        <MessagesProvider>
          <MessagesContainer />
          <SearchBlock />
        </MessagesProvider>
      </UserContext.Provider>
    </div>
  );
}
