import React from 'react'
import { Sparkle, Gem } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useAuth, useUser } from '@clerk/react'
import axios from 'axios'
import toast from 'react-hot-toast'
import CreationItem from '../components/CreationItem'

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

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

  useEffect(() => {
    if (user) {
      getDashboardData()
    }
  }, [user])

  return (
    <div className="h-full overflow-y-scroll p-6">

      { /* total creations card */}
      <div className='flex justify-start gap-4 flex-wrap'>

        <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-slate-800 rounded-lg p-4 flex justify-between items-center'>
          <div className='flex flex-col gap-1'>
            <p className="text-sm text-gray-400">Total creations</p>
            <h2 className="text-2xl font-bold">{creations.length}</h2>
          </div>
          <div className='bg-primary p-2 rounded-full flex justify-center items-center gradient-to-r from-cyan-500 to-blue-500'>
            <Sparkle className="text-white w-5" />
          </div>
        </div>

        { /* active plan card */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-slate-800 rounded-lg p-4 flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <p className="text-sm text-gray-400">Active Plan</p>
            <h2 className="text-2xl font-bold text-white">Free</h2>
          </div>
          <div className="ml-4 shrink-0 rounded-full bg-primary p-2 flex items-center justify-center">
            <Gem className="w-5 text-white" />
          </div>
        </div>
        
      </div>

      <div className='space-y-4 mt-6'>
        <p className='mt-6 mb-4'>Recent Creations</p>
        {loading ? (
          <div className='flex justify-center items-center h-32'>
            <div className='w-8 h-8 border-2 border-slate-300 border-t-blue-500 rounded-full animate-spin' />
          </div>
        ) : creations.length === 0 ? (
          <div className='flex justify-center items-center h-32 text-gray-400'>
            <p>No creations yet. Start creating!</p>
          </div>
        ) : (
          creations.map((item) => <CreationItem key={item.id} item={item} />)
        )}
      </div>
    </div>
  )
}

export default Dashboard
