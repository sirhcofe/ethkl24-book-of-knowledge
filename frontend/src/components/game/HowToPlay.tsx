import { motion } from "framer-motion";
import Card from "../Card";

const HowToPlay = ({ setter }: { setter: () => void }) => {
  return (
    <motion.div
      key="how-to-play"
      className="w-full h-full flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Card className="w-[600px] max-w-[90%] py-4 px-4 sm:px-7 md:px-10 bg-saffron flex flex-col items-center space-y-4">
        <p className="font-chewy text-black text-2xl sm:text-3xl md:text-4xl">
          How To Play
        </p>
        <p className="text-black">
          You will be given{" "}
          <span className="font-bold">5 multiple choice questions</span>. You
          have <span className="font-bold">13 seconds</span> to answer them.
          Answer them correctly within the time limit to earn points!
        </p>
        <Card
          className="w-fit mt-5 py-2 px-4 cursor-pointer bg-mnGreen"
          onClick={setter}
        >
          <p className="font-chewy text-2xl sm:text-3xl md:text-4xl text-white text-center">
            Understood
          </p>
        </Card>
      </Card>
    </motion.div>
  );
};

export default HowToPlay;
