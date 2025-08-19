import React from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SignUpSectionProps {
  signUpData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    sex: string;
  };
  setSignUpData: React.Dispatch<React.SetStateAction<{
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    sex: string;
  }>>;
  handleSignUp: (e: React.FormEvent) => void;
  isLoading: boolean;
  error: string;
  showPassword: boolean;
  setShowPassword: (show: boolean) => void;
}

export default function SignUpSection({
  signUpData,
  setSignUpData,
  handleSignUp,
  isLoading,
  error,
  showPassword,
  setShowPassword
}: SignUpSectionProps) {
  return (
    <div className="space-y-4 mt-4 sm:mt-6">
      <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950">
        <AlertDescription className="text-xs sm:text-sm">
          <strong>Note:</strong> This is for client registration only. 
          Staff members are registered by management.
        </AlertDescription>
      </Alert>

      <form onSubmit={handleSignUp} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="signup-name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="signup-name"
              type="text"
              placeholder="Enter your full name"
              value={signUpData.name}
              onChange={(e) => setSignUpData(prev => ({ ...prev, name: e.target.value }))}
              className="pl-10 focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-email">Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="signup-email"
              type="email"
              placeholder="Enter your email"
              value={signUpData.email}
              onChange={(e) => setSignUpData(prev => ({ ...prev, email: e.target.value }))}
              className="pl-10 focus:ring-2 focus:ring-primary/20"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-sex">Gender (Optional)</Label>
          <Select 
            value={signUpData.sex} 
            onValueChange={(value) => setSignUpData(prev => ({ ...prev, sex: value }))}
          >
            <SelectTrigger className="focus:ring-2 focus:ring-primary/20">
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="signup-password">Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="signup-password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Create a password"
              value={signUpData.password}
              onChange={(e) => setSignUpData(prev => ({ ...prev, password: e.target.value }))}
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

        <div className="space-y-2">
          <Label htmlFor="signup-confirm">Confirm Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              id="signup-confirm"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm your password"
              value={signUpData.confirmPassword}
              onChange={(e) => setSignUpData(prev => ({ ...prev, confirmPassword: e.target.value }))}
              className="pl-10 focus:ring-2 focus:ring-primary/20"
              required
            />
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
          {isLoading ? 'Creating account...' : 'Create Account'}
        </Button>
      </form>
    </div>
  );
}
