import React from 'react'
import * as Clerk from '@clerk/react'
import { motion } from 'motion/react'
import { fadeUp, stagger, whileInView } from '../lib/motion.js'

const PricingTable = Clerk.PricingTable || Clerk.pricingTable || function FallbackPricing() {
  const plans = [
    { name: 'Free', price: '$0', features: ['Basic AI tools', 'Community access'], popular: false },
    { name: 'Student', price: '$4/mo', features: ['All Free features', 'Extra tokens', 'Priority queue'], popular: false },
    { name: 'Pro', price: '$19/mo', features: ['Unlimited access', 'Faster models', 'Team seats'], popular: true },
  ]
  return (
    <motion.div
      variants={stagger(0.12)}
      {...whileInView}
      className="w-full max-w-4xl grid gap-6 sm:grid-cols-3"
    >
      {plans.map((p) => (
        <motion.div
          key={p.name}
          variants={fadeUp}
          whileHover={{ y: -8, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className={`relative rounded-lg p-[1px] ${p.popular ? 'animate-gradient-text bg-gradient-to-r from-cyan-400 via-primary to-blue-500' : 'bg-white/10'}`}
        >
          {p.popular && (
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-3 py-0.5 text-xs font-semibold text-white shadow-lg shadow-cyan-500/30">
              Most Popular
            </span>
          )}
          <div className="flex h-full flex-col rounded-lg bg-[#0d1326]/95 p-6 text-center">
            <h3 className="mb-2 text-lg font-semibold text-white">{p.name}</h3>
            <p className="mb-4 text-2xl font-bold text-white">{p.price}</p>
            <ul className="mb-6 flex-1 space-y-2 text-sm text-slate-200">
              {p.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-500">
              Choose
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}

const Plan = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat px-4 sm:px-20 xl:px-32">
      <motion.div
        variants={stagger(0.12)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-80px' }}
        className="text-center"
      >
        <motion.h1 variants={fadeUp} className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Choose Your Plan
        </motion.h1>

        <motion.p variants={fadeUp} className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
          Select the plan that best fits your needs and start creating with our powerful AI tools.
        </motion.p>
      </motion.div>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <PricingTable />
      </div>
    </div>
  )
}

export default Plan
