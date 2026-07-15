import React from 'react'
import { FileText } from 'lucide-react'

const SummarizePdf = () => {
  return (
    <div className='flex flex-col sm:flex-row gap-6 p-6 h-full overflow-y-scroll'>
      {/* left col */}
      <form className='flex-1 min-w-[300px] max-w-[600px] flex-col gap-4 flex'>
        <div className='bg-slate-800 rounded-lg p-4'>
          <div className='flex items-center gap-3 mb-4'>
            <FileText className='w-6 text-[#4A7AFF]'/>
            <h1 className='text-xl font-semibold text-white'>Summarize Document</h1>
          </div>
          <p className='mt-6 text-sm font-medium text-slate-200'>Upload Document</p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className='w-full mt-2 text-sm text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-slate-700 file:text-slate-200 hover:file:bg-slate-600 cursor-pointer'
          />
          <p className='mt-2 text-xs text-gray-500'>Supported formats: PDF, DOC, DOCX</p>
          <button className='w-full flex justify-center items-center gap-2 bg-gradient-to-r from-[#226BFF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer'>
            <FileText className='w-5'/>
            Summarize Document
          </button>
        </div>
      </form>
      {/* Right col */}
      <div className='w-full max-w-lg p-4 bg-slate-800 rounded-lg flex flex-col border border-white/10 min-h-96 max-h-[600px]'>
        <div className='flex items-center gap-3'>
          <FileText className='w-5 h-5 text-[#4A7AFF]' />
          <h1 className='text-xl font-semibold text-white'>Summary Result</h1>
        </div>
        <div className='flex-1 flex justify-center items-center'>
          <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
            <FileText className='w-9 h-9' />
            <p>Upload a document and click "Summarize Document" to get started</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SummarizePdf
