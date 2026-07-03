import React from 'react'
import { useNavigate } from 'react-router-dom'

const Hero = () => {
  const navigate = useNavigate()
  return (
    <div className='relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat px-4 sm:px-20 xl:px-32'>
      <div className='absolute inset-0 bg-slate-950/55' />

      <div className='relative mx-auto max-w-4xl text-center'>
        <p className='mb-4 text-sm font-medium uppercase tracking-[0.3em] text-cyan-300/90'>CreatorHub Studio</p>

        <h1 className='text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl'>
          Create without limits.
        </h1>

        <p className='mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg'>
          Generate, edit, and write with powerful AI tools designed for creators,
          teams, and modern professionals.
        </p>

        <div className='mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row'>
          <button onClick={() => navigate('/layout', { state: { openSidebar: true } })} className='rounded-full bg-primary px-7 py-3.5 text-sm font-medium text-white shadow-lg shadow-cyan-500/20 transition-transform duration-200 hover:-translate-y-0.5 hover:opacity-95'>
            Start creating now
          </button>
        </div>
      </div>
    </div>
  )
}

export default Hero
