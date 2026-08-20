import logo from '../assets/logo.png'
import { motion } from 'motion/react'
import { fadeUp, whileInView } from '../lib/motion.js'

const Footer = () => {
  return (
    <motion.footer {...whileInView} variants={fadeUp} className="px-6 md:px-16 lg:px-24 xl:px-32 pt-10 w-full text-gray-300 bg-transparent">
      <div className="flex flex-col md:flex-row justify-between w-full gap-10 border-t border-gray-700/30 pt-8 pb-6">
        <div className="md:max-w-md">
          <div className="flex items-center gap-3">
            <img src={logo} alt="creator Hub logo" width="36" height="36" className="object-contain" />
            <span className="ml-2 text-lg font-semibold text-white">creator Hub</span>
          </div>

          <p className="mt-4 text-sm text-gray-300">
            AI-powered tools for creators — image generation, article writing, PDF summarization,
            and more. Fast, secure, and privacy-minded.
          </p>

          <div className="mt-4 text-sm text-gray-400">
            <div>support@creatorhub.in</div>
            <div className="mt-1">123 Developer Lane</div>
            <div className="mt-1">Mangalore, Karnataka, India</div>
          </div>
        </div>

        <div className="flex-1 flex flex-wrap gap-10 justify-end">
          <div>
            <h3 className="font-semibold mb-4 text-white">Product</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li><a href="/generate-images" className="hover:underline">Generate Images</a></li>
              <li><a href="/write-article" className="hover:underline">Write Article</a></li>
              <li><a href="/ai/summarize-pdf" className="hover:underline">Summarize PDF</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li><a href="/about" className="hover:underline">About</a></li>
              <li><a href="/pricing" className="hover:underline">Pricing</a></li>
              <li><a href="/contact" className="hover:underline">Contact</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4 text-white">Legal</h3>
            <ul className="text-sm space-y-2 text-gray-300">
              <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
        </div>
      </div>

      <div className="pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-gray-400">
        <p>© {new Date().getFullYear()} creator Hub. All rights reserved.</p>

        <div className="flex items-center gap-4 mt-4 md:mt-0">
          <a href="https://twitter.com" aria-label="Twitter" className="hover:text-white">Twitter</a>
          <a href="https://github.com" aria-label="GitHub" className="hover:text-white">GitHub</a>
          <a href="https://linkedin.com" aria-label="LinkedIn" className="hover:text-white">LinkedIn</a>
        </div>
      </div>
    </motion.footer>
  )
}

export default Footer
