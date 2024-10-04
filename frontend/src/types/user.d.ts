import { AuthUserInfo } from "@web3auth/auth-adapter";

export type Web3AuthContextType = {
  user: Partial<AuthUserInfo> | undefined;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getUserInfo: () => Promise<void>;
  authenticateUser: () => Promise<UserAuthInfo | undefined>; // get token ID
};

// export type User = {};
