import React from 'react'
import logo from '../assets/logo.png'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion, useScroll, useSpring, useTransform } from 'motion/react'
import { EASE_OUT } from '../lib/motion.js'
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from '@clerk/react'

const Navbar = ({ onMenuToggle, sidebarOpen }) => {
  const navigate = useNavigate()
  const [scrolled, setScrolled] = React.useState(false)
  const [hideHeader, setHideHeader] = React.useState(false)
  const { scrollY } = useScroll()
  const scale = useSpring(
    useTransform(scrollY, [0, 800], [1, 0.82]),
    { stiffness: 120, damping: 25 }
  )

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  React.useEffect(() => {
    const pricing = document.getElementById('pricing')
    if (!pricing) return
    const observer = new IntersectionObserver(
      ([entry]) => setHideHeader(entry.isIntersecting),
      { threshold: 0.1 }
    )
    observer.observe(pricing)
    return () => observer.disconnect()
  }, [])

  return (
    <motion.div
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: hideHeader ? -24 : 0, opacity: hideHeader ? 0 : 1 }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
      className={`fixed z-[60] w-full flex justify-between items-center px-3 sm:px-20 xl:px-40 transition-all duration-300 ${hideHeader ? 'pointer-events-none' : ''} ${scrolled ? 'py-2 bg-[#0b1020]/95 border-b border-white/10' : 'py-3 sm:py-4 bg-transparent border-b border-transparent'}`}
    >
      <motion.div style={{ scale, transformOrigin: 'center center' }} className="flex w-full items-center justify-between">
        <div className="flex items-center">
          <button onClick={onMenuToggle} className="sm:hidden mr-3">
            <svg className={`transition-all duration-300 ${scrolled ? 'w-5 h-5' : 'w-6 h-6'}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          {!sidebarOpen && (
            <img
              src={logo}
              alt="logo"
              className={`cursor-pointer transition-all duration-300 ${scrolled ? 'w-20 sm:w-32' : 'w-24 sm:w-44'}`}
              onClick={() => navigate('/')}
            />
          )}
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <Show when="signed-out">
            <SignInButton mode="modal">
              <button className={`flex items-center gap-2 rounded-full cursor-pointer border border-white/20 text-white transition-all duration-300 hover:border-white/40 hover:bg-white/5 hover:shadow-lg hover:shadow-primary/20 ${scrolled ? 'px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm' : 'px-3.5 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm'}`}>
                Sign in
              </button>
            </SignInButton>
            <SignUpButton mode="modal">
              <button className={`flex items-center gap-2 rounded-full cursor-pointer bg-primary text-white transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 hover:opacity-95 ${scrolled ? 'px-3 py-1.5 text-xs sm:px-4 sm:py-2 sm:text-sm' : 'px-3.5 py-2 text-xs sm:px-5 sm:py-2.5 sm:text-sm'}`}>
                Sign up <ArrowRight className='w-3.5 h-3.5 sm:w-4 sm:h-4' />
              </button>
            </SignUpButton>
          </Show>

          <Show when="signed-in">
            <UserButton afterSignOutUrl="/" />
          </Show>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default Navbar