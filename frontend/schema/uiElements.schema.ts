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
