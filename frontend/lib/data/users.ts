import { User } from '@/schema/user.schema';

export type { User };
export const users: User[] = [
  // Staff members
  {
    id: '1',
    name: 'Alex Johnson',
    email: 'alex.johnson@astroneko.com',
    role: 'cashier',
    avatar: '/placeholder/user/Male.png',
    shift: { start: '08:00', clockInTime: '07:55' }
  },
  {
    id: '2',
    name: 'Sarah Chen',
    email: 'sarah.chen@astroneko.com',
    role: 'helper',
    avatar: '/placeholder/user/Female.png',
    shift: { start: '09:00', clockInTime: '08:58' }
  },
  {
    id: '3',
    name: 'Mike Rodriguez',
    email: 'mike.rodriguez@astroneko.com',
    role: 'cook',
    avatar: '/placeholder/user/Male.png',
    shift: { start: '07:30', clockInTime: '07:25' },
    isActive: true
  },
  {
    id: '4',
    name: 'Emma Wilson',
    email: 'emma.wilson@astroneko.com',
    role: 'barista',
    avatar: '/placeholder/user/Female.png',
    shift: { start: '08:30', clockInTime: '08:35' },
    isActive: true
  },
  {
    id: '5',
    name: 'David Kim',
    email: 'david.kim@astroneko.com',
    role: 'manager',
    avatar: '/placeholder/user/Male.png',
    shift: { start: '07:00', clockInTime: '06:55' }
  },
  {
    id: '6',
    name: 'Lisa Thompson',
    email: 'lisa.thompson@astroneko.com',
    role: 'owner',
    avatar: '/placeholder/user/Female.png',
    shift: { start: '08:00', clockInTime: '07:45' }
  },
  // Clients
  {
    id: '7',
    name: 'John Smith',
    email: 'john.smith@example.com',
    role: 'client',
    avatar: '/placeholder/user/Male.png',
    points: 1250
  },
  {
    id: '8',
    name: 'Maria Garcia',
    email: 'maria.garcia@example.com',
    role: 'client',
    avatar: '/placeholder/user/Female.png',
    points: 890
  },
  {
    id: '9',
    name: 'Tom Wilson',
    email: 'tom.wilson@example.com',
    role: 'client',
    avatar: '/placeholder/user/Male.png',
    points: 2100
  },
  {
    id: '10',
    name: 'Amy Lee',
    email: 'amy.lee@example.com',
    role: 'client',
    avatar: '/placeholder/user/Female.png',
    points: 750
  }
];

export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

export function getUserByRole(role: User['role']): User[] {
  return users.filter(user => user.role === role);
}

export function getKitchenStaff(): User[] {
  return users.filter(user => (user.role === 'cook' || user.role === 'barista') && user.isActive);
}
