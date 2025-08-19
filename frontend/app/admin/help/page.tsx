'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { HelpCircle, MessageSquare, Book, Video, Search, Send, ExternalLink, Phone, Mail, Clock } from 'lucide-react';

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [message, setMessage] = useState('');

  const helpCategories = [
    {
      title: 'Getting Started',
      description: 'Basic setup and navigation',
      icon: Book,
      color: 'text-[#6B4E37]',
      articles: 5
    },
    {
      title: 'Staff Management',
      description: 'Managing employees and schedules',
      icon: MessageSquare,
      color: 'text-[#2CA6A4]',
      articles: 8
    },
    {
      title: 'Inventory & Orders',
      description: 'Stock management and ordering',
      icon: HelpCircle,
      color: 'text-[#E1B168]',
      articles: 12
    },
    {
      title: 'Reports & Analytics',
      description: 'Understanding your data',
      icon: Video,
      color: 'text-green-600',
      articles: 6
    }
  ];

  const popularArticles = [
    'How to add new staff members',
    'Managing inventory alerts',
    'Understanding sales reports',
    'Setting up user permissions',
    'Troubleshooting login issues',
    'Exporting data and reports'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Help & Support
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Find answers to your questions and get support
          </p>
        </div>
      </motion.div>

      {/* Search */}
      <Card className="bg-white dark:bg-gray-800 mb-8">
        <CardContent className="p-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for help articles, guides, or tutorials..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Help Categories */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Help Categories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {helpCategories.map((category, index) => (
                  <div 
                    key={index}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow-md transition-shadow cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <category.icon className={`h-6 w-6 ${category.color} mt-1`} />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white">
                          {category.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {category.description}
                        </p>
                        <Badge variant="secondary" className="mt-2">
                          {category.articles} articles
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Popular Articles */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Popular Articles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {popularArticles.map((article, index) => (
                  <div 
                    key={index}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors cursor-pointer"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {article}
                    </span>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Video Tutorials */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white">
                Video Tutorials
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <Video className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  Video tutorials coming soon
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  We&apos;re creating comprehensive video guides to help you get the most out of our platform.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Support Panel */}
        <div className="space-y-6">
          {/* Contact Support */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Contact Support
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Mail className="h-4 w-4" />
                  <span className="text-sm">support@astroneko.coffee</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Phone className="h-4 w-4" />
                  <span className="text-sm">+1 (555) 123-HELP</span>
                </div>
                <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm">Mon-Fri 9AM-6PM PST</span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                  Send us a message
                </h4>
                <Textarea
                  placeholder="Describe your issue or question..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                />
                <Button className="w-full mt-3 bg-[#6B4E37] hover:bg-[#5a3f2d] text-white">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                System Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Platform Status</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Operational
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">API Services</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Online
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">Database</span>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  Healthy
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Book className="h-4 w-4 mr-2" />
                Documentation
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Community Forum
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <ExternalLink className="h-4 w-4 mr-2" />
                Feature Requests
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
