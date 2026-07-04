import React from 'react'
import { dummyCreationData } from '../assets/assets'
import { Sparkle, Gem } from 'lucide-react'
import { useState, useEffect } from 'react'
import CreationItem from '../components/CreationItem'

export const Dashboard = () => {

  const [creations, setcreations] = useState([])

  const getDashboardData = async () => {
    setcreations(dummyCreationData)
  }

  useEffect(() => {
    getDashboardData()
  },[])

  return (
    <div className="h-full  overflow-yscroll p-6">

      { /* total creations card */}
      <div className='flex justify-start gap-4 flex-wrap '>

        <div className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-slate-800 rounded-lg p-4 flex justify-between items-center'>

        <div className='flex flex-col gap-1'>
          <p className="text-sm text-gray-400">Total creations</p>
          <h2 className="text-2xl font-bold">{creations.length}</h2>
        </div>
        <div className='bg-primary p-2 rounded-full flex justify-center items-center gradient-to-r from-cyan-500 to-blue-500  '>
          <Sparkle className="text-white w-5" />
        </div>
        </div>

        { /* active plancard */}
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 bg-slate-800 rounded-lg p-4 flex items-center justify-between">
        <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-400">Active Plan</p>
        <h2 className="text-2xl font-bold text-white">Premium</h2>
        </div>

        <div className="ml-4 shrink-0 rounded-full bg-primary p-2 flex items-center justify-center">
        <Gem className="w-5 text-white" />
        </div>
        </div>
        
      </div>

      <div className='space-y-4 mt-6'>
      <p className='mt-6 mb-4'>Recent Creations</p>
      {
      creations.map((item) => <CreationItem key={item.id} item={item} />)
      }

      </div>
    </div>
  )
}

export default Dashboard
