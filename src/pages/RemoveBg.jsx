import React from 'react'
import { Eraser, Image } from 'lucide-react'

const RemoveBg = () => {
  return (
    <div>
      <h1>Remove Background</h1>
    <div className='flex flex-col sm:flex-row gap-6 p-6 h-full overflow-y-scroll'>
      {/* left col */}
      <form className='flex-1 min-w-[300px] max-w-[600px] flex-col gap-4 flex'>
        <div className='bg-slate-800 rounded-lg p-4'>
          <div className='flex items-center gap-3 mb-4'>
            <Eraser className='w-6 text-[#4A7AFF]'/>
            <h1 className='text-xl font-semibold text-white'>Background Removal</h1>
          </div>
          <p className='mt-6 text-sm font-medium text-slate-200'>Upload Image</p>
          <input
            type="file"
            accept="image/*"
            className='w-full mt-2 text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-slate-700 file:text-slate-200 hover:file:bg-slate-600 cursor-pointer'
          />
          <p className='mt-2 text-xs text-gray-500'>Supported formats: PNG, JPEG, WEBP</p>
          <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
            <Eraser className='w-5'/>
            Remove Background
          </button>
        </div>
      </form>
      {/* Right col */}
      <div className='w-full max-w-lg p-4 bg-slate-800 rounded-lg flex flex-col border border-white/10 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Image className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold text-white'>Processed Image</h1>
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <Image className='w-9 h-9' />
            <p>Upload an image and click "Remove Background" to get started</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default RemoveBg
