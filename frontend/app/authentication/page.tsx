"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthCard } from '@/components/cards';
import { SignInSection, SignUpSection, AuthBackground } from './sections';
import { signIn, signUp, getRouteForRole } from '@/lib/auth';
import { useAuth } from '@/provider/auth-provider';

export default function AuthenticationPage() {
  const router = useRouter();
  const { setUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  
  // Sign In Form
  const [signInData, setSignInData] = useState({
    email: '',
    password: ''
  });
  
  // Sign Up Form
  const [signUpData, setSignUpData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    sex: ''
  });

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await signIn(signInData.email, signInData.password);
      
      if (user) {
        // Update the auth context
        setUser(user);
        
        // Redirect to appropriate dashboard based on role
        const route = getRouteForRole(user.role);
        router.push(route);
      } else {
        setError('Invalid email or password');
      }
    } catch (error: unknown) {
      console.error('Sign In Error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (signUpData.password !== signUpData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const user = await signUp(signUpData.firstName, signUpData.lastName, signUpData.email, signUpData.password, signUpData.sex);
      
      if (user) {
        // Update the auth context
        setUser(user);
        
        // Redirect to client dashboard
        router.push('/dashboard');
      } else {
        setError('Failed to create account');
      }
    } catch (error: unknown) {
      console.error('Sign Up Error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (email: string) => {
    // All seeded users use the same password
    const password = 'password123';
    
    setSignInData({ email, password });
  };

  return (
    <div className="min-h-screen flex flex-col relative bg-gradient-to-br from-[#F8F9FA] via-[#FFFFFF] to-[#E9ECEF] dark:from-[#212529] dark:via-[#343A40] dark:to-[#495057]">
      <AuthBackground />
      
      {/* Brand Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="pt-8 pb-4 text-center relative z-10"
      >
        <h1 className="text-4xl font-bold mb-2 text-[#6B4E37] dark:text-[#E1B168]">
          Astroneko Coffee
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          Where cosmic vibes meet perfect brews ✨
        </p>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="w-full max-w-md"
        >
          <AuthCard 
            title="Welcome Back"
            description="Sign in to your account or create a new one"
          >
            <Tabs defaultValue="signin" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                <TabsTrigger 
                  value="signin" 
                  className="text-sm font-medium text-[#6B4E37] dark:text-[#E1B168] data-[state=active]:text-white data-[state=active]:bg-[#6B4E37] dark:data-[state=active]:bg-[#E1B168] data-[state=active]:shadow-sm transition-all duration-200 rounded-md"
                >
                  Sign In
                </TabsTrigger>
                <TabsTrigger 
                  value="signup" 
                  className="text-sm font-medium text-[#2CA6A4] dark:text-[#D4EDEC] data-[state=active]:text-white data-[state=active]:bg-[#2CA6A4] dark:data-[state=active]:bg-[#2CA6A4] data-[state=active]:shadow-sm transition-all duration-200 rounded-md"
                >
                  Sign Up
                </TabsTrigger>
              </TabsList>
            
            <TabsContent value="signin">
              <SignInSection
                signInData={signInData}
                setSignInData={setSignInData}
                handleSignIn={handleSignIn}
                handleDemoLogin={handleDemoLogin}
                isLoading={isLoading}
                error={error}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </TabsContent>

            <TabsContent value="signup">
              <SignUpSection
                signUpData={signUpData}
                setSignUpData={setSignUpData}
                handleSignUp={handleSignUp}
                isLoading={isLoading}
                error={error}
                showPassword={showPassword}
                setShowPassword={setShowPassword}
              />
            </TabsContent>
          </Tabs>
        </AuthCard>
        </motion.div>

        {/* Footer */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-sm max-w-md text-gray-600 dark:text-gray-300"
        >
          <p>
            By signing in, you agree to our{' '}
            <Link 
              href="#" 
              className="hover:underline transition-colors text-[#2CA6A4] dark:text-[#E1B168]"
            >
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link 
              href="#" 
              className="hover:underline transition-colors text-[#2CA6A4] dark:text-[#E1B168]"
            >
              Privacy Policy
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
}
