import { motion } from 'framer-motion'
import KromaIcon from './KromaIcon'

const LoadingScreen = () => {
    return (
        <div className="min-h-screen bg-[#fdfdf1] flex flex-col items-center justify-center">
            <motion.div
                animate={{ scale: [1, 1.2, 1], rotate: [0, 360, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <KromaIcon className="w-16 h-16 text-[#EC5E27]" />
            </motion.div>
            <p className="mt-6 text-[#2b323f] font-kroma-logo tracking-widest uppercase text-sm animate-pulse">
                Kroma está preparando todo...
            </p>
        </div>
    )
}

export default LoadingScreen