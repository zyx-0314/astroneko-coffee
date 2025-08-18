"use client"

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ShieldX, ArrowLeft, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function ForbiddenPage() {
  // In a real app, you'd get the current user's role from context/state
  // For demo, we'll assume they need to go to client dashboard
  const correctDashboard = '/dashboard'; // This would be determined by user role

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-destructive/10 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-destructive/20">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldX className="w-8 h-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl text-destructive">Access Forbidden</CardTitle>
            <CardDescription>
              You don&apos;t have permission to access this page. This area is restricted to authorized personnel only.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
              <h3 className="font-medium text-destructive mb-2">What happened?</h3>
              <p className="text-sm text-muted-foreground">
                You attempted to access a page that requires different permissions than your current role allows.
              </p>
            </div>

            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href={correctDashboard}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Go to My Dashboard
                </Link>
              </Button>

              <Button variant="outline" asChild className="w-full">
                <Link href="/authentication">
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Link>
              </Button>
            </div>

            <div className="text-center pt-4">
              <p className="text-sm text-muted-foreground">
                If you believe this is an error, please contact your administrator.
              </p>
            </div>
          </CardContent>
        </Card>

        <div className="mt-6 text-center">
          <Link 
            href="/" 
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Return to Homepage
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
