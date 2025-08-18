import { MenuItem } from '@/schema/menuItem.schema';
import { OrderStatus, OrderItem, Order } from '@/schema/order.schema';
import { mockMenuItems } from './menu';

// Helper function to get menu item by ID
export const getMenuItemById = (id: string): MenuItem | undefined => {
  return mockMenuItems.find(item => item.id === id);
};

export const orders: Order[] = [
  {
    id: '1',
    queueNo: 1,
    customerName: 'John Smith',
    customerId: '7',
    items: [
      {
        menuItem: getMenuItemById('1')!,
        quantity: 2
      },
      {
        menuItem: getMenuItemById('2')!,
        quantity: 1
      }
    ],
    total: 10.73,
    status: ['PENDING'],
    placedAt: '2025-08-18T08:30:00.000Z',
    estimatedReady: '2025-08-18T08:40:00.000Z'
  },
  {
    id: '2',
    queueNo: 2,
    customerName: 'Emma Wilson',
    customerId: '4',
    items: [
      {
        menuItem: getMenuItemById('3')!,
        quantity: 1
      }
    ],
    total: 5.25,
    status: ['IN_PROGRESS'],
    placedAt: '2025-08-18T08:25:00.000Z',
    estimatedReady: '2025-08-18T08:35:00.000Z',
    assignedTo: '4'
  },
  {
    id: '3',
    queueNo: 3,
    customerName: 'Maria Garcia',
    customerId: '8',
    items: [
      {
        menuItem: getMenuItemById('4')!,
        quantity: 1,
        specialInstructions: 'Extra hot'
      },
      {
        menuItem: getMenuItemById('5')!,
        quantity: 2
      }
    ],
    total: 11.75,
    status: ['READY'],
    placedAt: '2025-08-18T08:20:00.000Z',
    estimatedReady: '2025-08-18T08:30:00.000Z',
    assignedTo: '3',
    completedBy: '3'
  },
  {
    id: '4',
    queueNo: 4,
    customerName: 'Tom Wilson',
    customerId: '9',
    items: [
      {
        menuItem: getMenuItemById('6')!,
        quantity: 3
      }
    ],
    total: 8.25,
    status: ['COMPLETE'],
    placedAt: '2025-08-18T08:15:00.000Z',
    completedBy: '1'
  },
  {
    id: '5',
    queueNo: 5,
    customerName: 'Amy Lee',
    customerId: '10',
    items: [
      {
        menuItem: getMenuItemById('7')!,
        quantity: 1
      },
      {
        menuItem: getMenuItemById('8')!,
        quantity: 1
      }
    ],
    total: 9.50,
    status: ['HAS_PROBLEM'],
    placedAt: '2025-08-18T08:35:00.000Z',
    notes: 'Customer requested non-dairy milk but we are out of oat milk'
  }
];

export const orderHistory: Order[] = [
  {
    id: 'HIST-001',
    queueNo: 0,
    customerName: 'John Smith',
    customerId: '7',
    items: [
      {
        menuItem: getMenuItemById('1')!,
        quantity: 1
      }
    ],
    total: 3.99,
    status: ['COMPLETE'],
    placedAt: '2025-08-17T14:20:00.000Z',
    completedBy: '2'
  },
  {
    id: 'HIST-002',
    queueNo: 0,
    customerName: 'John Smith',
    customerId: '7',
    items: [
      {
        menuItem: getMenuItemById('3')!,
        quantity: 1
      },
      {
        menuItem: getMenuItemById('6')!,
        quantity: 2
      }
    ],
    total: 10.75,
    status: ['COMPLETE'],
    placedAt: '2025-08-16T09:45:00.000Z',
    completedBy: '1'
  },
  {
    id: 'HIST-003',
    queueNo: 0,
    customerName: 'John Smith',
    customerId: '7',
    items: [
      {
        menuItem: getMenuItemById('4')!,
        quantity: 2
      }
    ],
    total: 7.50,
    status: ['COMPLETE'],
    placedAt: '2025-08-15T16:30:00.000Z',
    completedBy: '4'
  }
];

export function getOrdersByCustomer(customerId: string): Order[] {
  return orderHistory.filter(order => order.customerId === customerId);
}

export function getOrderById(orderId: string): Order | undefined {
  return [...orders, ...orderHistory].find(order => order.id === orderId);
}

export function getPendingOrders(): Order[] {
  return orders.filter(order => order.status.includes('PENDING'));
}

export function getInProgressOrders(): Order[] {
  return orders.filter(order => order.status.includes('IN_PROGRESS'));
}

export function getReadyOrders(): Order[] {
  return orders.filter(order => order.status.includes('READY'));
}

export function getOrdersWithProblems(): Order[] {
  return orders.filter(order => order.status.includes('HAS_PROBLEM'));
}

export function getOrdersByStaff(staffId: string): Order[] {
  return orders.filter(order => order.assignedTo === staffId);
}
