import { Sparkle, Gem } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth, useUser } from '@clerk/react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import axios from 'axios'
import toast from 'react-hot-toast'
import CreationItem from '../components/CreationItem'
import { fadeUp, stagger } from '../lib/motion.js'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

const CountUp = ({ value }) => {
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { stiffness: 80, damping: 20 })
  const rounded = useTransform(spring, (v) => Math.round(v).toString())

  useEffect(() => {
    motionValue.set(value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])

  return <motion.span>{rounded}</motion.span>
}

export const Dashboard = () => {

  const [creations, setCreations] = useState([])
  const [loading, setLoading] = useState(true)
  const { getToken } = useAuth()
  const { user } = useUser()

  const getDashboardData = async () => {
    try {
      const { data } = await axios.get('/api/user/get-user-creations', {
        headers: { Authorization: `Bearer ${await getToken()}` }
      })
      if (data.success) {
        setCreations(data.creations)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  /* eslint-disable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */
  useEffect(() => {
    if (user) {
      getDashboardData()
    }
  }, [user])
  /* eslint-enable react-hooks/set-state-in-effect, react-hooks/exhaustive-deps */

  return (
    <div className="h-full overflow-y-scroll p-6">

      {/* stat cards */}
      <motion.div
        variants={stagger(0.1)}
        initial="hidden"
        animate="visible"
        className='flex justify-start gap-4 flex-wrap'
      >
        <motion.div
          variants={fadeUp}
          whileHover={{ y: -4, scale: 1.02 }}
          className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-slate-800 rounded-lg p-4 flex justify-between items-center transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/20'
        >
          <div className='flex flex-col gap-1'>
            <p className="text-sm text-gray-400">Total creations</p>
            <h2 className="text-2xl font-bold"><CountUp value={creations.length} /></h2>
          </div>
          <div className='bg-primary p-2 rounded-full flex justify-center items-center gradient-to-r from-cyan-500 to-blue-500'>
            <Sparkle className="text-white w-5" />
          </div>
        </motion.div>

        <motion.div
          variants={fadeUp}
          whileHover={{ y: -4, scale: 1.02 }}
          className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-slate-800 rounded-lg p-4 flex items-center justify-between transition-shadow duration-300 hover:shadow-lg hover:shadow-primary/20"
        >
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-400">Active Plan</p>
            <h2 className="text-2xl font-bold text-white">Free</h2>
          </div>
          <div className="ml-4 shrink-0 rounded-full bg-primary p-2 flex items-center justify-center">
            <Gem className="w-5 text-white" />
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        variants={stagger(0.06)}
        initial="hidden"
        animate="visible"
        className='space-y-4 mt-6'
      >
        <motion.p variants={fadeUp} className='mt-6 mb-4'>Recent Creations</motion.p>
        {loading ? (
          <div className='flex justify-center items-center h-32'>
            <div className='w-8 h-8 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin' />
          </div>
        ) : creations.length === 0 ? (
          <motion.div variants={fadeUp} className='flex justify-center items-center h-32 text-gray-400'>
            <p>No creations yet. Start creating!</p>
          </motion.div>
        ) : (
          creations.map((item) => (
            <motion.div key={item.id} variants={fadeUp}>
              <CreationItem item={item} />
            </motion.div>
          ))
        )}
      </motion.div>
    </div>
  )
}

export default Dashboard
