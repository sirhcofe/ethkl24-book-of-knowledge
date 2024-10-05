import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/hooks";
import { poppins, chewy } from "./font";
import Card from "@/components/Card";
import Logo from "@/components/home/Logo";
import Contents from "@/components/home/Contents";

export default function Home() {
  const { user, login, logout, authenticateUser } = useAuth();

  const divRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    if (divRef && divRef.current) {
      const width = divRef.current.clientWidth * 0.5;
      const height = divRef.current.clientHeight * 0.5;
      const size = width < height ? width : height;
      setScale(size < 240 ? size / 480 : 0.5);
    }
  }, [divRef]);

  return (
    <div
      className={`${poppins.variable} ${chewy.variable} relative w-screen h-screen flex items-center justify-center bg-white`}
      ref={divRef}
    >
      {scale && (
        <div className="w-[85%] xs:w-[320px] sm:w-[360px] md:w-[420px] h-full flex flex-col items-center justify-center">
          <Logo scale={scale} />
          <Contents />
        </div>
      )}
    </div>
  );
}
