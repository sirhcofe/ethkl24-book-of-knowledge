import { motion, useAnimation } from "framer-motion";
import { useState, useEffect } from "react";

interface LoadingCircleProps {
  radius: number;
  steps?: {
    current: number;
    maximum: number;
  };
  duration?: number;
  strokeWidth?: number;
  color?: string;
}

/**
 * Loading circle animation
 * @param radius Radius of circle
 * @param steps Used to animate in steps (current vs maximum)
 * @param duration Used to animate in duration - default to 3 seconds
 * @param strokeWidth Circle thickness - default to 10px
 * @param color Circle color - default to white
 * @returns
 */
const LoadingCircle = ({
  radius,
  steps,
  duration = 3,
  strokeWidth = 10,
  color = "#ffffff",
}: LoadingCircleProps) => {
  const circumference = 2 * Math.PI * radius;
  const viewBoxSize = radius * 2 + 20;
  const [percentage, setPercentage] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    if (steps) {
      const progress = (steps.current / steps.maximum) * 100;
      setPercentage(progress);
      controls.start({
        strokeDasharray: `${(progress / 100) * circumference} ${circumference}`,
      });
    } else {
      const sequence = async () => {
        for (let i = 0; i <= 100; i++) {
          setPercentage(i);
          await controls.start({
            strokeDasharray: `${(i / 100) * circumference} ${circumference}`,
          });
          await new Promise((resolve) =>
            setTimeout(resolve, (duration / 100) * 1000)
          );
        }
      };
      sequence();
    }
  }, [controls, circumference, duration, steps]);

  let animate, transition;

  if (steps) {
    // Calculate the fraction of the circumference to fill based on current step
    const progress = (steps.current / steps.maximum) * circumference;
    animate = { strokeDasharray: `${progress} ${circumference}` };
    transition = {
      duration: steps.maximum * 0.1,
      ease: "linear",
    };
  } else {
    // Animate from 0 to full circumference over provided duration or default
    animate = {
      strokeDasharray: [
        `0 ${circumference}`,
        `${circumference} ${circumference}`,
      ],
    };
    transition = {
      duration: duration,
      ease: "linear",
    };
  }

  return (
    <svg
      width={viewBoxSize}
      height={viewBoxSize}
      viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}
    >
      <motion.circle
        cx={radius + strokeWidth}
        cy={radius + strokeWidth}
        r={radius}
        fill="transparent"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeDasharray={`0 ${circumference}`}
        animate={animate}
        transition={transition}
        style={{ rotate: -90, originX: "50%", originY: "50%" }}
      />
      <text
        x="50%"
        y="50%"
        fill={color}
        fontSize={radius / 2}
        dy={radius / 3.5} // Center align text vertically
        dx={-radius / 8.5}
        textAnchor="middle" // Center text horizontally
        style={{ fontWeight: 600 }}
      >
        {`${percentage}%`}
      </text>
    </svg>
  );
};

export default LoadingCircle;
