import { useAuth } from "@/hooks/hooks";
import { AnimatePresence, motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Card from "../Card";
import { faRightFromBracket, faUser } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

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
  const [showSubject, setShowSubject] = useState(false);

  return (
    <div className="w-full">
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
                <Card className="w-full py-4 bg-mnGreen flex items-center justify-center cursor-pointer">
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
                  onClick={logout}
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
    </div>
  );
};

export default Contents;
