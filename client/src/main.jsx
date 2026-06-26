import { ClerkProvider } from '@clerk/react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import { BlogTitles } from './pages/BlogTitles.jsx'
import { Community } from './pages/Community.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { Home } from './pages/Home.jsx'

const router = createBrowserRouter([
  {
    path: '/layout',
    element: <Layout />,
    children: [{ index: true, element: <Dashboard /> }],
  },
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/community',
    element: <Community />,
  },
  {
    path: '/blog-titles',
    element: <BlogTitles />,
  },
])

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
  </ClerkProvider>
)