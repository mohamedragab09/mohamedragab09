'use client';

import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion"
import { useEffect, useRef } from "react"

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  const count = useMotionValue(0)
  const rounded = useTransform(count, latest => Math.floor(latest))

  useEffect(() => {
    if (isInView) {
      animate(count, value, {
        duration: 1.6,
        ease: "easeOut",
      })
    }
  }, [isInView, value, count])

  return (
    <motion.span ref={ref}>
      {rounded}
    </motion.span>
  )
}

export default AnimatedNumber
