import { formatUnits, parseUnits, PublicClient, WalletClient } from "viem";
import { FUNCTION_NAME } from "@/utils/constant";
import { useContext, useEffect, useState } from "react";
import { getBalanceOf } from "@/utils/contractMethods";
import { Web3AuthContext } from "@/providers/AuthProvider";
import { Web3AuthContextType } from "@/types/user";

export const useBalances = () => {
  const { viemPublicClient, viemWalletClient, user } = useContext(
    Web3AuthContext
  ) as Web3AuthContextType;

  const [bokwEthBalance, setBokwEthBlanace] = useState(0);
  const [bokwEpiBalance, setBokwEpiBalance] = useState(0);
  const [bokwCpBalance, setBokwCpBalance] = useState(0);
  const [ethBalance, setEthBalance] = useState(0);

  useEffect(() => {
    if (!viemPublicClient || !viemWalletClient || !user) return;
    const loadBalance = async () => {
      const bokwEthBalance = await getBalanceOf(
        process.env.NEXT_PUBLIC_BOKWETH_CA as `0x${string}`,
        viemWalletClient,
        viemPublicClient
      );
      const bokwEpiBalance = await getBalanceOf(
        process.env.NEXT_PUBLIC_BOKWEPI_CA as `0x${string}`,
        viemWalletClient,
        viemPublicClient
      );
      const bokwCpBalance = await getBalanceOf(
        process.env.NEXT_PUBLIC_BOKWCP_CA as `0x${string}`,
        viemWalletClient,
        viemPublicClient
      );
      const bal = await viemPublicClient.getBalance({
        address: user.address as `0x${string}`,
      });

      setEthBalance(Number(formatUnits(bal, 18)));
      setBokwEthBlanace(bokwEthBalance);
      setBokwEpiBalance(bokwEpiBalance);
      setBokwCpBalance(bokwCpBalance);
    };
    loadBalance();
  }, [viemPublicClient, viemWalletClient, user]);

  const fetchEthBalance = async () => {
    if (!viemPublicClient || !user) return;
    const bal = await viemPublicClient.getBalance({
      address: user.address as `0x${string}`,
    });
    setEthBalance(Number(formatUnits(bal, 18)));
  };

  const reFetchBalance = async () => {
    const bokwEthBalance = await getBalanceOf(
      process.env.NEXT_PUBLIC_BOKWETH_CA as `0x${string}`,
      viemWalletClient!,
      viemPublicClient!
    );
    const bokwEpiBalance = await getBalanceOf(
      process.env.NEXT_PUBLIC_BOKWEPI_CA as `0x${string}`,
      viemWalletClient!,
      viemPublicClient!
    );
    const bokwCpBalance = await getBalanceOf(
      process.env.NEXT_PUBLIC_BOKWCP_CA as `0x${string}`,
      viemWalletClient!,
      viemPublicClient!
    );
    setBokwEthBlanace(bokwEthBalance);
    setBokwEpiBalance(bokwEpiBalance);
    setBokwCpBalance(bokwCpBalance);
  };

  return {
    bokwEthBalance,
    bokwCpBalance,
    bokwEpiBalance,
    reFetchBalance,
    fetchEthBalance,
    ethBalance,
  };
};
