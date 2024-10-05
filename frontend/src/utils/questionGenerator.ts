import { PublicClient, WalletClient } from "viem";
import { generateQuestion } from "./contractMethods";
import { getPromptResult, getPromptUpdated } from "@/graphql/getPrompt";
import { parsePrompt } from "./parsePrompt";

const questions: { [key: string]: string } = {
  geography:
    "give me one 4 choices MCQ question on the subject geography with answer.",
};

const contractAddresses: { [key: string]: string } = {
  geography: process.env.NEXT_PUBLIC_BOKWGEO_CA as string,
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const questionGenerate = async (
  viemWalletClient: WalletClient,
  viemPublicClient: PublicClient,
  gameIndex: number,
  subject: string,
  historyQuestions: string[]
) => {
  let promptRequest = undefined;
  let output = undefined;
  let subjectQuestions = "";

  if (historyQuestions.length > 0) {
    const newHistoryQuestions = historyQuestions.map((v) => `'${v}'`);
    subjectQuestions =
      questions[subject] +
      "Don't ask these questions " +
      newHistoryQuestions.join(" and ") +
      ". Generate a new single question";
  } else {
    subjectQuestions = questions[subject];
  }

  console.log("subjectQuestions", subjectQuestions);

  const genQuestionHash = await generateQuestion(
    process.env.NEXT_PUBLIC_BOKWGEO_CA as `0x${string}`,
    viemWalletClient!,
    viemPublicClient!,
    gameIndex,
    subjectQuestions
  );
  while (!promptRequest) {
    console.log("genQuestionHash", genQuestionHash);
    promptRequest = await getPromptResult(genQuestionHash);
    console.log("promptRequest", promptRequest);

    await delay(2500);
  }
  while (!output) {
    console.log(
      `getPromptUpdated(${promptRequest.requestId}, ${contractAddresses[subject]})`
    );
    const promtRes = await getPromptUpdated(
      promptRequest.requestId,
      contractAddresses[subject]
    );
    if (promtRes) output = promtRes.output;

    await delay(2500);
  }

  const promptInfo = parsePrompt(output);
  return promptInfo;
};
