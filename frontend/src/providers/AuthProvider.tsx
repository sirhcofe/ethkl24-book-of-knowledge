import { Web3AuthContextType } from "@/types/user";
import { AuthAdapter, AuthUserInfo } from "@web3auth/auth-adapter";
import {
  CHAIN_NAMESPACES,
  IProvider,
  UX_MODE,
  WALLET_ADAPTERS,
  WEB3AUTH_NETWORK,
} from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import RPC from "@/utils/ethersRPC";
import { ethers } from "ethers";
import {
  createSmartAccountClient,
  BiconomySmartAccountV2,
  IPaymaster,
  createPaymaster,
} from "@biconomy/account";

// const biconomyConfig = {
//   biconomyPaymasterApiKey: import.meta.env.VITE_BICONOMY_PAYMASTER_API_KEY,
//   bundleUrl: `https://bundler.biconomy.io/api/v2/84532/nJPK7B3ru.dd7f7861-190d-41bd-af80-6877f74b8f44`,
// };

export const Web3AuthContext = createContext<Web3AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [web3Auth, setWeb3Auth] = useState<Web3AuthNoModal | null>(null);
  const [web3AuthProvider, setWeb3AuthProvider] = useState<IProvider | null>(
    null
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Partial<AuthUserInfo>>();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      try {
        const chainConfig = {
          chainNamespace: CHAIN_NAMESPACES.EIP155,
          chainId: "0x34816E", // hex of 3441006, Manta Pacific Sepolia Testnet
          rpcTarget: "https://pacific-rpc.sepolia-testnet.manta.network/http",
          displayName: "Manta Pacific Sepolia Testnet",
          blockExplorerUrl:
            "https://pacific-explorer.sepolia-testnet.manta.network",
          ticker: "ETH",
          tickerName: "ETH",
          logo: "https://cryptologos.cc/logos/ethereum-eth-logo.png",
        };

        const privateKeyProvider = new EthereumPrivateKeyProvider({
          config: { chainConfig },
        });

        const web3AuthInstance = new Web3AuthNoModal({
          clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "",
          web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
          privateKeyProvider,
        });

        const web3AuthAdapter = new AuthAdapter({
          loginSettings: {
            mfaLevel: "optional",
          },
          adapterSettings: {
            uxMode: UX_MODE.REDIRECT,
            loginConfig: {
              jwt: {
                verifier: "world-id-verifier",
                typeOfLogin: "jwt",
                clientId: process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID,
              },
            },
            mfaSettings: {
              deviceShareFactor: {
                enable: true,
                priority: 1,
                mandatory: true,
              },
              backUpShareFactor: {
                enable: true,
                priority: 2,
                mandatory: false,
              },
              socialBackupFactor: {
                enable: true,
                priority: 3,
                mandatory: false,
              },
              passwordFactor: {
                enable: true,
                priority: 4,
                mandatory: true,
              },
            },
          },
        });
        web3AuthInstance.configureAdapter(web3AuthAdapter);
        setWeb3Auth(web3AuthInstance);

        await web3AuthInstance.init();
        setWeb3AuthProvider(web3AuthInstance.provider);
      } catch (error) {
        console.error("web3auth init failed", error);
      }
    };
    init();
  }, []);

  useEffect(() => {
    if (web3Auth && web3Auth.connected && web3AuthProvider && !isLoggedIn) {
      postLoginFlow(web3AuthProvider);
    }
  }, [web3Auth, web3AuthProvider, isLoggedIn]);

  const login = async () => {
    if (web3Auth) {
      const web3AuthProvider = await web3Auth.connectTo(WALLET_ADAPTERS.AUTH, {
        loginProvider: "jwt",
        extraLoginOptions: {
          domain: process.env.NEXT_PUBLIC_AUTH0_DOMAIN,
          verifierIdField: "sub",
          connection: "worldcoin",
        },
      });
      setWeb3AuthProvider(web3AuthProvider);
      postLoginFlow(web3AuthProvider);
    } else {
      toast.error("Web3Auth not initialized yet!");
      throw new Error("Web3Auth not initialized yet!");
    }
  };

  const authenticateUser = async () => {
    if (web3Auth) {
      const idToken = await web3Auth.authenticateUser();
      console.debug("User successfully verified!", idToken);
      return idToken;
    } else {
      toast.error("Web3Auth not initialized yet!");
      return;
    }
  };

  const getUserInfo = async () => {
    if (web3Auth) {
      const user = await web3Auth.getUserInfo();
      console.debug("Get user successful!", user);
      return user;
    } else {
      console.debug("Web3Auth not initialized yet!");
      return;
    }
  };

  const postLoginFlow = async (provider: IProvider | null) => {
    if (!web3Auth?.connected || !provider) {
      console.log(web3Auth, provider);
      toast.error("Login failed!");
      return;
    }
    const user = await getUserInfo();
    console.log(user);
    setUser(user);
    setIsLoading(false);
    const address = await RPC.getAccounts(provider);
    // Ethers and paymaster setup
    const ethersProvider = new ethers.providers.Web3Provider(provider);
    const paymaster: IPaymaster = await createPaymaster({
      paymasterUrl: `https://paymaster.biconomy.io/api/v1/3441005/${process.env.NEXT_PUBLIC_PAYMASTER_API}`,
    });

    // Create smart account
    // const smartWallet = await createSmartAccountClient({
    //   signer: ethersProvider.getSigner(),
    //   biconomyPaymasterApiKey: process.env.NEXT_PUBLIC_PAYMASTER_API || "",
    //   bundleUrl: biconomy,
    // });
  };

  const logout = async () => {
    if (web3Auth) {
      await web3Auth.logout();
      setIsLoggedIn(false);
      setWeb3AuthProvider(null);
      setUser(undefined);
    } else {
      toast.error("Web3Auth not initialized yet!");
      return;
    }
  };

  return (
    <Web3AuthContext.Provider
      value={{
        isLoading,
        user,
        login,
        logout,
        authenticateUser,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};
