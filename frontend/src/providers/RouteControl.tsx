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
};

export default RouteControl;
