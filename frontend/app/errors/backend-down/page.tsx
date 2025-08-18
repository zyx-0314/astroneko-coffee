"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { WifiOff, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function BackendDownPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-red-50 dark:to-red-950/20 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <WifiOff className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl text-red-600">Service Unavailable</CardTitle>
            <CardDescription>
              We&apos;re experiencing technical difficulties. Our team is working to restore service as quickly as possible.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h3 className="font-medium text-red-700 dark:text-red-400 mb-2">What&apos;s happening?</h3>
              <ul className="text-sm text-red-600 dark:text-red-300 space-y-1">
                <li>• Our servers are temporarily unavailable</li>
                <li>• Data may not be current or accessible</li>
                <li>• Some features may not work properly</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full" 
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>

              <Button variant="outline" asChild className="w-full">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Return Home
                </Link>
              </Button>
            </div>

            <div className="text-center pt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                Expected resolution: <strong>Within 1 hour</strong>
              </p>
              <p className="text-xs text-muted-foreground">
                Status updates available on our social media channels
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            Need immediate assistance? Contact us at{' '}
            <a href="tel:+1234567890" className="text-primary hover:underline">
              (123) 456-7890
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
