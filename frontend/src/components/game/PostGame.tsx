import { motion } from "framer-motion";
import Card from "../Card";
import { useRouter, useSearchParams } from "next/navigation";
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import {
  faMap,
  faNotesMedical,
  faCity,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import LeaderboardAnimation from "./LeaderboardAnimation";
import Image from "next/image";
import pepe from "@/../public/assets/pepe.png";

const PostGame = () => {
  const subject = useSearchParams().get("subject");
  const router = useRouter();

  return (
    <motion.div
      key="post-game"
      className="w-full h-full flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Image
        className="relative z-10"
        style={{ width: `${240}px`, height: `${240}px` }}
        src={pepe}
        alt="pepe-with-book"
      />
      <Card className="w-[560px] max-w-[90%] py-4 px-4 sm:px-8 md:px-12 bg-saffron flex flex-col items-center space-y-5 -mt-[15px]">
        <p className="font-chewy text-black text-2xl sm:text-3xl md:text-4xl">
          Book of Knowledge
        </p>
        <div className="flex items-center justify-center">
          <p className="text-black pt-1 text-xl">
            You earned <span className="font-bold">60 coins!</span>
          </p>
          {subject === "geography" && (
            <FontAwesomeIcon icon={faMap} size="2x" />
          )}
          {subject === "epidemiology" && (
            <FontAwesomeIcon icon={faNotesMedical} size="2x" />
          )}
          {subject === "ethereum" && (
            <FontAwesomeIcon icon={faEthereum} size="2x" />
          )}
          {subject === "city-planning" && (
            <FontAwesomeIcon icon={faCity} size="2x" />
          )}
        </div>
        <LeaderboardAnimation win={false} />
        <Card
          className="w-fit mt-5 py-2 px-4 cursor-pointer bg-mnGreen"
          onClick={() => router.replace("/")}
        >
          <p className="font-chewy text-2xl sm:text-3xl md:text-4xl text-white text-center">
            Back to Home
          </p>
        </Card>
      </Card>
    </motion.div>
  );
};

export default PostGame;
