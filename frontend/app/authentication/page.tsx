"use client"

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AuthCard } from '@/components/cards';
import { SignInSection, SignUpSection, AuthBackground } from './section';
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
    name: '',
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
    } catch (error: any) {
      console.error('Sign In Error:', error);
      setError(error.message || 'An error occurred during sign in');
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
      const user = await signUp(signUpData.name, signUpData.email, signUpData.password, signUpData.sex);
      
      if (user) {
        // Update the auth context
        setUser(user);
        
        // Redirect to client dashboard
        router.push('/dashboard');
      } else {
        setError('Failed to create account');
      }
    } catch (error: any) {
      console.error('Sign Up Error:', error);
      setError(error.message || 'An error occurred during sign up');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = (email: string) => {
    // All seeded users use the same password
    let password = 'password123';
    
    setSignInData({ email, password });
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <AuthBackground />
      
      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4 sm:p-6 relative z-10">
        <AuthCard 
          title="Welcome to Astroneko ☕"
          description="Sign in to your account or create a new one"
        >
          <Tabs defaultValue="signin" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signin" className="text-sm font-medium">Sign In</TabsTrigger>
              <TabsTrigger value="signup" className="text-sm font-medium">Sign Up</TabsTrigger>
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

        {/* Footer */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-center text-sm text-muted-foreground max-w-md">
          <p>
            By signing in, you agree to our{' '}
            <Link href="#" className="text-primary hover:underline transition-colors">
              Terms of Service
            </Link>{' '}
            and{' '}
            <Link href="#" className="text-primary hover:underline transition-colors">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
