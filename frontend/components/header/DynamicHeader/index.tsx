'use client';

import DefaultHeader from '../Default';
import ClientHeader from '../ClientHeader';
import { User } from '@/schema/user.schema';
import { HeaderProps } from '@/schema/header.schema';
import { useDynamicHeaderState } from './DynamicHeader.hook';
import { FrontDeskHeader, KitchenHeader, ManagerHeader } from '@/components/header';


// Mock user data - in a real app, this would come from auth context or session
const mockCurrentUser: User[] = [
        {
          id: '1',
          name: 'Alex Johnson',
          email: 'alex.johnson@astroneko.com',
          role: 'cashier' as const,
          shift: { start: '08:00', clockInTime: '07:55' }
        },
        {
          id: '5',
          name: 'David Kim',
          email: 'david.kim@astroneko.com',
          role: 'manager' as const,
          shift: { start: '07:00', clockInTime: '06:55' }
        },
        {
          id: '7',
          name: 'John Smith',
          email: 'john.smith@example.com',
          role: 'client' as const,
          points: 1250
        },
        {
          id: '3',
          name: 'Mike Rodriguez',
          email: 'mike.rodriguez@astroneko.com',
          role: 'cook' as const,
          shift: { start: '07:30', clockInTime: '07:25' },
          isActive: true
        }
        
      ];

interface DynamicHeaderProps extends HeaderProps {
  cartItemCount?: number;
}

export default function DynamicHeader({ className = '', cartItemCount = 0 }: DynamicHeaderProps) {
  const { isAuthenticated, isClientRoute } = useDynamicHeaderState();
  
  if (isAuthenticated && isClientRoute) {
    if (window.location.pathname.includes('/kitchen')) {
      return (
        <KitchenHeader
          className={className}
        />
      );
    }

    if (window.location.pathname.includes('/manager')) {
      return (
        <ManagerHeader
          className={className}
        />
      );
    }

    if (window.location.pathname.includes('/front-desk')) {
      return (
        <FrontDeskHeader
          className={className}
        />
      );
    }

    return (
      <ClientHeader 
        user={mockCurrentUser[2]} 
        className={className} 
        cartItemCount={cartItemCount} 
      />
    );
  }
  
  return <DefaultHeader className={className} />;
}
