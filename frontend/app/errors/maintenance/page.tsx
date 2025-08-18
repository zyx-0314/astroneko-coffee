"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Wrench, Clock, Home, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

export default function MaintenancePage() {
  // Mock maintenance progress
  const maintenanceProgress = 75;
  const estimatedCompletion = "2:30 PM EST";

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-blue-50 dark:to-blue-950/20 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wrench className="w-8 h-8 text-blue-600" />
            </div>
            <CardTitle className="text-2xl text-blue-600">Scheduled Maintenance</CardTitle>
            <CardDescription>
              We&apos;re currently performing system maintenance to improve your experience. We&apos;ll be back shortly!
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-medium text-blue-700 dark:text-blue-400 mb-3">Maintenance Progress</h3>
              
              <div className="space-y-3">
                <Progress value={maintenanceProgress} className="h-2" />
                <div className="flex justify-between text-sm text-blue-600 dark:text-blue-300">
                  <span>{maintenanceProgress}% Complete</span>
                  <span>Est. {estimatedCompletion}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h3 className="font-medium text-blue-700 dark:text-blue-400 mb-2">What&apos;s being updated?</h3>
              <ul className="text-sm text-blue-600 dark:text-blue-300 space-y-1">
                <li>• Database performance improvements</li>
                <li>• Security updates and patches</li>
                <li>• New feature preparations</li>
                <li>• System optimization</li>
              </ul>
            </div>

            <div className="space-y-3">
              <Button 
                className="w-full" 
                onClick={() => window.location.reload()}
              >
                <RefreshCw className="w-4 h-4 mr-2" />
                Check Status
              </Button>

              <Button variant="outline" asChild className="w-full">
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Return Home
                </Link>
              </Button>
            </div>

            <div className="text-center pt-4 space-y-2">
              <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>Started: 12:00 PM EST</span>
              </div>
              <p className="text-xs text-muted-foreground">
                We appreciate your patience during this brief maintenance window
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center space-y-2">
          <p className="text-sm text-muted-foreground">
            Stay updated: Follow us on{' '}
            <a href="#" className="text-primary hover:underline">Twitter</a> or{' '}
            <a href="#" className="text-primary hover:underline">Instagram</a>
          </p>
          <p className="text-xs text-muted-foreground">
            Questions? Email us at{' '}
            <a href="mailto:support@astroneko.com" className="text-primary hover:underline">
              support@astroneko.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
