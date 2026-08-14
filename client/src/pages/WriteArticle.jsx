import React from 'react'
import { Sparkles, Edit } from 'lucide-react'
import axios from 'axios'
import { useState } from 'react'
import { useAuth } from '@clerk/react'
import toast from 'react-hot-toast'
import Markdown from 'react-markdown'
import { motion } from 'motion/react'
import { fadeUp, stagger } from '../lib/motion.js'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const WriteArticle = () => {

  const articleLength = [
    { length: 800, text: 'Short (500-800 words)' },
    { length: 1200, text: 'Medium (800-1200 words)' },
    { length: 1600, text: 'Long (1200+ words)' }
  ]

  const [selectedLength, setSelectedLength] = useState(articleLength[0])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')
  const [remaining, setRemaining] = useState(null)

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const prompt = `Write an article about ${input} in ${selectedLength.text}`

      const { data } = await axios.post('/api/ai/generate-article', { prompt, length: selectedLength.length }, {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })

      if (data.success) {
        setContent(data.content)
        if (data.remaining !== undefined && data.remaining !== null) {
          setRemaining(data.remaining)
        }
      } else {
        toast.error(data.message)
        if (data.remaining !== undefined) {
          setRemaining(data.remaining)
        }
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
            <Sparkles className='w-6 text-[#4A7AFF]' />
            <h1 className='text-xl font-semibold text-white'>Article Configuration</h1>
          </div>
          <p className='mt-6 text-sm font-medium text-slate-200'>Article Topic</p>
          <input
            type="text"
            className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md bg-slate-700 border border-white/10 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            placeholder='The future of artificial intelligence is...'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            required
          />
          <p className='mt-4 text-sm font-medium text-slate-200'>Article Length</p>
          <select
            className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md bg-slate-700 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            value={selectedLength.length}
            onChange={(e) => setSelectedLength(articleLength.find(item => item.length === Number(e.target.value)))}
          >
            {articleLength.map((item) => (
              <option key={item.length} value={item.length}>{item.text}</option>
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
                Generate article
              </>
            )}
          </motion.button>
          {remaining !== null && (
            <p className={`text-xs mt-2 text-center ${remaining === 0 ? 'text-red-400' : 'text-slate-400'}`}>
              {remaining === 0
                ? 'Free limit reached. Upgrade to continue.'
                : `${remaining} free ${remaining === 1 ? 'try' : 'tries'} remaining`}
            </p>
          )}
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
          <h1 className='text-xl font-semibold text-white'>Generated article</h1>
        </motion.div>

        {!content ? (
          <motion.div variants={fadeUp} className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Edit className='w-9 h-9' />
              <p>Enter a topic and click &quot;Generate article&quot; to get started</p>
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

export default WriteArticle
