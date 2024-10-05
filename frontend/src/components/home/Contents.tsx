import { useAuth } from "@/hooks/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../Card";
import {
  faMap,
  faRightFromBracket,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const containerVariant = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const childVariant = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
  },
};

const Contents = () => {
  const { isLoading, user, login, logout } = useAuth();
  const router = useRouter();
  const [showSubject, setShowSubject] = useState(false);
  const [selectedModal, setSelectedModal] = useState("");

  const handleLogout = () => {
    setShowSubject(false);
    logout();
  };

  return (
    <div className="w-full flex flex-col">
      <AnimatePresence mode="wait">
        {!isLoading &&
          (user ? (
            <motion.div
              className="w-full flex space-x-3"
              key="logged-in"
              initial="hidden"
              animate="visible"
              variants={containerVariant}
            >
              <motion.div className="flex flex-1">
                <Card
                  className="w-full py-2 sm:py-3 md:py-4 bg-mnGreen flex items-center justify-center cursor-pointer"
                  onClick={() => setShowSubject(true)}
                >
                  <p className="font-chewy text-3xl sm:text-4xl md:text-[42px] text-white text-center">
                    play
                  </p>
                </Card>
              </motion.div>
              <motion.div
                className="h-[60px] sm:h-[72px] md:h-[84px] w-[60px] sm:w-[72px] md:w-[84px]"
                variants={childVariant}
              >
                <Card className="w-full h-full flex items-center justify-center text-mnGreen">
                  <FontAwesomeIcon icon={faUser} size="2x" />
                </Card>
              </motion.div>
              <motion.div
                className="h-[60px] sm:h-[72px] md:h-[84px] w-[60px] sm:w-[72px] md:w-[84px]"
                variants={childVariant}
              >
                <Card
                  className="w-full h-full flex items-center justify-center bg-jasper cursor-pointer"
                  onClick={handleLogout}
                >
                  <FontAwesomeIcon icon={faRightFromBracket} size="2x" />
                </Card>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              className="w-full"
              key="not-logged-in"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 10, opacity: 1 }}
              exit={{ y: 30, opacity: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
            >
              <Card
                className="w-full py-2 bg-mnGreen flex items-center justify-center cursor-pointer"
                onClick={login}
              >
                <p className="font-chewy text-[24px] sm:text-[32px] md:text-[40px] text-white text-center">
                  login
                </p>
              </Card>
            </motion.div>
          ))}
      </AnimatePresence>

      {showSubject && (
        <motion.div
          className="w-full flex flex-col items-center space-y-3 mt-8"
          initial="hidden"
          animate="visible"
          variants={containerVariant}
        >
          <motion.div
            className="font-medium text-lg sm:text-xl md:text-[22px] text-black"
            variants={childVariant}
          >
            Pick a subject to play!
          </motion.div>
          <div className="w-full flex space-x-3">
            <motion.div className="flex flex-1" variants={childVariant}>
              <Card
                className="bg-saffron w-full py-2"
                onClick={() => setSelectedModal("subject-1")}
              >
                <p className="font-chewy text-3xl sm:text-4xl md:text-[42px] text-black text-center">
                  Subject 1
                </p>
              </Card>
            </motion.div>
            <motion.div className="flex flex-1" variants={childVariant}>
              <Card
                className="bg-saffron w-full py-2"
                onClick={() => setSelectedModal("subject-2")}
              >
                <p className="font-chewy text-3xl sm:text-4xl md:text-[42px] text-black text-center">
                  Subject 2
                </p>
              </Card>
            </motion.div>
          </div>
          <div className="w-full flex space-x-3">
            <motion.div className="flex flex-1" variants={childVariant}>
              <Card
                className="bg-saffron w-full py-2"
                onClick={() => setSelectedModal("subject-3")}
              >
                <p className="font-chewy text-3xl sm:text-4xl md:text-[42px] text-black text-center">
                  Subject 3
                </p>
              </Card>
            </motion.div>
            <motion.div className="flex flex-1" variants={childVariant}>
              <Card
                className="bg-saffron w-full py-2"
                onClick={() => setSelectedModal("subject-4")}
              >
                <p className="font-chewy text-3xl sm:text-4xl md:text-[42px] text-black text-center">
                  Subject 4
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      )}

      {selectedModal && (
        <motion.div
          className="absolute top-0 left-0 z-30 w-screen h-screen flex items-center justify-center bg-black/80"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Card className="relative w-[400px] max-w-[90%] pt-5 pb-7 px-2 sm:px-3 md:px-4 flex flex-col items-center justify-center bg-saffron text-black">
            <p className="font-chewy text-3xl sm:text-4xl md:text-[42px] text-center mb-5">
              {selectedModal}
            </p>
            <p className="font-bold text-lg">Cost</p>
            <div className="flex items-center jusitfy-center space-x-2 space-y-2">
              <p className="font-bold text-lg">0</p>
              <FontAwesomeIcon icon={faMap} />
            </div>
            <Card
              className="mt-5 py-2 px-4 cursor-pointer bg-mnGreen"
              onClick={() => router.push(`/game?subject=${selectedModal}`)}
            >
              <p className="font-chewy text-2xl sm:text-3xl md:text-4xl text-white text-center">
                Let&apos;s Go!
              </p>
            </Card>
            <button
              className="absolute top-2 right-2 py-1 px-2 rounded-full border border-black text-xs"
              onClick={() => setSelectedModal("")}
            >
              close
            </button>
          </Card>
        </motion.div>
      )}
    </div>
  );
};

export default Contents;
