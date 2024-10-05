import LoadingAnimation from "@/components/LoadingAnimation";
import { useAuth } from "@/hooks/hooks";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const RouteControl = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [checkOK, setCheckOK] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!user && pathname === "/game") router.replace("/");
      setCheckOK(true);
    }
  }, [user, isLoading]);

  if (checkOK) return <>{children}</>;
  else
    return (
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <LoadingAnimation size="lg" />
      </div>
    );
};

export default RouteControl;
