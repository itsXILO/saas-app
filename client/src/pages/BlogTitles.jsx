import { PenLine, Edit } from 'lucide-react'
import { useState } from 'react'
import { useAuth } from '@clerk/react'
import axios from 'axios'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import { motion } from 'motion/react'
import { fadeUp, stagger } from '../lib/motion.js'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const BlogTitles = () => {

  const tones = ['Professional', 'Casual', 'Witty', 'Informative']

  const [input, setInput] = useState('')
  const [selectedTone, setSelectedTone] = useState(tones[0])
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const prompt = `Generate 5 blog titles about ${input} in a ${selectedTone} tone`

      const { data } = await axios.post('/api/ai/generate-blog-title', { prompt, length: 100 }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setContent(data.content)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='flex flex-col sm:flex-row gap-6 p-6 h-full overflow-y-scroll'>
      {/* left col */}
      <motion.form
        onSubmit={onSubmitHandler}
        variants={stagger(0.08)}
        initial="hidden"
        animate="visible"
        className='flex-1 min-w-[300px] max-w-[600px] flex-col gap-4 flex'
      >
        <motion.div variants={fadeUp} className='bg-slate-800 rounded-lg p-4'>
          <div className='flex items-center gap-3 mb-4'>
            <PenLine className='w-6 text-[#4A7AFF]' />
            <h1 className='text-xl font-semibold text-white'>Blog Title Configuration</h1>
          </div>
          <p className='mt-6 text-sm font-medium text-slate-200'>Blog Topic</p>
          <input
            type="text"
            className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md bg-slate-700 border border-white/10 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            placeholder='How to build a SaaS product...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <p className='mt-4 text-sm font-medium text-slate-200'>Tone</p>
          <select
            className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md bg-slate-700 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            value={selectedTone}
            onChange={(e) => setSelectedTone(e.target.value)}
          >
            {tones.map((tone) => (
              <option key={tone} value={tone}>{tone}</option>
            ))}
          </select>
          <motion.button
            type='submit'
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {loading ? (
              <>
                <div className='w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin' />
                Generating...
              </>
            ) : (
              <>
                <Edit className='w-5' />
                Generate titles
              </>
            )}
          </motion.button>
        </motion.div>
      </motion.form>
      {/* Right col */}
      <motion.div
        variants={stagger(0.08, 0.15)}
        initial="hidden"
        animate="visible"
        className='w-full max-w-lg p-4 bg-slate-800 rounded-lg flex flex-col border border-white/10 min-h-96 max-h-[600px]'
      >
        <motion.div variants={fadeUp} className='flex items-center gap-3'>
          <Edit className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold text-white'>Generated Titles</h1>
        </motion.div>

        {!content ? (
          <motion.div variants={fadeUp} className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <PenLine className='w-9 h-9' />
              <p>Enter a topic and click &quot;Generate titles&quot; to get started</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className='mt-3 h-full overflow-y-scroll text-sm text-slate-300 leading-relaxed space-y-3'
          >
            <Markdown>{content}</Markdown>
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export { BlogTitles }
export default BlogTitles
