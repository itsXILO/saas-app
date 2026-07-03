import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Menu, X } from 'lucide-react'

const Layout = () => {
  const navigate = useNavigate()
  const [sidebar, setSidebar] = useState(false)
  return (
    <div className='bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white min-h-screen'>
      <nav>
        <img src={assets.logo} alt="Logo" 
        onClick={() => navigate('/')}
        />
        {
          sidebar ? <X className='w-6 h-6 cursor-pointer sm:hidden' />
          : <Menu className='w-6 h-6 cursor-pointer sm:hidden' />
        }
      </nav>
      <Outlet />
    </div>
  )
}

export default Layout
