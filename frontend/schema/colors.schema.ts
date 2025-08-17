export interface Color {
  hex: string;
  name: string;
}

export interface ColorCardProps {
  color: Color;
  onClick?: (hex: string) => void;
  isCopied?: boolean;
  isSelected?: boolean;
}
