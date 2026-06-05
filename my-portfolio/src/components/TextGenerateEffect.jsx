import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';

export default function TextGenerateEffect({ words, className = '', duration = 0.6 }) {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const wordsArray = words.split(' ');

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      filter: 'blur(8px)',
      y: 8,
    },
    visible: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: {
        duration: duration,
        ease: [0.16, 1, 0.3, 1]
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      className={className}
      style={{ display: 'inline-block' }}
    >
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          variants={wordVariants}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
