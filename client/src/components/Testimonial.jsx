import { motion } from 'motion/react'
import { fadeUp, stagger, whileInView } from '../lib/motion.js'

const Testimonial = () => {
const testimonials = [
  { text: "The AI image generator saved me hours of design work. The quality is incredible.", name: "Sarah Chen", role: "Frontend engineer", image: "https://ui-avatars.com/api/?name=Sarah+Chen&background=6366f1&color=fff&size=128" },
  { text: "Removing backgrounds used to take forever. Now it's one click — flawless every time.", name: "Rohan Mehta", role: "Startup founder", image: "https://ui-avatars.com/api/?name=Rohan+Mehta&background=0891b2&color=fff&size=128" },
  { text: "The article writer helped me draft blog posts in minutes. My productivity doubled.", name: "Jason Kim", role: "Product designer", image: "https://ui-avatars.com/api/?name=Jason+Kim&background=7c3aed&color=fff&size=128" },
  { text: "I used the resume reviewer before applying and got way more callbacks. Game changer.", name: "Alex Turner", role: "Full stack developer", image: "https://ui-avatars.com/api/?name=Alex+Turner&background=059669&color=fff&size=128" },
  { text: "Object removal works like magic. Clients are always impressed with the results.", name: "Sofia Martinez", role: "UX designer", image: "https://ui-avatars.com/api/?name=Sofia+Martinez&background=d97706&color=fff&size=128" },
  { text: "This platform has everything — image tools, writing tools, and a great community.", name: "Daniel Wong", role: "UI designer", image: "https://ui-avatars.com/api/?name=Daniel+Wong&background=dc2626&color=fff&size=128" },
];

    const rows = [
        { start: 0, end: 3, className: "animate-scroll" },
        { start: 3, end: 6, className: "animate-scroll-reverse" }
    ];

    const renderCard = (testimonial, index) => (
        <div key={index} className="bg-white border border-slate-200 hover:border-slate-300 rounded-xl p-4 shrink-0 w-[350px]">
            <div className="flex mb-4">
                {Array(5).fill(0).map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-transparent fill-[#737373]" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                ))}
            </div>
            <p className="text-neutral-700 text-sm mb-6">{testimonial.text}</p>
            <div className="flex items-center gap-3">
                <img src={testimonial.image} alt={testimonial.name} className="w-11 h-11 rounded-full object-cover"/>
                <div>
                    <p className="font-medium text-neutral-800 text-sm">{testimonial.name}</p>
                    <p className="text-neutral-600 text-sm">{testimonial.role}</p>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap');
                    *{
                        font-family: "Geist", sans-serif;
                    }

                    @keyframes scroll {
                        0% {
                            transform: translateX(0);
                        }
                        100% {
                            transform: translateX(-50%);
                        }
                    }
                    @keyframes scrollReverse {
                        0% {
                            transform: translateX(-50%);
                        }
                        100% {
                            transform: translateX(0);
                        }
                    }
                    .animate-scroll {
                        animation: scroll 15s linear infinite;
                    }
                    .animate-scroll-reverse {
                        animation: scrollReverse 15s linear infinite;
                    }
                `}
            </style>
            <section className="bg-[#FAFAFA] py-16 px-4">
                <div className="max-w-6xl mx-auto">

                    <motion.div
                        variants={stagger(0.12)}
                        {...whileInView}
                        className="text-center mb-8"
                    >
                        <motion.div variants={fadeUp} className="inline-block bg-neutral-100 border border-neutral-400 rounded-full px-4 py-1 mb-3">
                            <span className="text-xs text-neutral-600">Loved by clients</span>
                        </motion.div>
                        <motion.h2 variants={fadeUp} className="text-4xl md:text-5xl font-medium text-neutral-900 mb-4">
                            What people are saying
                        </motion.h2>
                        <motion.p variants={fadeUp} className="text-neutral-600 text-sm max-w-96 mx-auto">
                            Real feedback from founders, developers and teams building production-ready products.
                        </motion.p>
                    </motion.div>

                    <div className="space-y-6">
                        {rows.map((row, rowIndex) => (
                            <div key={rowIndex} className="relative overflow-hidden">
                                <div className="absolute left-0 top-0 bottom-0 w-28 bg-linear-to-r from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>
                                <div className="absolute right-0 top-0 bottom-0 w-28 bg-linear-to-l from-[#FAFAFA] to-transparent z-10 pointer-events-none"></div>

                                <div className={`flex gap-6 ${row.className}`}>
                                    {[...testimonials.slice(row.start, row.end), ...testimonials.slice(row.start, row.end)].map((testimonial, index) =>
                                        renderCard(testimonial, index)
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Testimonial;