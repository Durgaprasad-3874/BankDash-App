import { motion } from 'framer-motion'

const variants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
}

export function PageWrapper({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className="px-4 py-6 md:px-8 md:py-8"
    >
      {children}
    </motion.div>
  )
}
