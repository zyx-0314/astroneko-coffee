export interface UIElementsProps {
  className?: string;
}

export interface ButtonExample {
  label: string;
  variant: 'primary' | 'secondary' | 'outline' | 'ghost';
  size: 'sm' | 'md' | 'lg';
}

export interface FormExample {
  type: 'input' | 'textarea' | 'select';
  placeholder: string;
  label: string;
}

export interface CardExample {
  title: string;
  description: string;
  image?: string;
  variant: 'default' | 'featured' | 'compact';
}

export interface LogoExample {
  size: 'small' | 'medium' | 'large';
  label: string;
  img: string;
}

export interface StarRating {
  rating: 1 | 2 | 3 | 4 | 5;
  label: string;
}

export interface ToggleExample {
  id: string;
  label: string;
  checked: boolean;
}

export interface BadgeExample {
  label: string;
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'neutral';
  color: string;
}
