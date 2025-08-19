import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useDemoAccountCard } from './DemoAccountCard.hook';

interface DemoAccount {
  email: string;
  role: string;
  displayName: string;
  variant?: 'default' | 'primary' | 'secondary' | 'outline';
}

interface DemoAccountCardProps {
  onDemoLogin: (email: string) => void;
  className?: string;
}

const demoAccounts: DemoAccount[] = [
  {
    email: 'john.smith@example.com',
    role: 'client',
    displayName: 'Client (1250 pts)',
    variant: 'outline'
  },
  {
    email: 'jane.doe@example.com',
    role: 'client',
    displayName: 'Client (890 pts)',
    variant: 'outline'
  },
  {
    email: 'alex.thompson@astroneko.com',
    role: 'manager',
    displayName: 'Manager',
    variant: 'secondary'
  },
  {
    email: 'sarah.johnson@astroneko.com',
    role: 'cashier',
    displayName: 'Cashier',
    variant: 'outline'
  },
  {
    email: 'mike.rodriguez@astroneko.com',
    role: 'cook',
    displayName: 'Cook',
    variant: 'outline'
  },
  {
    email: 'emma.wilson@astroneko.com',
    role: 'barista',
    displayName: 'Barista',
    variant: 'outline'
  }
];

export default function DemoAccountCard({ onDemoLogin, className = '' }: DemoAccountCardProps) {
  const { handleDemoLogin } = useDemoAccountCard(onDemoLogin);

  return (
    <div className={`space-y-3 ${className}`}>
      <Label className="text-sm font-medium text-muted-foreground">
        🚀 Quick Demo Access
      </Label>
      <div className="grid grid-cols-2 gap-2">
        {demoAccounts.map((account) => (
          <Button
            key={account.email}
            type="button"
            variant={account.variant as any}
            size="sm"
            onClick={() => handleDemoLogin(account.email)}
            className="text-xs h-9 hover:scale-105 transition-transform duration-200"
          >
            {account.displayName}
          </Button>
        ))}
      </div>
      <p className="text-xs text-muted-foreground text-center">
        All demo accounts use password: <code className="font-mono bg-muted px-1 rounded">password123</code>
      </p>
    </div>
  );
}
