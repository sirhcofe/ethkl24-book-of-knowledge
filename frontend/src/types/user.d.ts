import { AuthUserInfo } from "@web3auth/auth-adapter";
import { PublicClient, WalletClient } from "viem";

export type Web3AuthContextType = {
  isLoading: boolean;
  user: Partial<AuthUserInfo> | undefined;
  viemPublicClient?: PublicClient;
  viemWalletClient?: WalletClient;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  authenticateUser: () => Promise<UserAuthInfo | undefined>; // get token ID
};

// export type User = {};
