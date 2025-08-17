'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  avatar?: string;
  initials?: string;
  rating?: number;
  className?: string;
  delay?: number;
}

import { StarRatingProps } from '@/schema/animatedComponents.schema';

const StarRating = ({ rating, maxRating = 5 }: StarRatingProps) => {
  const stars = Array.from({ length: maxRating }, (_, index) => ({
    active: index < rating,
    delay: 0.1 + (index * 0.1)
  }));

  const colors = ['bg-[#6B4E37]', 'bg-[#2CA6A4]', 'bg-[#E1B168]'];

  return (
    <div className="flex space-x-1">
      {stars.map((star, index) => (
        <motion.div
          key={index}
          className={`w-2 h-2 rounded-full ${
            star.active 
              ? colors[index % colors.length]
              : 'bg-gray-300'
          }`}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ 
            duration: 0.4, 
            delay: star.delay,
            type: "spring",
            stiffness: 300
          }}
          whileHover={{ scale: 1.5 }}
        />
      ))}
    </div>
  );
};

const TestimonialCard = ({
  quote,
  author,
  role,
  avatar,
  initials,
  rating = 5,
  className = '',
  delay = 0
}: TestimonialCardProps) => {
  return (
    <motion.div
      className={`max-w-4xl mx-auto ${className}`}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, delay }}
    >
      <motion.div 
        className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-12 md:p-16"
        whileHover={{ 
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" 
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="text-center mb-12">
          {/* Star Rating */}
          <motion.div 
            className="flex justify-center mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + 0.2 }}
          >
            <StarRating rating={rating} />
          </motion.div>
          
          {/* Quote */}
          <motion.blockquote 
            className="text-2xl md:text-3xl font-serif text-gray-900 dark:text-white mb-8 leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + 0.4 }}
          >
            {`"${quote}"`}
          </motion.blockquote>
          
          {/* Author */}
          <motion.div 
            className="flex items-center justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: delay + 0.6 }}
          >
            <motion.div 
              className="w-16 h-16 bg-gradient-to-br from-[#6B4E37] to-[#E1B168] rounded-full mr-4 flex items-center justify-center"
              whileHover={{ 
                scale: 1.1,
                rotate: [0, -10, 10, 0]
              }}
              transition={{ duration: 0.3 }}
            >
              {avatar ? (
                <div className='w-full h-full rounded-full overflow-hidden relative'>
                  <Image 
                    src={avatar} 
                    alt={author}
                    fill
                    className="rounded-full object-cover"
                  />
                </div>
              ) : (
                <span className="text-white font-bold text-lg">
                  {initials || author.split(' ').map(n => n[0]).join('')}
                </span>
              )}
            </motion.div>
            <motion.div 
              className="text-left"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: delay + 0.8 }}
            >
              <p className="font-semibold text-gray-900 dark:text-white">{author}</p>
              <p className="text-gray-600 dark:text-gray-400">{role}</p>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialCard;
