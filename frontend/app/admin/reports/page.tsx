'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RoleGuard } from '@/components/guards';
import { staffRoles } from '@/lib/auth';
import { CreateReportModal } from '@/components/modals';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  FileText, 
  Plus, 
  BarChart3, 
  TrendingUp, 
  Calendar,
  Users,
  Clock,
  AlertTriangle
} from 'lucide-react';

interface ReportData {
  id?: string;
  title: string;
  type: string;
  description: string;
  priority: string;
  department: string;
  dueDate?: Date;
  tags: string[];
  createdAt?: string;
  status?: string;
}

export default function ReportsPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [reports, setReports] = useState<ReportData[]>([]);

  const handleCreateReport = (reportData: ReportData) => {
    setReports([reportData, ...reports]);
  };

  const reportStats = [
    {
      title: 'Total Reports',
      value: reports.length,
      icon: FileText,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Pending Review',
      value: reports.filter(r => r.status === 'draft').length,
      icon: Clock,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-100'
    },
    {
      title: 'This Month',
      value: reports.filter(r => {
        if (!r.createdAt) return false;
        const reportDate = new Date(r.createdAt);
        const currentDate = new Date();
        return reportDate.getMonth() === currentDate.getMonth() && 
               reportDate.getFullYear() === currentDate.getFullYear();
      }).length,
      icon: Calendar,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    {
      title: 'High Priority',
      value: reports.filter(r => r.priority === 'high' || r.priority === 'urgent').length,
      icon: AlertTriangle,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    }
  ];

  return (
    <RoleGuard allowedRoles={staffRoles}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-8"
          >
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                <BarChart3 className="h-8 w-8 text-[#6B4E37]" />
                Reports Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mt-1">
                Create, manage, and track operational reports
              </p>
            </div>
            <Button 
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-[#6B4E37] hover:bg-[#5a3d2a] text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create Report
            </Button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {reportStats.map((stat, index) => (
              <Card key={stat.title}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {stat.title}
                      </p>
                      <p className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </p>
                    </div>
                    <div className={`p-3 rounded-full ${stat.bgColor}`}>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>

          {/* Reports List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Recent Reports
                </CardTitle>
              </CardHeader>
              <CardContent>
                {reports.length > 0 ? (
                  <div className="space-y-4">
                    {reports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-medium text-gray-900 dark:text-white">
                              {report.title}
                            </h3>
                            <Badge variant="outline" className="text-xs">
                              {report.type}
                            </Badge>
                            <Badge variant="outline" className={
                              report.priority === 'urgent' ? 'bg-red-100 text-red-800' :
                              report.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                              report.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {report.priority}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                            {report.description}
                          </p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>Created: {report.createdAt ? new Date(report.createdAt).toLocaleDateString() : 'N/A'}</span>
                            <span>Department: {report.department}</span>
                            <span>Status: {report.status}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 ml-4">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      No reports yet
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      Create your first report to get started with tracking and documentation.
                    </p>
                    <Button 
                      onClick={() => setIsCreateModalOpen(true)}
                      className="bg-[#6B4E37] hover:bg-[#5a3d2a]"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create First Report
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* Create Report Modal */}
      <CreateReportModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateReport}
      />
    </RoleGuard>
  );
}
