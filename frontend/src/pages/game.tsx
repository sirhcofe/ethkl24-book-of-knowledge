import HowToPlay from "@/components/game/HowToPlay";
import PostGame from "@/components/game/PostGame";
import Questions from "@/components/game/Questions";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

export default function Game() {
  const [isInitial, setIsInitial] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const [coinsEarned, setCoinsEarned] = useState(0);

  return (
    <div className="w-screen h-screen overflow-hidden items-center justify-center">
      <AnimatePresence>
        {isInitial ? (
          <HowToPlay setter={() => setIsInitial(false)} />
        ) : (
          <Questions
            setIsEnd={() => setIsEnd(true)}
            coinsEarned={coinsEarned}
            setCoinsEarned={setCoinsEarned}
          />
        )}
        {isEnd && <PostGame coinsEarned={coinsEarned} />}
      </AnimatePresence>
    </div>
  );
}
