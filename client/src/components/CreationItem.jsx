import React, { useState } from 'react'
import Markdown from 'react-markdown'
import { Globe, Lock } from 'lucide-react'

const CreationItem = ({item}) => {

    const [expanded, setExpanded] = useState(false)

  return (
    <div onClick={() => setExpanded(!expanded)} className='p-4 max-w-5xl text-sm bg-slate-800 border border-white/5 rounded-lg cursor-pointer text-white'>
      <div className='flex justify-between items-center gap-4'>
        <div className='flex-1'>
          <div className='flex items-center gap-2'>
            <h2>{item.prompt}</h2>
            {item.publish ? (
              <Globe className='w-4 h-4 text-green-400 shrink-0' title='Public' />
            ) : (
              <Lock className='w-4 h-4 text-slate-500 shrink-0' title='Private' />
            )}
          </div>
          <p className='text-slate-400'>
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>
        <button className='bg-white/5 border border-white/10 text-slate-200 px-4 py-1 rounded-full shrink-0'>
          {item.type}
        </button>
      </div>
      {expanded && (
  <div>
    {item.type === 'image' ? (
      <img 
        src={item.content} 
        alt={item.alt || 'content image'} 
        className="mt-3 w-full max-w-md" 
      />
    ) : (
      <div className="mt-3 h-full overflow-y-scroll text-sm text-slate-200">
        <div className='reset-tw'>
        <Markdown>{item.content}</Markdown>
        </div>
      </div>
    )}
  </div>
)}

    </div>
  )
}


export default CreationItem
