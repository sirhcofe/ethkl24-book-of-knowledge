import { motion } from "framer-motion";
import Image from "next/image";
import Card from "../Card";
import pepe from "@/../public/assets/pepe.png";

const Logo = ({ scale }: { scale: number }) => {
  return (
    <>
      <motion.div
        className="relative z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Image
          style={{ width: `${scale * 480}px`, height: `${scale * 480}px` }}
          src={pepe}
          alt="pepe-with-book"
        />
      </motion.div>
      <motion.div
        className="w-full"
        initial={{ y: 20 - scale * 36, opacity: 0 }}
        animate={{ y: 0 - scale * 36, opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <Card className="w-full py-3 sm:py-5 md:py-7 bg-saffron flex items-center justify-center">
          <p className="font-chewy text-[32px] sm:text-[40px] md:text-5xl text-black text-center">
            book of
            <br />
            knowledge
          </p>
        </Card>
      </motion.div>
    </>
  );
};

export default Logo;
