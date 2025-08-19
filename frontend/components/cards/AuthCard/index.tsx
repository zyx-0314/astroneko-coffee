import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import type { AuthCardProps } from '@/schema/components.schema';

export default function AuthCard({ 
  title, 
  description, 
  children, 
  className = '' 
}: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`w-full max-w-md ${className}`}
    >
      <Card 
        className="backdrop-blur-sm shadow-2xl border-0 bg-white/95 dark:bg-gray-900/95"
        style={{
          backdropFilter: 'blur(10px)',
          boxShadow: '0 25px 50px -12px rgba(107, 78, 55, 0.25)'
        }}
      >
        <CardHeader className="text-center p-6 pb-4">
          <CardTitle 
            className="text-2xl sm:text-3xl font-bold mb-2"
            style={{
              background: `linear-gradient(135deg, #6B4E37 0%, #2CA6A4 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            {title}
          </CardTitle>
          <CardDescription 
            className="text-base text-gray-600 dark:text-gray-300"
          >
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6 pt-2">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}
