import type { NextApiRequest, NextApiResponse } from "next";
import {
  createPublicClient,
  createWalletClient,
  http,
  publicActions,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mantaSepoliaTestnet } from "viem/chains";
import BOKWGeoABI from "../../abis/BOKWGeoABI.json";
import { FUNCTION_NAME } from "@/utils/constant";

interface TypedNextApiRequest extends NextApiRequest {
  query: {
    player: string;
    gameIdx: string;
    reward: string;
  };
}

const account = privateKeyToAccount(`0x${process.env.OWNER_PRIVATE_KEY}`);

const walletClient = createWalletClient({
  account,
  chain: mantaSepoliaTestnet,
  transport: http(),
}).extend(publicActions);

export default async function handler(
  req: TypedNextApiRequest,
  res: NextApiResponse
) {
  const { player, gameIdx, reward } = req.query;

  const { request } = await walletClient.simulateContract({
    account,
    address: process.env.NEXT_PUBLIC_BOKWGEO_CA as `0x${string}`,
    abi: JSON.parse(JSON.stringify(BOKWGeoABI)),
    functionName: FUNCTION_NAME.finishGame,
    args: [],
  });
  console.log("FinishGame request", request);

  const hash = await walletClient.writeContract(request);
  console.log("FinishGame hash", hash);

  const receipt = await walletClient.waitForTransactionReceipt({ hash });
  console.log("FinishGame receipt", receipt);

  res.status(200).json({ hash });
}
