"use client";

import useScroll from "@/hooks/use-scroll";
import { ArrowUp } from "lucide-react";

export default function MainWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isScrolled } = useScroll();

  return (
    <main>
      <div className="">{children}</div>

      {isScrolled && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-[999] grid h-14 w-14 place-items-center rounded-full bg-secondary text-black"
        >
          <ArrowUp className="w-6 h-6" />
        </button>
      )}
    </main>
  );
}
