import { motion } from "framer-motion";
import Card from "../Card";
import { useRouter } from "next/navigation";

const PostGame = () => {
  const router = useRouter();

  return (
    <motion.div
      key="post-game"
      className="w-full h-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card className="w-[600px] max-w-[90%] py-4 px-4 sm:px-7 md:px-10 bg-saffron flex flex-col items-center space-y-4">
        <p className="font-chewy text-black text-2xl sm:text-3xl md:text-4xl">
          Game Finished!
        </p>
        <p className="text-black"></p>
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
