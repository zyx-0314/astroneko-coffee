'use client';

import DefaultHeader from '../Default';
import ClientHeader from '../ClientHeader';
import { User } from '@/schema/user.schema';
import { HeaderProps } from '@/schema/header.schema';
import { useDynamicHeaderState } from './DynamicHeader.hook';

// Mock user data - in a real app, this would come from auth context or session
const mockCurrentUser: User = {
  id: '7',
  name: 'John Smith',
  email: 'john.smith@example.com',
  role: 'client',
  points: 1250,
  sex: 'male'
};

interface DynamicHeaderProps extends HeaderProps {
  cartItemCount?: number;
}

export default function DynamicHeader({ className = '', cartItemCount = 0 }: DynamicHeaderProps) {
  const { isAuthenticated, isClientRoute } = useDynamicHeaderState();
  
  if (isAuthenticated && isClientRoute) {
    return (
      <ClientHeader 
        user={mockCurrentUser} 
        className={className} 
        cartItemCount={cartItemCount} 
      />
    );
  }
  
  return <DefaultHeader className={className} />;
}
