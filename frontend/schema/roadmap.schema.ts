export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'in-progress' | 'planned';
  category: 'authentication' | 'admin' | 'frontend' | 'backend' | 'mobile' | 'analytics';
  priority: 'high' | 'medium' | 'low';
  quarter: string;
  progress: number;
  features: string[];
}

export interface FuturePhase {
  phase: string;
  title: string;
  quarter: string;
  items: string[];
  color: string;
}

export interface RoadmapStats {
  completed: number;
  inProgress: number;
  planned: number;
  total: number;
}

export interface CategoryFilter {
  key: string;
  label: string;
  icon: any;
  color?: string;
}

export interface StatusFilter {
  key: string;
  label: string;
  icon: any;
  color?: string;
}
