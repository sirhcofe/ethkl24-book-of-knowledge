// import {
//   Account,
//   Chain,
//   formatUnits,
//   getContract,
//   type GetContractReturnType,
//   PublicClient,
//   Transport,
//   WalletClient,
// } from "viem";
// import { BOKWGeoABI } from "@/abis/BOKWGeoABI";
// import { FUNCTION_NAME } from "./constant";
// import { mantaSepoliaTestnet } from "viem/chains";

// export const instantiateContract = (
//   ca: `0x${string}`,
//   publicClient: PublicClient,
//   walletClient: WalletClient<Transport, Chain>
// ) => {
//   const contract = getContract({
//     address: ca,
//     abi: BOKWGeoABI,
//     client: {
//       public: publicClient,
//       wallet: walletClient,
//     },
//   });
//   return contract;
// };

// export const executePlayGame = async (
//   contractInstance: ReturnType<typeof instantiateContract>,
//   publicClient: PublicClient
// ) => {
//   const hash = await contractInstance.write.playGame([] as never);
//   console.log("PlayGame hash", hash);

//   const receipt = await publicClient.waitForTransactionReceipt({ hash });
//   console.log("PlayGame Receipt", receipt);
// };

// export const executeGenerateQuestion = async (
//   contractInstance: ReturnType<typeof instantiateContract>,
//   publicClient: PublicClient,
//   gameIdx: number,
//   prompt: string
// ) => {
//   const hash = await contractInstance.write.generateQuestion([
//     BigInt(gameIdx),
//     prompt,
//   ]);
//   console.log("GenerateQuestion hash", hash);

//   const receipt = await publicClient.waitForTransactionReceipt({ hash });
//   console.log("GenerateQuestion receipt", receipt);
// };

// export const getBalanceOf = async (
//   contractInstance: ReturnType<typeof instantiateContract>,
//   publicClient: PublicClient,
//   walletClient: WalletClient
// ) => {
//   const addr = (await walletClient.getAddresses())[0];
//   const balance = await contractInstance.read.balanceOf([addr]);
//   return Number(formatUnits(balance, 18));
// };

import {
  formatUnits,
  getContract,
  GetContractReturnType,
  PublicClient,
  WalletClient,
} from "viem";
import { BOKWGeoABI } from "@/abis/BOKWGeoABI";
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
    abi: BOKWGeoABI,
    functionName: "playGame",
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

export const getBalanceOf = async (
  ca: `0x${string}`,
  walletClient: WalletClient,
  publicClient: PublicClient
) => {
  const address = (await walletClient.getAddresses())[0];
  const balance = await publicClient.readContract({
    address: ca,
    abi: BOKWGeoABI,
    functionName: "balanceOf",
    args: [address],
  });
  return Number(formatUnits(balance, 18));
};
