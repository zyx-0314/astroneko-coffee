'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { CreateRequestModal } from '@/components/modals';
import { 
  MessageSquare, 
  Filter, 
  Search,
  Plus,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  User,
  Calendar,
  MessageCircle
} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Request {
  id: string;
  title: string;
  description: string;
  category: 'maintenance' | 'supplies' | 'schedule' | 'policy' | 'technical' | 'other';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  status: 'pending' | 'in-progress' | 'completed' | 'rejected';
  submittedBy: string;
  submittedAt: string;
  assignedTo?: string;
  dueDate?: string;
  tags: string[];
}

const mockRequests: Request[] = [
  {
    id: 'REQ-001',
    title: 'Coffee Machine Maintenance',
    description: 'The espresso machine in station 2 is making unusual noises and needs immediate attention.',
    category: 'maintenance',
    priority: 'high',
    status: 'pending',
    submittedBy: 'Sarah Chen',
    submittedAt: '2025-08-20T09:30:00Z',
    dueDate: '2025-08-22T17:00:00Z',
    tags: ['equipment', 'urgent', 'kitchen']
  },
  {
    id: 'REQ-002',
    title: 'Schedule Change Request',
    description: 'Request to switch shifts with John for next weekend due to family commitment.',
    category: 'schedule',
    priority: 'medium',
    status: 'in-progress',
    submittedBy: 'Mike Rodriguez',
    submittedAt: '2025-08-19T14:15:00Z',
    assignedTo: 'Manager Smith',
    tags: ['schedule', 'swap']
  },
  {
    id: 'REQ-003',
    title: 'New Menu Item Proposal',
    description: 'Proposal to add seasonal pumpkin spice variations to our fall menu.',
    category: 'other',
    priority: 'low',
    status: 'completed',
    submittedBy: 'Emily Johnson',
    submittedAt: '2025-08-18T11:00:00Z',
    assignedTo: 'Chef Davis',
    tags: ['menu', 'seasonal', 'approved']
  },
  {
    id: 'REQ-004',
    title: 'Supply Inventory Low',
    description: 'Running low on oat milk and vanilla syrup. Need urgent restocking.',
    category: 'supplies',
    priority: 'urgent',
    status: 'pending',
    submittedBy: 'Alex Thompson',
    submittedAt: '2025-08-20T07:45:00Z',
    dueDate: '2025-08-21T12:00:00Z',
    tags: ['supplies', 'inventory', 'urgent']
  }
];

const categoryConfig = {
  maintenance: { label: 'Maintenance', color: 'bg-orange-100 text-orange-800', icon: AlertTriangle },
  supplies: { label: 'Supplies', color: 'bg-blue-100 text-blue-800', icon: MessageSquare },
  schedule: { label: 'Schedule', color: 'bg-green-100 text-green-800', icon: Calendar },
  policy: { label: 'Policy', color: 'bg-purple-100 text-purple-800', icon: MessageCircle },
  technical: { label: 'Technical', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
  other: { label: 'Other', color: 'bg-gray-100 text-gray-800', icon: MessageSquare }
};

const priorityConfig = {
  low: { label: 'Low', color: 'bg-gray-100 text-gray-800' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  high: { label: 'High', color: 'bg-orange-100 text-orange-800' },
  urgent: { label: 'Urgent', color: 'bg-red-100 text-red-800' }
};

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  'in-progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-800', icon: MessageCircle },
  completed: { label: 'Completed', color: 'bg-green-100 text-green-800', icon: CheckCircle },
  rejected: { label: 'Rejected', color: 'bg-red-100 text-red-800', icon: XCircle }
};

export default function RequestsPage() {
  const [requests, setRequests] = useState<Request[]>(mockRequests);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleCreateRequest = (requestData: any) => {
    setRequests([requestData as Request, ...requests]);
  };

  const filteredRequests = requests.filter(request => {
    const matchesSearch = request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || request.category === categoryFilter;
    const matchesPriority = priorityFilter === 'all' || request.priority === priorityFilter;
    
    return matchesSearch && matchesStatus && matchesCategory && matchesPriority;
  });



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-8 w-8 text-[#6B4E37]" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Staff Requests
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Manage and track staff requests, maintenance issues, and operational needs
              </p>
            </div>
          </div>
          
          <Button 
            onClick={() => setIsNewRequestOpen(true)}
            className="bg-[#6B4E37] hover:bg-[#5a3d2a] text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Request
          </Button>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Filter className="h-5 w-5" />
              Filters
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search requests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  {Object.entries(statusConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {Object.entries(categoryConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All Priorities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  {Object.entries(priorityConfig).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Requests List */}
      <div className="space-y-4">
        {filteredRequests.map((request, index) => (
          <motion.div
            key={request.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + index * 0.05 }}
          >
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {request.title}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {request.id}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {request.description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      <Badge className={categoryConfig[request.category].color}>
                        {categoryConfig[request.category].label}
                      </Badge>
                      <Badge className={priorityConfig[request.priority].color}>
                        {priorityConfig[request.priority].label}
                      </Badge>
                      <Badge className={statusConfig[request.status].color}>
                        {React.createElement(statusConfig[request.status].icon, { className: "h-3 w-3 mr-1" })}
                        {statusConfig[request.status].label}
                      </Badge>
                      {request.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center gap-1">
                        <User className="h-4 w-4" />
                        <span>{request.submittedBy}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(request.submittedAt)}</span>
                      </div>
                      {request.assignedTo && (
                        <div className="flex items-center gap-1">
                          <span>Assigned to: {request.assignedTo}</span>
                        </div>
                      )}
                      {request.dueDate && (
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          <span>Due: {formatDate(request.dueDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-center gap-2 ml-4">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    {request.status === 'pending' && (
                      <Button size="sm" className="bg-[#6B4E37] hover:bg-[#5a3d2a]">
                        Take Action
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredRequests.length === 0 && (
        <div className="text-center py-12">
          <MessageSquare className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No requests found
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Try adjusting your filters or create a new request.
          </p>
        </div>
      )}

      {/* Create Request Modal */}
      <CreateRequestModal
        isOpen={isNewRequestOpen}
        onClose={() => setIsNewRequestOpen(false)}
        onSubmit={handleCreateRequest}
      />
    </div>
  );
}
