import React from 'react'
import logo from '../assets/logo.png'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
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

  React.useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.div
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT }}
      className={`fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-40 transition-colors duration-300 ${scrolled ? 'border-b border-white/10 bg-slate-950/60 backdrop-blur-xl' : 'bg-transparent border-b border-transparent'}`}
    >
      <div className="flex items-center">
        <button onClick={onMenuToggle} className="sm:hidden mr-3">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 6h16M4 12h16M4 18h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>

        {!sidebarOpen && (
          <img
            src={logo}
            alt="logo"
            className="w-32 sm:w-44 cursor-pointer"
            onClick={() => navigate('/')}
          />
        )}
      </div>

      <div className="flex items-center gap-3">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <button className='flex items-center gap-2 rounded-full text-sm cursor-pointer border border-white/20 text-white px-5 py-2.5 transition-all duration-300 hover:border-white/40 hover:bg-white/5 hover:shadow-lg hover:shadow-primary/20'>
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-5 py-2.5 transition-all duration-300 hover:shadow-lg hover:shadow-primary/40 hover:opacity-95'>
              Sign up <ArrowRight className='w-4 h-4' />
            </button>
          </SignUpButton>
        </Show>

        <Show when="signed-in">
          <UserButton afterSignOutUrl="/" />
        </Show>
      </div>
    </motion.div>
  )
}

export default Navbar