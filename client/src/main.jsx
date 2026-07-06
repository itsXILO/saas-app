import { ClerkProvider } from '@clerk/react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout.jsx'
import { BlogTitles } from './pages/BlogTitles.jsx'
import Community from './pages/Community.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { Home } from './pages/Home.jsx'
import GenerateImages from './pages/GenerateImages.jsx'
import RemoveBg from './pages/RemoveBg.jsx'
import RemoveObjects from './pages/RemoveObjects.jsx'
import WriteArticle from './pages/WriteArticle.jsx'
import ReviewResume from './pages/ReviewResume.jsx'

const router = createBrowserRouter([
  // Public homepage
  { path: '/', element: <Home /> },
  // Protected app area
  {
    path: '/ai',
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'community', element: <Community /> },
      { path: 'blog-titles', element: <BlogTitles /> },
      { path: 'generate-images', element: <GenerateImages /> },
      { path: 'remove-bg', element: <RemoveBg /> },
      { path: 'remove-objects', element: <RemoveObjects /> },
      { path: 'write-article', element: <WriteArticle /> },
      { path: 'review-resume', element: <ReviewResume /> },
    ],
  },
])

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}>
    <RouterProvider router={router} />
  </ClerkProvider>
)