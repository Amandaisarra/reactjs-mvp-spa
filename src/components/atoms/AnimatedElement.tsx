import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedElementProps {
  children: ReactNode;
  animation?: 'fadeIn' | 'slideUp' | 'slideIn' | 'scale' | 'bounce';
  delay?: number;
  duration?: number;
  className?: string;
}

const animations: Record<string, Variants> = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideIn: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
  },
  bounce: {
    initial: { opacity: 0, scale: 0.3 },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 20,
      },
    },
    exit: { opacity: 0, scale: 0.3 },
  },
};

export const AnimatedElement = ({
  children,
  animation = 'fadeIn',
  delay = 0,
  duration = 0.5,
  className = '',
}: AnimatedElementProps) => {
  const variant = animations[animation];

  return (
    <motion.div
      initial="initial"
      animate="animate"
      exit="exit"
      variants={variant}
      transition={{ duration, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
