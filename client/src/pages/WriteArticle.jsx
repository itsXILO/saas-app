import React from 'react'
import { Sparkles, Edit } from 'lucide-react'

const WriteArticle = () => {

  const onSubmitHandler = async (e) => {
  e.preventDefault();
}

  
  return (
<div className='flex flex-col sm:flex-row gap-6 p-6 h-full overflow-y-scroll'>
  {/* left col */}
  <form className='flex-1 min-w-[300px] max-w-[600px] flex-col gap-4 flex'>
    <div className='bg-slate-800 rounded-lg p-4'>
      <div className='flex items-center gap-3 mb-4'>
        <Sparkles className='w-6 text-[#4A7AFF]'/>
        <h1 className='text-xl font-semibold text-white'>Article Configuration</h1>
      </div>
      <p className='mt-6 text-sm font-medium text-slate-200'>Article Topic</p>
      <input
        type="text"
        className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md bg-slate-700 border border-white/10 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
        placeholder='The future of artificial intelligence is...'
        required
      />
      <p className='mt-4 text-sm font-medium text-slate-200'>Article Length</p>
      <select
        className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md bg-slate-700 border border-white/10 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500'
      >
        <option value="short">Short (~500 words)</option>
        <option value="medium">Medium (~1000 words)</option>
        <option value="long">Long (~2000 words)</option>
      </select>
      <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
        <Edit className='w-5'/>
        Generate article
      </button>
    </div>
  </form>
  {/* Right col */}
<div className='w-full max-w-lg p-4 bg-slate-800 rounded-lg flex flex-col border border-white/10 min-h-96 max-h-[600px]'>
  <div className='flex items-center gap-3'>
    <Edit className='w-5 h-5 text-[#4A7AFF]' />
    <h1 className='text-xl font-semibold text-white'>Generated article</h1>
  </div>
  <div className='flex-1 flex justify-center items-center'>
    <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
      <Edit className='w-9 h-9' />
      <p>Enter a topic and click “Generate article” to get started</p>
    </div>
  </div>
</div>

</div>

  )
}

export default WriteArticle
