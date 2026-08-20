import { useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/react';
import { motion } from 'motion/react'
import { fadeUp, stagger, whileInView } from '../lib/motion.js'

const ImageIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
  </svg>
)

const EraseIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const PencilIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
  </svg>
)

const DocumentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
  </svg>
)

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
  </svg>
)

const TitleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
  </svg>
)

const AiToolsData = [
  {
    icon: ImageIcon,
    title: 'Generate Images',
    description: 'Create stunning AI-powered images from text descriptions.',
    path: '/generate-images',
    color: 'text-blue-600',
  },
  {
    icon: EraseIcon,
    title: 'Remove Background',
    description: 'Automatically remove backgrounds from images with precision.',
    path: '/remove-bg',
    color: 'text-emerald-600',
  },
  {
    icon: EraseIcon,
    title: 'Remove Objects',
    description: 'Remove unwanted objects from photos seamlessly.',
    path: '/remove-objects',
    color: 'text-purple-600',
  },
  {
    icon: PencilIcon,
    title: 'Write Article',
    description: 'Generate high-quality articles with AI assistance.',
    path: '/write-article',
    color: 'text-orange-600',
  },
  {
    icon: DocumentIcon,
    title: 'Review Resume',
    description: 'Get AI-powered feedback on your resume and improve it.',
    path: '/review-resume',
    color: 'text-rose-600',
  },
  {
    icon: TitleIcon,
    title: 'Blog Titles',
    description: 'Generate catchy blog title ideas for your content.',
    path: '/blog-titles',
    color: 'text-cyan-600',
  },
  {
    icon: UsersIcon,
    title: 'Community',
    description: 'Connect with other creators and share your work.',
    path: '/community',
    color: 'text-indigo-600',
  },
]

const AiTools = () => {
    const navigate = useNavigate();
    const {user} = useUser();
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-100">
        <motion.div
            variants={stagger(0.15)}
            {...whileInView}
            className='text-center mb-8'
        >
            <motion.h2 variants={fadeUp} className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                Powerful AI Tools for Your Needs
            </motion.h2>
            <motion.p variants={fadeUp} className="mt-4 text-lg leading-6 text-gray-600">
                Discover the latest AI tools to boost your productivity and creativity.
            </motion.p>
        </motion.div>
        <motion.div
            variants={stagger(0.1, 0.15)}
            {...whileInView}
            className='flex flex-wrap justify-center gap-6'
        >
            {AiToolsData.map((tool, index) => (
                <motion.div
                    key={index}
                    variants={fadeUp}
                    whileHover={{ y: -8, scale: 1.02 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    className="bg-white rounded-lg shadow-md p-6 w-80 hover:shadow-xl hover:shadow-primary/10 transition-shadow duration-300"
                    onClick={() => user && navigate(tool.path)}
                >
                <motion.div
                    whileHover={{ scale: 1.12, rotate: 6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                    className={`${tool.color} w-fit`}
                >
                    <tool.icon />
                </motion.div>
                <h3 className="text-xl font-semibold text-gray-800">{tool.title}</h3>
                <p className="mt-2 text-gray-600">{tool.description}</p>
        </motion.div>
            ))}
        </motion.div>
    </div>
  )
}

export default AiTools
