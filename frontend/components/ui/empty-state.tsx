"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, WifiOff, Wrench, Construction } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  icon: Icon = AlertCircle,
  title,
  description,
  actionLabel,
  className
}: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center text-center py-8 sm:py-12 px-4 ${className}`}
    >
      <div className="w-12 h-12 sm:w-16 sm:h-16 bg-muted rounded-full flex items-center justify-center mb-3 sm:mb-4">
        <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-muted-foreground" />
      </div>
      <h3 className="text-base sm:text-lg font-semibold mb-2">{title}</h3>
      <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 max-w-md">{description}</p>
      {actionLabel && (
        <Button disabled variant="outline" size="sm">
          {actionLabel}
        </Button>
      )}
    </motion.div>
  );
}

export type ErrorType = 'backend-down' | 'maintenance' | 'feature-progress';

interface ErrorBannerProps {
  type: ErrorType;
  onDismiss?: () => void;
  className?: string;
}

const errorConfig: Record<ErrorType, {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  variant: 'default' | 'destructive';
}> = {
  'backend-down': {
    icon: WifiOff,
    title: 'Service Temporarily Unavailable',
    description: 'Our systems are experiencing issues. Please try again in a few moments.',
    variant: 'destructive'
  },
  'maintenance': {
    icon: Wrench,
    title: 'Scheduled Maintenance',
    description: 'We\'re performing scheduled maintenance. Some features may be temporarily unavailable.',
    variant: 'default'
  },
  'feature-progress': {
    icon: Construction,
    title: 'Feature Coming Soon',
    description: 'This feature is currently in development and will be available soon.',
    variant: 'default'
  }
};

export function ErrorBanner({ type, onDismiss, className }: ErrorBannerProps) {
  const config = errorConfig[type];
  const Icon = config.icon;

  return (
    <Alert variant={config.variant} className={className}>
      <Icon className="h-4 w-4" />
      <AlertDescription>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
          <div>
            <strong className="font-medium text-sm">{config.title}</strong>
            <div className="text-xs sm:text-sm">{config.description}</div>
          </div>
          {onDismiss && (
            <Button variant="ghost" size="sm" onClick={onDismiss} className="self-start sm:self-auto">
              Dismiss
            </Button>
          )}
        </div>
      </AlertDescription>
    </Alert>
  );
}

// Error state components for specific scenarios
export function BackendDownState() {
  return (
    <EmptyState
      icon={WifiOff}
      title="Service Unavailable"
      description="Unable to connect to our servers. Please check your connection and try again."
      actionLabel="Retry"
    />
  );
}

export function MaintenanceState() {
  return (
    <EmptyState
      icon={Wrench}
      title="Under Maintenance"
      description="We're currently performing system maintenance. Please check back shortly."
      actionLabel="Refresh Page"
    />
  );
}

export function FeatureInProgressState() {
  return (
    <EmptyState
      icon={Construction}
      title="Coming Soon"
      description="This feature is currently being developed and will be available in a future update."
      actionLabel="Go Back"
    />
  );
}
