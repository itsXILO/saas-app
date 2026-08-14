import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import { fadeUp, stagger } from '../lib/motion.js'

const ROTATING_WORDS = ['stunning images', 'engaging articles', 'clean backgrounds', 'instant summaries']

const Typewriter = ({ words, className }) => {
  const [index, setIndex] = React.useState(0)
  const [text, setText] = React.useState('')
  const [deleting, setDeleting] = React.useState(false)
  const [reduceMotion, setReduceMotion] = React.useState(false)

  React.useEffect(() => {
    setReduceMotion(window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  }, [])

  React.useEffect(() => {
    if (reduceMotion) return
    const current = words[index % words.length]
    let timeout

    if (!deleting && text === current) {
      timeout = setTimeout(() => setDeleting(true), 1400)
    } else if (deleting && text === '') {
      timeout = setTimeout(() => {
        setDeleting(false)
        setIndex((i) => i + 1)
      }, 300)
    } else {
      timeout = setTimeout(() => {
        setText(deleting ? current.slice(0, text.length - 1) : current.slice(0, text.length + 1))
      }, deleting ? 45 : 95)
    }

    return () => clearTimeout(timeout)
  }, [text, deleting, index, words, reduceMotion])

  if (reduceMotion) return <span className={className}>{words[words.length - 1]}</span>

  return (
    <span className={className}>
      {text}
      <span className="animate-pulse text-cyan-300">|</span>
    </span>
  )
}

const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className='relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat px-4 sm:px-20 xl:px-32'>
      <div className='absolute inset-0 bg-slate-950/55' />

      {/* floating aurora orbs */}
      <motion.div
        className='absolute top-16 -left-24 h-[420px] w-[420px] rounded-full bg-primary/40 blur-[120px]'
        animate={{ x: [0, 50, -30, 0], y: [0, 35, -25, 0], scale: [1, 1.12, 0.94, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className='absolute bottom-10 right-0 h-[360px] w-[360px] rounded-full bg-cyan-500/30 blur-[120px]'
        animate={{ x: [0, -45, 25, 0], y: [0, -30, 30, 0], scale: [1, 0.92, 1.08, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className='absolute top-1/2 left-1/3 h-[280px] w-[280px] rounded-full bg-indigo-500/30 blur-[100px]'
        animate={{ x: [0, 30, -20, 0], y: [0, -25, 20, 0], scale: [1, 1.08, 0.95, 1] }}
        transition={{ duration: 26, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        variants={stagger(0.14)}
        initial='hidden'
        animate='visible'
        className='relative mx-auto max-w-4xl text-center'
      >
        <motion.p variants={fadeUp} className='mb-4 text-sm font-medium uppercase tracking-[0.3em] text-cyan-300/90'>
          CreatorHub Studio
        </motion.p>

        <motion.h1 variants={fadeUp} className='text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl'>
          Create{' '}
          <span className='animate-gradient-text bg-gradient-to-r from-cyan-300 via-white to-blue-400 bg-clip-text text-transparent'>
            without limits.
          </span>
        </motion.h1>

        <motion.p variants={fadeUp} className='mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg'>
          Generate, edit, and write with powerful AI tools designed for creators, teams, and modern professionals.
        </motion.p>

        <motion.p variants={fadeUp} className='mx-auto mt-4 min-h-[1.5em] text-lg font-medium text-cyan-200/90 sm:text-xl'>
          <Typewriter words={ROTATING_WORDS} />
        </motion.p>

        <motion.div variants={fadeUp} className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate('/ai', { state: { openSidebar: true } })}
            className='animate-shimmer rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-cyan-500/30'
          >
            Start creating now
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Hero
