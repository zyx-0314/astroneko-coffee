import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

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
      <Card className="backdrop-blur-sm bg-card/95 border shadow-xl">
        <CardHeader className="text-center p-4 sm:p-6">
          <CardTitle className="text-xl sm:text-2xl bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {title}
          </CardTitle>
          <CardDescription className="text-sm sm:text-base">
            {description}
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          {children}
        </CardContent>
      </Card>
    </motion.div>
  );
}
