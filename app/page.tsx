"use client";

import { MessagesContainer, InputBlock } from "@/app/_components";
import { MessagesProvider } from "@/app/context/MessagesContext";
import { UserContext } from "@/app/context/UserContext";

export default function Page() {
  return (
    <div className="min-h-screen bg-[url(/body_bg.png)]">
      <UserContext.Provider value={{ author: "Lizaveta" }}>
        <MessagesProvider>
          <MessagesContainer />
          <InputBlock />
        </MessagesProvider>
      </UserContext.Provider>
    </div>
  );
}
