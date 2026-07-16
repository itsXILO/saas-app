import React from 'react'
import logo from '../assets/logo.png'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from '@clerk/react'

const Navbar = ({ onMenuToggle, sidebarOpen }) => {
  const navigate = useNavigate()
  return (
    <div className='fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-40'>
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
            <button className='flex items-center gap-2 rounded-full text-sm cursor-pointer border border-white/20 text-white px-5 py-2.5'>
              Sign in
            </button>
          </SignInButton>
          <SignUpButton mode="modal">
            <button className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-5 py-2.5'>
              Sign up <ArrowRight className='w-4 h-4' />
            </button>
          </SignUpButton>
        </Show>

        <Show when="signed-in">
          <UserButton afterSignOutUrl="/" />
        </Show>
      </div>
    </div>
  )
}

export default Navbar