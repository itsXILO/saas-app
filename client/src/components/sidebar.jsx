import React from 'react'
import { useUser, useClerk } from '@clerk/react'
import fallbackAvatar from '../assets/profile_img_1.png'
import logo from '../assets/logo.svg'
import { useNavigate } from 'react-router-dom'
import { House, SquarePen, Hash, Image, Eraser, Scissors, FileText, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'

const navItems = [
  { to: '/layout', label: 'Dashboard', Icon: House },
  { to: '/layout/write-article', label: 'Write Article', Icon: SquarePen },
  { to: '/layout/blog-titles', label: 'Blog Titles', Icon: Hash },
  { to: '/layout/generate-images', label: 'Generate Images', Icon: Image },
  { to: '/layout/remove-bg', label: 'Remove Background', Icon: Eraser },
  { to: '/layout/remove-objects', label: 'Remove Object', Icon: Scissors },
  { to: '/layout/review-resume', label: 'Review Resume', Icon: FileText },
  { to: '/layout/community', label: 'Community', Icon: Users },
]

const Sidebar = ({ sidebar, setSidebar }) => {
  const { user, isSignedIn, isLoaded } = useUser()
  const clerk = useClerk()

  if (!isLoaded) return null
  if (!isSignedIn) return null

  const name = user?.fullName || user?.firstName || user?.username || 'Member'
  const avatar = user?.profileImageUrl || user?.imageUrl || fallbackAvatar

  const navigate = useNavigate()

  return (
    <aside className={`fixed top-0 left-0 w-64 h-full bg-slate-900 text-white z-50 transform ${sidebar ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out sm:translate-x-0 pointer-events-auto`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
              <img src={logo} alt="creator Hub" className="w-7 h-7" />
              <div className="text-white font-semibold">creator Hub</div>
            </div>
            <button onClick={() => setSidebar(false)} className="sm:hidden text-sm text-gray-300">Close</button>
          </div>

          <div className="mt-6 text-center">
            <img src={avatar} alt={name} className="w-14 h-14 rounded-full mx-auto" />
            <h2 className="text-center text-lg font-semibold mt-2 text-white">{name}</h2>
            <div className="mt-1 text-xs text-slate-300">creator Hub member</div>

            <div className="mt-4">
              <button onClick={() => clerk.openUserProfile()} className="w-full rounded bg-slate-800 px-3 py-2 text-sm">Profile</button>
            </div>
          </div>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-4">
          <ul className="space-y-1">
            {navItems.map(({ to, label, Icon }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  className={({ isActive }) => `flex items-center gap-3 px-3 py-2 rounded text-sm ${isActive ? 'bg-white/5 text-white' : 'text-slate-300 hover:bg-white/5'}`}>
                  <Icon className="w-4 h-4 text-slate-300" />
                  <span className="font-medium">{label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button onClick={() => clerk.signOut()} className="w-full rounded bg-red-600 px-3 py-2 text-sm">Sign out</button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar