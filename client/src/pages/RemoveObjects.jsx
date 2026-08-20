import { Scissors, Image } from 'lucide-react'
import axios from 'axios'
import { useState } from 'react'
import { useAuth } from '@clerk/react'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'
import { fadeUp, stagger } from '../lib/motion.js'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const RemoveObjects = () => {

  const [imageFile, setImageFile] = useState(null)
  const [objectName, setObjectName] = useState('')
  const [publish, setPublish] = useState(false)
  const [loading, setLoading] = useState(false)
  const [content, setContent] = useState('')

  const { getToken } = useAuth()

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!imageFile) {
      return toast.error('Please select an image')
    }

    try {
      setLoading(true)

      const formData = new FormData()
      formData.append('image', imageFile)
      formData.append('object', objectName)
      formData.append('publish', publish)

      const { data } = await axios.post('/api/ai/remove-image-object', formData, {
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
            <Scissors className='w-6 text-[#4A7AFF]'/>
            <h1 className='text-xl font-semibold text-white'>Object Removal</h1>
          </div>
          <p className='mt-6 text-sm font-medium text-slate-200'>Upload Image</p>
          <input
            type="file"
            accept="image/*"
            className='w-full mt-2 text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-slate-700 file:text-slate-200 hover:file:bg-slate-600 cursor-pointer'
            onChange={(e) => setImageFile(e.target.files[0])}
            required
          />
          <p className='mt-2 text-xs text-gray-500'>Supported formats: PNG, JPEG, WEBP</p>
          <p className='mt-4 text-sm font-medium text-slate-200'>What object to remove</p>
          <input
            type="text"
            className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md bg-slate-700 border border-white/10 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
            placeholder='e.g. the red car'
            value={objectName}
            onChange={(e) => setObjectName(e.target.value)}
            required
          />
          <p className='mt-2 text-xs text-gray-500'>Enter one object name only</p>
          <label className='flex items-center gap-3 mt-6 cursor-pointer'>
            <input
              type="checkbox"
              className='w-4 h-4 rounded accent-blue-500'
              checked={publish}
              onChange={(e) => setPublish(e.target.checked)}
            />
            <span className='text-sm text-slate-200'>Make this image public</span>
          </label>
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
                Processing...
              </>
            ) : (
              <>
                <Scissors className='w-5'/>
                Remove Object
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
          <Image className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold text-white'>Processed Image</h1>
        </motion.div>

        {!content ? (
          <motion.div variants={fadeUp} className='flex-1 flex justify-center items-center'>
            <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
              <Scissors className='w-9 h-9' />
              <p>Upload an image, name an object, and click &quot;Remove Object&quot; to get started</p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className='mt-3 h-full overflow-y-scroll'
          >
            <img src={content} alt='Object removed' className='w-full rounded-lg' />
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default RemoveObjects
