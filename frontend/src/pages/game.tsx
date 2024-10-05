import HowToPlay from "@/components/game/HowToPlay";
import Questions from "@/components/game/Questions";
import LoadingAnimation from "@/components/LoadingAnimation";
import { Prompt } from "@/types/prompt";
import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function Game() {
  const [isInitial, setIsInitial] = useState(true);

  return (
    <div className="w-screen h-screen overflow-hidden items-center justify-center">
      <AnimatePresence>
        {isInitial ? (
          <HowToPlay setter={() => setIsInitial(false)} />
        ) : (
          <Questions />
        )}
      </AnimatePresence>
    </div>
  );
}
