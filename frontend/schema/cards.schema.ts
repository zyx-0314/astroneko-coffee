export interface InfoCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

export interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
  className?: string;
}

export interface ContentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export interface PlaceholderCardProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  primaryButtonText: string;
  primaryButtonHref: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  className?: string;
}
