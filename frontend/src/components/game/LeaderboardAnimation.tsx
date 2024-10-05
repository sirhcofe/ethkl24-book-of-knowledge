import { useAuth } from "@/hooks/hooks";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import JSConfetti from "js-confetti";

const dummyAddress = [
  "0X3NEBB...M1W",
  "0XY2S7H...8MJ",
  "0X5677I...JAX",
  "0XQ1XRE...UD9",
  "0XWV52N...FJ1",
  "0XF4C12...X84",
  "0XRI405...EUV",
  "0XWEQ5R...AAD",
  "0X50HEM...99X",
  "0X9RXSV...4MW",
  "0XAOOWQ...5IQ",
  "0XHQ6V3...9RJ",
  "0XZ6NFX...5JY",
  "0X27JY4...ECH",
  "0XB0NYO...DCI",
  "0X16K9F...OHR",
  "0XUQC4B...J3H",
  "0XL9MLM...2EB",
  "0XZPE8W...UGL",
  "0XXJEZS...YCJ",
  "0XK78D4...P34",
  "0XN5RT9...JMN",
  "0XDW82Q...7ZT",
  "0XFQ59S...XNL",
  "0XH7QE3...84T",
  "0XWS39B...YKD",
  "0XRYX6N...FA9",
  "0XOPW48...VNK",
  "0XS59MC...23W",
  "0XJW35V...MGQ",
  "0XZD10N...VXL",
  "0X82E0R...C5M",
  "0XNY843...PLB",
  "0XM57D2...XFZ",
  "0XUC91A...K78",
  "0X49QUR...1MF",
  "0XNM34K...B0J",
  "0XVQ52T...PSV",
  "0XGK98W...9LT",
  "0XTP67B...MHJ",
];
const LeaderboardAnimation = ({ win }: { win: boolean }) => {
  const leaderboardRef = useRef<HTMLDivElement | null>(null);
  const [boxWidth, setBoxWidth] = useState(0);
  const [bigBoxWidth, setBigBoxWidth] = useState(0);
  const { user } = useAuth();
  const [dummyAdd, setDummyAdd] = useState([]);

  const confetti = new JSConfetti();

  useEffect(() => {
    if (leaderboardRef && leaderboardRef.current) {
      setBoxWidth(Math.round(leaderboardRef.current.clientWidth * 0.9));
      setBigBoxWidth(leaderboardRef.current.clientWidth);
    }
  }, [leaderboardRef]);

  return (
    <div
      className="relative w-full h-[200px] overflow-hidden flex-flex-col mask-gradient"
      ref={leaderboardRef}
    >
      {boxWidth && (
        <>
          <motion.div
            className="absolute top-1/2 left-1/2"
            style={{ width: `${boxWidth}px` }}
            initial={{ x: "-50%", y: "-50%" }}
            animate={{ x: "-50%", y: `calc(${win ? "-180" : "-2052"}px)` }}
            transition={
              win
                ? { duration: 3, ease: "easeInOut" }
                : { duration: 2, ease: "easeInOut" }
            }
            onAnimationComplete={() => {
              win && confetti.addConfetti();
            }}
          >
            {dummyAddress.map((add: string, index: number) => {
              return (
                <motion.div
                  className={`h-[72px] w-full bg-white border-y border-black flex items-center pl-6 sm:pl-8 md:pl-10 text-xl font-semibold text-mnGreen ${
                    index === 20 && "mt-[72px]"
                  }`}
                  initial={{ x: 0, y: 0 }}
                  animate={
                    win
                      ? index == 2 && { x: 0, y: 72 }
                      : index >= 20 && index <= 27 && { x: 0, y: -72 }
                  }
                  transition={win ? { duration: 3 } : { duration: 2 }}
                >
                  {add}
                </motion.div>
              );
            })}
          </motion.div>
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-violet border-y border-black flex items-center pl-6 sm:pl-8 md:pl-10 text-2xl font-semibold text-white"
            style={{ width: boxWidth, height: 72 }}
            initial={{ width: boxWidth, height: 72 }}
            animate={{
              width: [boxWidth, bigBoxWidth, bigBoxWidth, boxWidth],
              height: [72, 82, 82, 72],
            }}
            transition={
              win
                ? { duration: 3, times: [0, 0.2, 0.8, 1] }
                : { duration: 2, times: [0, 0.2, 0.8, 1] }
            }
          >
            {user?.address?.slice(0, 7)}...{user?.address?.slice(-3)}
          </motion.div>
        </>
      )}
    </div>
  );
};

export default LeaderboardAnimation;
