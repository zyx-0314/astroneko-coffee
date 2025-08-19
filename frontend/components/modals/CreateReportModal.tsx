'use client';

import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarIcon, FileText, Send, X } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface CreateReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (reportData: ReportData) => void;
}

interface ReportData {
  id?: string;
  title: string;
  type: 'daily' | 'weekly' | 'monthly' | 'incident' | 'maintenance' | 'performance';
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  department: 'kitchen' | 'front-desk' | 'management' | 'all';
  dueDate?: Date;
  tags: string[];
  attachments?: string[];
  createdAt?: string;
  status?: string;
}

const reportTypes = {
  daily: { label: 'Daily Report', color: 'bg-blue-100 text-blue-800' },
  weekly: { label: 'Weekly Report', color: 'bg-green-100 text-green-800' },
  monthly: { label: 'Monthly Report', color: 'bg-purple-100 text-purple-800' },
  incident: { label: 'Incident Report', color: 'bg-red-100 text-red-800' },
  maintenance: { label: 'Maintenance Report', color: 'bg-orange-100 text-orange-800' },
  performance: { label: 'Performance Report', color: 'bg-indigo-100 text-indigo-800' }
};

const priorityLevels = {
  low: { label: 'Low', color: 'bg-gray-100 text-gray-800' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  high: { label: 'High', color: 'bg-orange-100 text-orange-800' },
  urgent: { label: 'Urgent', color: 'bg-red-100 text-red-800' }
};

const departments = {
  kitchen: { label: 'Kitchen' },
  'front-desk': { label: 'Front Desk' },
  management: { label: 'Management' },
  all: { label: 'All Departments' }
};

export default function CreateReportModal({ isOpen, onClose, onSubmit }: CreateReportModalProps) {
  const [reportData, setReportData] = useState<ReportData>({
    title: '',
    type: 'daily',
    description: '',
    priority: 'medium',
    department: 'all',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !reportData.tags.includes(tagInput.trim())) {
      setReportData({
        ...reportData,
        tags: [...reportData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setReportData({
      ...reportData,
      tags: reportData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = async () => {
    if (!reportData.title || !reportData.description) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit({
          ...reportData,
          id: `RPT-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: 'draft'
        });
      }
      
      // Reset form
      setReportData({
        title: '',
        type: 'daily',
        description: '',
        priority: 'medium',
        department: 'all',
        tags: []
      });
      setTagInput('');
      onClose();
    } catch (error) {
      console.error('Error creating report:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#6B4E37]" />
            Create New Report
          </DialogTitle>
          <DialogDescription>
            Create a detailed report for tracking, documentation, or analysis purposes.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title and Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Report Title *</label>
              <Input
                placeholder="Enter report title"
                value={reportData.title}
                onChange={(e) => setReportData({ ...reportData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Report Type *</label>
              <Select value={reportData.type} onValueChange={(value: ReportData['type']) => setReportData({ ...reportData, type: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(reportTypes).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-sm font-medium mb-2 block">Description *</label>
            <Textarea
              placeholder="Provide detailed information about this report..."
              value={reportData.description}
              onChange={(e) => setReportData({ ...reportData, description: e.target.value })}
              rows={4}
            />
          </div>

          {/* Priority and Department */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Priority Level</label>
              <Select value={reportData.priority} onValueChange={(value: ReportData['priority']) => setReportData({ ...reportData, priority: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(priorityLevels).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Department</label>
              <Select value={reportData.department} onValueChange={(value: ReportData['department']) => setReportData({ ...reportData, department: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(departments).map(([key, config]) => (
                    <SelectItem key={key} value={key}>
                      {config.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Due Date */}
          <div>
            <label className="text-sm font-medium mb-2 block">Due Date (Optional)</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !reportData.dueDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {reportData.dueDate ? format(reportData.dueDate, "PPP") : "Select due date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={reportData.dueDate}
                  onSelect={(date) => setReportData({ ...reportData, dueDate: date })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium mb-2 block">Tags</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add tags (press Enter)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            {reportData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {reportData.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="flex items-center gap-1">
                    {tag}
                    <X
                      className="h-3 w-3 cursor-pointer hover:text-red-500"
                      onClick={() => handleRemoveTag(tag)}
                    />
                  </Badge>
                ))}
              </div>
            )}
          </div>

          {/* Preview */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium mb-2">Preview</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Badge className={reportTypes[reportData.type].color}>
                  {reportTypes[reportData.type].label}
                </Badge>
                <Badge className={priorityLevels[reportData.priority].color}>
                  {priorityLevels[reportData.priority].label}
                </Badge>
              </div>
              <p className="font-medium">{reportData.title || 'Report Title'}</p>
              <p className="text-gray-600 dark:text-gray-400">
                {reportData.description || 'Report description...'}
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-2 pt-4 border-t">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button 
            onClick={handleSubmit}
            disabled={!reportData.title || !reportData.description || isSubmitting}
            className="bg-[#6B4E37] hover:bg-[#5a3d2a]"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Creating...' : 'Create Report'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
