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
  subject: string
) => {
  let promptRequest = undefined;
  let output = undefined;
  const genQuestionHash = await generateQuestion(
    viemWalletClient!,
    viemPublicClient!,
    gameIndex,
    questions[subject]
  );
  while (!promptRequest) {
    console.log("genQuestionHash", genQuestionHash);
    promptRequest = await getPromptResult(genQuestionHash);
    console.log("promptRequest", promptRequest);

    await delay(1000);
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

    await delay(1000);
  }

  const promptInfo = parsePrompt(output);
  return promptInfo;
};
