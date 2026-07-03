import React from 'react'
import * as Clerk from '@clerk/react'

const PricingTable = Clerk.PricingTable || Clerk.pricingTable || function FallbackPricing() {
  const plans = [
    { name: 'Free', price: '$0', features: ['Basic AI tools', 'Community access'] },
    { name: 'Student', price: '$4/mo', features: ['All Free features', 'Extra tokens', 'Priority queue'] },
    { name: 'Pro', price: '$19/mo', features: ['Unlimited access', 'Faster models', 'Team seats'] },
  ]
  return (
    <div className="w-full max-w-4xl grid gap-6 sm:grid-cols-3">
      {plans.map((p) => (
        <div key={p.name} className="rounded-lg bg-white/5 p-6 text-center">
          <h3 className="mb-2 text-lg font-semibold text-white">{p.name}</h3>
          <p className="mb-4 text-2xl font-bold text-white">{p.price}</p>
          <ul className="mb-6 space-y-2 text-sm text-slate-200">
            {p.features.map((f) => (
              <li key={f}>• {f}</li>
            ))}
          </ul>
          <button className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-500">
            Choose
          </button>
        </div>
      ))}
    </div>
  )
}

const Plan = () => {
  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat px-4 sm:px-20 xl:px-32">
      <div className="text-center">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Choose Your Plan
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-200 sm:text-lg">
          Select the plan that best fits your needs and start creating with our powerful AI tools.
        </p>
      </div>
      <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
        <PricingTable />
      </div>
    </div>
  )
}

export default Plan
