'use client';

import DefaultHeader from '../Default';
import AuthenticatedHeader from '../Authenticated';
import { HeaderProps } from '@/schema/header.schema';
import { useDynamicHeaderState } from './DynamicHeader.hook';
import { useAuth } from '@/provider/auth-provider';

interface DynamicHeaderProps extends HeaderProps {
  cartItemCount?: number;
}

export default function DynamicHeader({ className = '', cartItemCount = 0 }: DynamicHeaderProps) {
  const { isClientRoute } = useDynamicHeaderState();
  const { user, isLoading } = useAuth();
  
  // Show loading state while authentication is being verified
  if (isLoading) {
    return <DefaultHeader className={className} />;
  }
  
  // Show authenticated header when user is logged in and not on authentication page
  if (user && isClientRoute) {
    return (
      <AuthenticatedHeader 
        user={user} 
        className={className} 
        cartItemCount={cartItemCount} 
      />
    );
  }
  
  return <DefaultHeader className={className} />;
}
