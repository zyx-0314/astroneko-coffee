'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from '@/components/ui/badge';
// Temporary interface to avoid any type
interface StaffMember {
  id: string;
  employeeId: string;
  name: string;
  email: string;
  role: string;
  status: string;
  shift: string;
  phone: string;
  lastActive: string;
  avatar?: string;
}
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, Edit, Trash2, Eye, Clock } from 'lucide-react';
import { useStaffTable } from './StaffTable.hook';

export default function StaffTable() {
  const { staffMembers, isLoading, handleEdit, handleDelete, handleView } = useStaffTable();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#6B4E37]"></div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { 
        label: 'Active', 
        className: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' 
      },
      break: { 
        label: 'On Break', 
        className: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300' 
      },
      offline: { 
        label: 'Off Duty', 
        className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300' 
      }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.offline;
    return (
      <Badge variant="secondary" className={config.className}>
        {config.label}
      </Badge>
    );
  };

  const getRoleBadge = (role: string) => {
    const roleConfig = {
      MANAGER: { 
        label: 'Manager', 
        className: 'bg-[#6B4E37] text-white' 
      },
      FRONT_DESK: { 
        label: 'Front Desk', 
        className: 'bg-[#2CA6A4] text-white' 
      },
      KITCHEN: { 
        label: 'Kitchen', 
        className: 'bg-[#E1B168] text-white' 
      },
      BARISTA: { 
        label: 'Barista', 
        className: 'bg-[#D4EDEC] text-gray-800' 
      }
    };

    const config = roleConfig[role as keyof typeof roleConfig] || { 
      label: role, 
      className: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300' 
    };
    
    return (
      <Badge className={config.className}>
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="border-gray-200 dark:border-gray-700">
            <TableHead className="text-gray-700 dark:text-gray-300">Staff Member</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Role</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Status</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Shift</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Contact</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300">Last Active</TableHead>
            <TableHead className="text-gray-700 dark:text-gray-300 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {staffMembers.map((staff: StaffMember, index: number) => (
            <motion.tr
              key={staff.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <TableCell>
                <div className="flex items-center space-x-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={staff.avatar} alt={staff.name} />
                    <AvatarFallback className="bg-[#6B4E37] text-white">
                      {staff.name.split(' ').map((n: string) => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">
                      {staff.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      ID: {staff.employeeId}
                    </div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                {getRoleBadge(staff.role)}
              </TableCell>
              <TableCell>
                {getStatusBadge(staff.status)}
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-1 text-sm text-gray-600 dark:text-gray-300">
                  <Clock className="h-4 w-4" />
                  <span>{staff.shift}</span>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  <div>{staff.phone}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">{staff.email}</div>
                </div>
              </TableCell>
              <TableCell>
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {staff.lastActive}
                </span>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                    <DropdownMenuItem onClick={() => handleView(staff.id)} className="cursor-pointer">
                      <Eye className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleEdit(staff.id)} className="cursor-pointer">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => handleDelete(staff.id)} 
                      className="cursor-pointer text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
