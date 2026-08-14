import { motion, useScroll, useSpring } from 'motion/react'

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[100] h-1 origin-left bg-gradient-to-r from-cyan-400 via-primary to-blue-500"
      style={{ scaleX }}
    />
  )
}

export default ScrollProgress
