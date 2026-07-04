import React from 'react'
import { Image } from 'lucide-react'

const GenerateImages = () => {
  return (
    <div className='flex flex-col sm:flex-row gap-6 p-6 h-full overflow-y-scroll'>
      {/* left col */}
      <form className='flex-1 min-w-[300px] max-w-[600px] flex-col gap-4 flex'>
        <div className='bg-slate-800 rounded-lg p-4'>
          <div className='flex items-center gap-3 mb-4'>
            <Image className='w-6 text-[#4A7AFF]'/>
            <h1 className='text-xl font-semibold text-white'>Image Configuration</h1>
          </div>
          <p className='mt-6 text-sm font-medium text-slate-200'>Describe your image</p>
          <textarea
            className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md bg-slate-700 border border-white/10 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 min-h-[100px] resize-none'
            placeholder='A serene mountain landscape at sunset...'
            required
          />
          <p className='mt-4 text-sm font-medium text-slate-200'>Style</p>
          <select
            className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md bg-slate-700 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
          >
            <option value="realistic">Realistic</option>
            <option value="ghibli">Ghibli</option>
            <option value="cyberpunk">Cyberpunk</option>
            <option value="watercolor">Watercolor</option>
            <option value="vintage">Vintage</option>
            <option value="minimalist">Minimalist</option>
            <option value="fantasy">Fantasy</option>
            <option value="3d-render">3D Render</option>
          </select>
          <label className='flex items-center gap-3 mt-6 cursor-pointer'>
            <input type="checkbox" className='w-4 h-4 rounded accent-blue-500' />
            <span className='text-sm text-slate-200'>Make this image public</span>
          </label>
          <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-4 text-sm rounded-lg cursor-pointer'>
            <Image className='w-5'/>
            Generate image
          </button>
        </div>
      </form>
      {/* Right col */}
      <div className='w-full max-w-lg p-4 bg-slate-800 rounded-lg flex flex-col border border-white/10 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <Image className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold text-white'>Generated Image</h1>
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <Image className='w-9 h-9' />
            <p>Describe an image and click "Generate image" to get started</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenerateImages
