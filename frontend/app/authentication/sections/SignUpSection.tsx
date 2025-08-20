import React from 'react';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface SignUpSectionProps {
  signUpData: {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    password: string;
    confirmPassword: string;
    sex: string;
  };
  setSignUpData: React.Dispatch<React.SetStateAction<{
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="signup-firstName">First Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="signup-firstName"
                type="text"
                placeholder="Enter your first name"
                value={signUpData.firstName}
                onChange={(e) => setSignUpData(prev => ({ ...prev, firstName: e.target.value }))}
                className="pl-10 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="signup-lastName">Last Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="signup-lastName"
                type="text"
                placeholder="Enter your last name"
                value={signUpData.lastName}
                onChange={(e) => setSignUpData(prev => ({ ...prev, lastName: e.target.value }))}
                className="pl-10 focus:ring-2 focus:ring-primary/20"
                required
              />
            </div>
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
          <Label htmlFor="signup-phoneNumber">Phone Number</Label>
          <div className="relative">
            <svg className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <Input
              id="signup-phoneNumber"
              type="tel"
              placeholder="Enter your phone number"
              value={signUpData.phoneNumber}
              onChange={(e) => setSignUpData(prev => ({ ...prev, phoneNumber: e.target.value }))}
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
