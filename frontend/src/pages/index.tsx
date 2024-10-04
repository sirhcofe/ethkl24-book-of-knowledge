import { useAuth } from "@/hooks/hooks";

export default function Home() {
  const { user, login, logout, getUserInfo, authenticateUser } = useAuth();

  return (
    <div className="w-screen h-screen bg-white flex flex-col items-center justify-center">
      <button
        className="px-10 py-2 rounded-full border border-black text-black"
        onClick={login}
      >
        Login!
      </button>
    </div>
  );
}
