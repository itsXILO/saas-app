import { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'motion/react'
import { EASE_OUT } from '../lib/motion.js'
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

  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
  useEffect(() => {
    if (location?.state && location.state.openSidebar) {
      setSidebarOpen(true)
      // clear the state so it doesn't reopen on navigation/back
      try { window.history.replaceState({}, '', location.pathname) } catch { /* ignore */ }
    }
  }, [location?.pathname])
  /* eslint-enable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

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
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#0f0f0f] to-[#1a1a1a] text-white">
      <motion.div
        className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] rounded-full bg-primary/20 blur-[120px]"
        animate={{ x: [0, 50, -30, 0], y: [0, 30, -20, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-cyan-500/15 blur-[120px]"
        animate={{ x: [0, -40, 25, 0], y: [0, -25, 25, 0], scale: [1, 0.94, 1.06, 1] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
      />

      <Navbar
        onMenuToggle={() => setSidebarOpen((s) => !s)}
        sidebarOpen={sidebarVisible}
      />
      <div className="relative flex-1 w-full flex flex-col sm:flex-row">
        <Sidebar sidebar={sidebarVisible} setSidebar={setSidebarOpen} />
        <main className="flex-1 w-full pt-20 sm:pl-64">
          <div className="p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.3, ease: EASE_OUT }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout