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

export const Web3AuthContext = createContext<Web3AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [web3Auth, setWeb3Auth] = useState<Web3AuthNoModal | null>(null);
  const [web3AuthProvider, setWeb3AuthProvider] = useState<IProvider | null>(
    null
  );

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<Partial<AuthUserInfo>>();

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
        if (web3AuthInstance.connected) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("web3auth init failed", error);
      }
    };
    init();
  }, []);

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
      setUser(user);
    } else {
      toast.error("Web3Auth not initialized yet!");
      return;
    }
  };

  const logout = async () => {
    if (web3Auth) {
      await web3Auth.logout();
      setIsLoggedIn(false);
      setWeb3AuthProvider(null);
    } else {
      toast.error("Web3Auth not initialized yet!");
      return;
    }
  };

  return (
    <Web3AuthContext.Provider
      value={{
        user,
        login,
        logout,
        getUserInfo,
        authenticateUser,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
};
