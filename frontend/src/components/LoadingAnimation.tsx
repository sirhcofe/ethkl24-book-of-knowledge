import { motion, Variants } from "framer-motion";

const DotVariants: Variants = {
  initial: {
    y: "0%",
  },
  animate: {
    y: "100%",
  },
};

const LoadingAnimation = ({ size }: { size: "sm" | "md" | "lg" }) => {
  return (
    <motion.div
      className="flex gap-x-2"
      animate="animate"
      transition={{ staggerChildren: 0.2 }}
    >
      <motion.span
        className={`${
          size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
        } bg-black rounded-full`}
        variants={DotVariants}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.span
        className={`${
          size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
        } bg-black rounded-full`}
        variants={DotVariants}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
      <motion.span
        className={`${
          size === "sm" ? "w-2 h-2" : size === "md" ? "w-3 h-3" : "w-4 h-4"
        } bg-black rounded-full`}
        variants={DotVariants}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default LoadingAnimation;
