import { PublicClient, WalletClient } from "viem";
import BOKWGeoABI from "../abis/BOKWGeoABI.json";
import { FUNCTION_NAME } from "./constant";
import { mantaSepoliaTestnet } from "viem/chains";

export const executePlayGame = async (
  walletClient: WalletClient,
  publicClient: PublicClient
) => {
  const ca = process.env.NEXT_PUBLIC_BOKWGEO_CA;
  const address = (await walletClient.getAddresses())[0];

  const hash = await walletClient.writeContract({
    chain: mantaSepoliaTestnet,
    account: address,
    address: ca as `0x${string}`,
    abi: JSON.parse(JSON.stringify(BOKWGeoABI)),
    functionName: FUNCTION_NAME.playGame,
    args: [],
  });

  console.log("PlayGame hash", hash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log("PlayGame Receipt", receipt);
};

export const generateQuestion = async (
  walletClient: WalletClient,
  publicClient: PublicClient,
  gameIdx: number,
  prompt: string
) => {
  const ca = process.env.NEXT_PUBLIC_BOKWGEO_CA;
  const address = (await walletClient.getAddresses())[0];

  const hash = await walletClient.writeContract({
    chain: mantaSepoliaTestnet,
    account: address,
    address: ca as `0x${string}`,
    abi: JSON.parse(JSON.stringify(BOKWGeoABI)),
    functionName: FUNCTION_NAME.generateQuestion,
    args: [gameIdx, prompt],
  });

  console.log("GenerateQuestion hash", hash);

  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log("GenerateQuestion receipt", receipt);
};
