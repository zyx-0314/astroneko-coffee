export interface TypographyProps {
  className?: string;
}

export interface TypographyExample {
  tag: string;
  size: string;
  text: string;
  description: string;
}

export interface TypographySection {
  title: string;
  font: string;
  examples: TypographyExample[];
}
