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
import { CalendarIcon, MessageSquare, Send, X, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface CreateRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (requestData: RequestData) => void;
}

interface RequestData {
  id?: string;
  title: string;
  category: 'maintenance' | 'supplies' | 'schedule' | 'policy' | 'technical' | 'other';
  description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  dueDate?: Date;
  tags: string[];
  justification?: string;
  createdAt?: string;
  status?: string;
  submittedBy?: string;
}

const requestCategories = {
  maintenance: { label: 'Maintenance', color: 'bg-orange-100 text-orange-800', icon: AlertTriangle },
  supplies: { label: 'Supplies', color: 'bg-blue-100 text-blue-800', icon: MessageSquare },
  schedule: { label: 'Schedule Change', color: 'bg-green-100 text-green-800', icon: MessageSquare },
  policy: { label: 'Policy Request', color: 'bg-purple-100 text-purple-800', icon: MessageSquare },
  technical: { label: 'Technical Support', color: 'bg-red-100 text-red-800', icon: AlertTriangle },
  other: { label: 'Other', color: 'bg-gray-100 text-gray-800', icon: MessageSquare }
};

const priorityLevels = {
  low: { label: 'Low', color: 'bg-gray-100 text-gray-800' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  high: { label: 'High', color: 'bg-orange-100 text-orange-800' },
  urgent: { label: 'Urgent', color: 'bg-red-100 text-red-800' }
};

export default function CreateRequestModal({ isOpen, onClose, onSubmit }: CreateRequestModalProps) {
  const [requestData, setRequestData] = useState<RequestData>({
    title: '',
    category: 'other',
    description: '',
    priority: 'medium',
    tags: []
  });
  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddTag = () => {
    if (tagInput.trim() && !requestData.tags.includes(tagInput.trim())) {
      setRequestData({
        ...requestData,
        tags: [...requestData.tags, tagInput.trim()]
      });
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setRequestData({
      ...requestData,
      tags: requestData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const handleSubmit = async () => {
    if (!requestData.title || !requestData.description) return;
    
    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit({
          ...requestData,
          id: `REQ-${Date.now()}`,
          createdAt: new Date().toISOString(),
          status: 'pending',
          submittedBy: 'Current User' // This would come from auth context
        });
      }
      
      // Reset form
      setRequestData({
        title: '',
        category: 'other',
        description: '',
        priority: 'medium',
        tags: []
      });
      setTagInput('');
      onClose();
    } catch (error) {
      console.error('Error creating request:', error);
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
            <MessageSquare className="h-5 w-5 text-[#6B4E37]" />
            Submit New Request
          </DialogTitle>
          <DialogDescription>
            Submit a request for maintenance, supplies, schedule changes, or other operational needs.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Title and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Request Title *</label>
              <Input
                placeholder="Brief description of your request"
                value={requestData.title}
                onChange={(e) => setRequestData({ ...requestData, title: e.target.value })}
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Category *</label>
              <Select value={requestData.category} onValueChange={(value: RequestData['category']) => setRequestData({ ...requestData, category: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(requestCategories).map(([key, config]) => (
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
            <label className="text-sm font-medium mb-2 block">Detailed Description *</label>
            <Textarea
              placeholder="Provide detailed information about your request, including any specific requirements or background information..."
              value={requestData.description}
              onChange={(e) => setRequestData({ ...requestData, description: e.target.value })}
              rows={4}
            />
          </div>

          {/* Justification (for high priority requests) */}
          {(requestData.priority === 'high' || requestData.priority === 'urgent') && (
            <div>
              <label className="text-sm font-medium mb-2 block">
                Justification {requestData.priority === 'urgent' && '*'}
              </label>
              <Textarea
                placeholder="Please justify why this request has high/urgent priority..."
                value={requestData.justification || ''}
                onChange={(e) => setRequestData({ ...requestData, justification: e.target.value })}
                rows={2}
              />
            </div>
          )}

          {/* Priority and Due Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Priority Level</label>
              <Select value={requestData.priority} onValueChange={(value: RequestData['priority']) => setRequestData({ ...requestData, priority: value })}>
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
              <label className="text-sm font-medium mb-2 block">Needed By (Optional)</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !requestData.dueDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {requestData.dueDate ? format(requestData.dueDate, "PPP") : "Select date needed"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={requestData.dueDate}
                    onSelect={(date) => setRequestData({ ...requestData, dueDate: date })}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          {/* Tags */}
          <div>
            <label className="text-sm font-medium mb-2 block">Tags</label>
            <div className="flex gap-2 mb-2">
              <Input
                placeholder="Add relevant tags (press Enter)"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <Button type="button" onClick={handleAddTag} variant="outline">
                Add
              </Button>
            </div>
            {requestData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {requestData.tags.map((tag) => (
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

          {/* Request Examples */}
          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <h4 className="font-medium mb-2 text-blue-900 dark:text-blue-100">Request Examples</h4>
            <div className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <p><strong>Maintenance:</strong> &quot;Coffee machine making unusual noises&quot;</p>
              <p><strong>Supplies:</strong> &quot;Running low on oat milk and vanilla syrup&quot;</p>
              <p><strong>Schedule:</strong> &quot;Need to swap shifts with John next weekend&quot;</p>
              <p><strong>Technical:</strong> &quot;POS system freezing during peak hours&quot;</p>
            </div>
          </div>

          {/* Preview */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
            <h4 className="font-medium mb-2">Preview</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <Badge className={requestCategories[requestData.category].color}>
                  {requestCategories[requestData.category].label}
                </Badge>
                <Badge className={priorityLevels[requestData.priority].color}>
                  {priorityLevels[requestData.priority].label}
                </Badge>
              </div>
              <p className="font-medium">{requestData.title || 'Request Title'}</p>
              <p className="text-gray-600 dark:text-gray-400">
                {requestData.description || 'Request description...'}
              </p>
              {requestData.dueDate && (
                <p className="text-sm text-gray-500">
                  Needed by: {format(requestData.dueDate, "PPP")}
                </p>
              )}
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
            disabled={!requestData.title || !requestData.description || isSubmitting}
            className="bg-[#6B4E37] hover:bg-[#5a3d2a]"
          >
            <Send className="h-4 w-4 mr-2" />
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
