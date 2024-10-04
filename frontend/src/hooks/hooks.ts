import { Web3AuthContext } from "@/providers/AuthProvider";
import { Web3AuthContextType } from "@/types/user";
import { useContext } from "react";

export const useAuth = () => {
  const { user, login, logout, getUserInfo, authenticateUser } = useContext(
    Web3AuthContext
  ) as Web3AuthContextType;

  return {
    user,
    login,
    logout,
    getUserInfo,
    authenticateUser,
  };
};
