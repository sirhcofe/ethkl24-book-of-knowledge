import type { NextApiRequest, NextApiResponse } from "next";
import {
  createPublicClient,
  createWalletClient,
  http,
  parseUnits,
  publicActions,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { mantaSepoliaTestnet } from "viem/chains";

interface TypedNextApiRequest extends NextApiRequest {
  query: {
    player: string;
  };
}

const account = privateKeyToAccount(`0x${process.env.OWNER_PRIVATE_KEY_2}`);

const walletClient = createWalletClient({
  account,
  chain: mantaSepoliaTestnet,
  transport: http(),
}).extend(publicActions);

export default async function handler(
  req: TypedNextApiRequest,
  res: NextApiResponse
) {
  const { player } = req.query;

  // @ts-ignore
  const hash = await walletClient.sendTransaction({
    to: player as `0x${string}`,
    value: parseUnits("0.08", 18),
  });

  console.log("claimGas hash", hash);

  const receipt = await walletClient.waitForTransactionReceipt({ hash });
  console.log("claimGas receipt", receipt);

  res.status(200).json({ hash });
}
