import { useAuth } from "@/hooks/hooks";
import Card from "../Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCity,
  faMap,
  faNotesMedical,
} from "@fortawesome/free-solid-svg-icons";
import { useBalances } from "@/hooks/useBalances";
import { initialMint } from "@/utils/contractMethods";
import toast from "react-hot-toast";
import { useState } from "react";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";

const CoinInfo = () => {
  const { user, viemWalletClient, viemPublicClient } = useAuth();

  const {
    bokwEthBalance,
    bokwCpBalance,
    bokwEpiBalance,
    ethBalance,
    reFetchBalance,
    fetchEthBalance,
  } = useBalances();

  const handleClaimTokens = async () => {
    const toastId = toast.loading("Minting...");
    try {
      await initialMint(
        process.env.NEXT_PUBLIC_BOKWETH_CA as `0x${string}`,
        viemWalletClient!,
        viemPublicClient!
      );
      await initialMint(
        process.env.NEXT_PUBLIC_BOKWCP_CA as `0x${string}`,
        viemWalletClient!,
        viemPublicClient!
      );
      await initialMint(
        process.env.NEXT_PUBLIC_BOKWEPI_CA as `0x${string}`,
        viemWalletClient!,
        viemPublicClient!
      );
      toast.dismiss(toastId);
      toast.success("Minted initial tokens", { duration: 4000 });
      await reFetchBalance();
    } catch {
      toast.dismiss(toastId);
      toast.error("Failed to mint initial tokens", { duration: 4000 });
    }
  };

  const handleClaimGas = async () => {
    const toastId = toast.loading("Claiming...");
    const res = await fetch(`/api/claimGas?player=${user?.address}`, {
      method: "GET",
    });
    toast.dismiss(toastId);
    if (res.ok) toast.success("Claimed gas", { duration: 4000 });
    else toast.error("Failed to claimed gas", { duration: 4000 });
    await fetchEthBalance();
  };

  return (
    <div className="absolute z-20 top-0 left-0 w-screen p-2 sm:p-4 md:p-5 flex flex-col justify-end items-end gap-4">
      <Card className="py-2 px-2 sm:px-4 md:px-6 flex w-fit space-x-3 sm:space-x-4 md:space-x-5 border-saffron bg-white">
        <div className="flex items-center justify-center space-x-2 text-mnGreen">
          <FontAwesomeIcon icon={faMap} />
          <p className="font-poppins">0</p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-mnGreen">
          <FontAwesomeIcon icon={faNotesMedical} />
          <p className="font-poppins">{bokwEpiBalance}</p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-mnGreen">
          <FontAwesomeIcon icon={faEthereum} />
          <p className="font-poppins">{bokwEthBalance}</p>
        </div>
        <div className="flex items-center justify-center space-x-2 text-mnGreen">
          <FontAwesomeIcon icon={faCity} />
          <p className="font-poppins">{bokwCpBalance}</p>
        </div>
        {user && (
          <>
            <div className="w-[1px] h-full bg-mnGreen" />
            <div
              onClick={() => {
                navigator.clipboard.writeText(user.address as string);
              }}
              className="hover:cursor-pointer"
            >
              <p className="text-mnGreen">
                {user.address?.slice(0, 5)}...{user.address?.slice(-3) || ""}
              </p>
            </div>
          </>
        )}
      </Card>
      <div className="flex gap-2">
        <button className="py-1 px-2 rounded-full border border-black text-xs text-black">
          {ethBalance.toFixed(3)} ETH
        </button>
        <button
          className="py-1 px-2 rounded-full border border-black text-xs text-black"
          onClick={() => handleClaimTokens()}
        >
          Claim tokens
        </button>
        <button
          className="py-1 px-2 rounded-full border border-black text-xs text-black"
          onClick={() => handleClaimGas()}
        >
          Claim gas
        </button>
      </div>
    </div>
  );
};

export default CoinInfo;
