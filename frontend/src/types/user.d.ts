import { AuthUserInfo } from "@web3auth/auth-adapter";

export type Web3AuthContextType = {
  isLoading: boolean;
  user: Partial<AuthUserInfo> | undefined;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  authenticateUser: () => Promise<UserAuthInfo | undefined>; // get token ID
};

// export type User = {};
