import { motion } from 'framer-motion';
import { slideUpContainer, cardFadeUp } from '@/framer';
import { MenuHeaderSectionProps } from '@/schema';

export default function MenuHeaderSection({ title, subtitle }: MenuHeaderSectionProps) {
  return (
    <motion.header
      className="mb-8"
      variants={slideUpContainer}
    >
      <div className="flex items-center justify-between mb-6">
        <motion.div variants={cardFadeUp}>
          <h1 className="text-4xl font-bold text-[#6B4E37] dark:text-[#E1B168] mb-2">
            {title}
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </motion.header>
  );
}
