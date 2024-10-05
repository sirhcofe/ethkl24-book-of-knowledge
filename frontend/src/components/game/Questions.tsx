import { Prompt } from "@/types/prompt";
import { useEffect, useState } from "react";
import LoadingAnimation from "../LoadingAnimation";
import { motion, useAnimation } from "framer-motion";
import Card from "../Card";
import * as Progress from "@radix-ui/react-progress";
import { useSearchParams } from "next/navigation";
import {
  getPlayGameResult,
  getPromptResult,
  getPromptUpdated,
} from "@/graphql/getPrompt";
import { generateQuestion } from "@/utils/contractMethods";
import { useAuth } from "@/hooks/hooks";
import { parsePrompt } from "@/utils/parsePrompt";
import { questionGenerate } from "@/utils/questionGenerator";

const mockQuestion = {
  question: "why are you gae",
  choices: {
    a: "skibidi toilet",
    b: "rizz",
    c: "HELP ME",
    d: "amboutokum",
  },
  answer: "a",
} as Prompt;

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Questions = () => {
  const controls = useAnimation();
  const { viemPublicClient, viemWalletClient } = useAuth();
  const [promptObj, setPromptObj] = useState<Prompt | undefined>(undefined);
  const [questionNum, setQuestionNum] = useState(1);
  const [selectedAns, setSelectedAns] = useState("");
  const [result, setResult] = useState<boolean | null>(null);
  const [currentGameIndex, setCurrentGameIndex] = useState<number>();
  const [nextPromptObj, setNextPromptObj] = useState<Prompt | undefined>(
    undefined
  );

  const txHash = useSearchParams().get("hash");
  const subject = useSearchParams().get("subject");

  const questions: { [key: string]: string } = {
    geography:
      "give me one 4 choices MCQ question on the subject geography with answer.",
  };

  const contractAddresses: { [key: string]: string } = {
    geography: process.env.NEXT_PUBLIC_BOKWGEO_CA as string,
  };

  /**
   * TODO: REMOVE ONCE WE CAN GET PROMPT DATA FROM SC
   */

  useEffect(() => {
    if (!txHash || !subject) return;

    const initGame = async () => {
      let output: string = "";
      let playGameRes = undefined;
      let promptRequest = undefined;
      while (!playGameRes) {
        playGameRes = await getPlayGameResult(txHash);
        console.log("playGameRes", playGameRes);

        await delay(1000);
      }
      setCurrentGameIndex(playGameRes.gameIndex);
      // const genQuestionHash = await generateQuestion(
      //   viemWalletClient!,
      //   viemPublicClient!,
      //   playGameRes.gameIndex,
      //   questions[subject]
      // );
      // while (!promptRequest) {
      //   console.log("genQuestionHash", genQuestionHash);
      //   promptRequest = await getPromptResult(genQuestionHash);
      //   console.log("promptRequest", promptRequest);

      //   await delay(1000);
      // }
      // while (!output) {
      //   console.log(
      //     `getPromptUpdated(${promptRequest.requestId}, ${contractAddresses[subject]})`
      //   );
      //   const promtRes = await getPromptUpdated(
      //     promptRequest.requestId,
      //     contractAddresses[subject]
      //   );
      //   if (promtRes) output = promtRes.output;

      //   await delay(1000);
      // }

      const promptInfo = await questionGenerate(
        viemWalletClient!,
        viemPublicClient!,
        playGameRes.gameIndex,
        subject
      );
      setPromptObj(promptInfo);
    };

    initGame();

    // setTimeout(() => {
    //   setPromptObj(mockQuestion);
    // }, 1000);
  }, [txHash, subject]);

  useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      const message =
        "Are you sure you want to leave? You will lose your progress!";
      event.returnValue = message;
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    if (!txHash || !subject) return;
    if (promptObj === undefined) return;
    controls.start({ width: "0%" });
    if (questionNum >= 3) return;
    const initNextPrompt = async () => {
      const promptInfo = await questionGenerate(
        viemWalletClient!,
        viemPublicClient!,
        currentGameIndex as number,
        subject
      );
      setNextPromptObj(promptInfo);
    };
    initNextPrompt();
  }, [promptObj]);

  const handleClick = (click: string) => {
    if (result !== null) return;
    controls.stop();
    setSelectedAns(click);
    console.log(`${click} === ${promptObj?.answer.toLowerCase()}`);
    if (click.toLowerCase() === promptObj?.answer.toLowerCase()) {
      setResult(true);
    } else {
      setResult(false);
    }
  };

  useEffect(() => {
    if (result !== null) {
      setTimeout(() => {
        setPromptObj(undefined);
        setQuestionNum(questionNum + 1);
        setSelectedAns("");
        setResult(null);
        // Call SC here to get next question?
      }, 4000);
    }
  }, [result]);

  return (
    <>
      {promptObj ? (
        <motion.div
          key="question"
          className="w-screen h-screen flex flex-col space-y-7 items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="w-[660px] h-fit flex flex-col rounded-full p-[2px]">
            <div className="w-full bg-background rounded-full p-1">
              <Progress.Root className="relative w-full h-2 rounded-full bg-[#3f414e] overflow-hidden">
                <motion.div
                  initial={{ width: "100%" }}
                  animate={controls}
                  transition={{ duration: 13, ease: "linear" }}
                  className="h-full rounded-full bg-gradient-to-r from-[#DB504A] to-[#E3B505] overflow-hidden"
                  onAnimationComplete={() => setResult(false)}
                />
              </Progress.Root>
            </div>
          </div>
          <Card
            className={`w-[660px] max-w-[90%] py-4 px-4 sm:px-7 md:px-10 ${
              result !== null
                ? result
                  ? "bg-mnGreen"
                  : "bg-jasper"
                : "bg-saffron"
            } flex flex-col space-y-3`}
          >
            <p className="font-chewy text-base sm:text-lg md:text-xl text-black text-center">
              Question {questionNum}
            </p>
            <p className="font-chewy text-lg sm:text-xl md:text-2xl text-black text-center">
              {result !== null
                ? result
                  ? "Correct!"
                  : `Answer: ${promptObj.choices[promptObj.answer]}`
                : promptObj.question}
            </p>
          </Card>
          <div className="relative w-[660px] max-w-[90%] flex space-x-3">
            <Card
              className={`flex-1 py-2 ${
                selectedAns === "a" ? "bg-saffron" : "bg-white"
              }`}
              onClick={() => handleClick("a")}
            >
              <p
                className={`font-chewy text-lg sm:text-xl md:text-2xl ${
                  selectedAns === "a" ? "bg-saffron text-black" : "text-mnGreen"
                } text-center`}
              >
                {promptObj.choices.a}
              </p>
            </Card>
            <Card
              className={`flex-1 py-2 ${
                selectedAns === "b" ? "bg-saffron" : "bg-white"
              }`}
              onClick={() => handleClick("b")}
            >
              <p
                className={`font-chewy text-lg sm:text-xl md:text-2xl ${
                  selectedAns === "b" ? "bg-saffron text-black" : "text-mnGreen"
                } text-center`}
              >
                {promptObj.choices.b}
              </p>
            </Card>
          </div>
          <div className="relative w-[660px] max-w-[90%] flex space-x-3">
            <Card
              className={`flex-1 py-2 ${
                selectedAns === "c" ? "bg-saffron" : "bg-white"
              }`}
              onClick={() => handleClick("c")}
            >
              <p
                className={`font-chewy text-lg sm:text-xl md:text-2xl ${
                  selectedAns === "c" ? "bg-saffron text-black" : "text-mnGreen"
                } text-center`}
              >
                {promptObj.choices.c}
              </p>
            </Card>
            <Card
              className={`flex-1 py-2 ${
                selectedAns === "d" ? "bg-saffron" : "bg-white"
              }`}
              onClick={() => handleClick("d")}
            >
              <p
                className={`font-chewy text-lg sm:text-xl md:text-2xl ${
                  selectedAns === "d" ? "text-black" : "text-mnGreen"
                } text-center`}
              >
                {promptObj.choices.d}
              </p>
            </Card>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="loading"
          className="w-screen h-screen flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoadingAnimation size="lg" />
        </motion.div>
      )}
    </>
  );
};

export default Questions;
