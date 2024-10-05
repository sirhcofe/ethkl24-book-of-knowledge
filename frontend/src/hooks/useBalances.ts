import { PublicClient, WalletClient } from "viem";
import { FUNCTION_NAME } from "@/utils/constant";
import { useContext, useEffect, useState } from "react";
import { getBalanceOf } from "@/utils/contractMethods";
import { Web3AuthContext } from "@/providers/AuthProvider";
import { Web3AuthContextType } from "@/types/user";

export const useBalances = () => {
  const { viemPublicClient, viemWalletClient } = useContext(
    Web3AuthContext
  ) as Web3AuthContextType;

  const [bokwGeoBalance, setBokwGeoBalance] = useState(0);

  useEffect(() => {
    if (!viemPublicClient || !viemWalletClient) return;
    const loadBalance = async () => {
      const bokwGeoBalance = await getBalanceOf(
        process.env.NEXT_PUBLIC_BOKWGEO_CA as `0x${string}`,
        viemWalletClient,
        viemPublicClient
      );
      setBokwGeoBalance(bokwGeoBalance);
    };
    loadBalance();
  }, [viemPublicClient, viemWalletClient]);

  return { bokwGeoBalance };
};
