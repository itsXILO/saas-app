import React from 'react'
import logo from '../assets/logo.svg'
import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import {
  SignInButton,
  SignUpButton,
  Show,
  UserButton,
} from '@clerk/react'

export const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div className='fixed z-5 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-40'>
      <img src={logo} alt="logo" className="w-32 sm:w-44 cursor-pointer" onClick={() => navigate('/')} />

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
