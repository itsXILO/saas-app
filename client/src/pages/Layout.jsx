import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Sidebar from '../components/sidebar'
import { useUser, SignInButton } from '@clerk/react'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 640)
  const { isSignedIn, isLoaded } = useUser()
  const location = useLocation()
  const sidebarVisible = sidebarOpen || isDesktop

  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 640)

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (location?.state && location.state.openSidebar) {
      setSidebarOpen(true)
      // clear the state so it doesn't reopen on navigation/back
      try { window.history.replaceState({}, '', location.pathname) } catch {}
    }
  }, [location?.pathname])

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]">
        <div className="text-center text-white">Loading...</div>
      </div>
    )
  }
    // require sign-in for everything under /ai
    if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a]">
        <div className="text-center">
          <h2 className="mb-4 text-xl text-white">Please sign in to continue</h2>
          <SignInButton mode="modal">
            <button className="rounded bg-indigo-600 px-4 py-2 text-white">Sign in</button>
          </SignInButton>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white min-h-screen">
      <Navbar
        onMenuToggle={() => setSidebarOpen((s) => !s)}
        sidebarOpen={sidebarVisible}
      />
      <div className="flex-1 w-full flex flex-col sm:flex-row">
        <Sidebar sidebar={sidebarVisible} setSidebar={setSidebarOpen} />
        <main className="flex-1 w-full pt-20 sm:pl-64">
          <div className="p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout