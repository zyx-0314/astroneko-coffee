import React from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { DemoAccountCard } from '@/components/cards';
import Link from 'next/link';

interface SignInSectionProps {
  signInData: {
    email: string;
    password: string;
  };
  setSignInData: React.Dispatch<React.SetStateAction<{email: string; password: string}>>;
  handleSignIn: (e: React.FormEvent) => void;
  handleDemoLogin: (email: string) => void;
  isLoading: boolean;
  error: string;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export default function SignInSection({
  signInData,
  setSignInData,
  handleSignIn,
  handleDemoLogin,
  isLoading,
  error,
  showPassword,
  setShowPassword
}: SignInSectionProps) {
  return (
    <div className="space-y-4 mt-4 sm:mt-6">
      <form onSubmit={handleSignIn} className="space-y-4">
        {/* Demo Accounts */}
        <DemoAccountCard onDemoLogin={handleDemoLogin} />

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signin-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="signin-email"
              type="email"
              placeholder="Enter your email"
              value={signInData.email}
              onChange={(e) => setSignInData(prev => ({ ...prev, email: e.target.value }))}
              className="pl-10 focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signin-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="signin-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password"
              value={signInData.password}
              onChange={(e) => setSignInData(prev => ({ ...prev, password: e.target.value }))}
              className="pl-10 pr-10 focus:ring-2 focus:ring-primary/20"
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Button 
          type="submit" 
          className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-200" 
          disabled={isLoading}
        >
          {isLoading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="text-center">
        <Link href="#" className="text-sm text-primary hover:underline transition-colors">
          Forgot your password?
        </Link>
      </div>
    </div>
  );
}
