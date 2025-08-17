import { useState } from 'react';

export const useColorPalette = () => {
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);

  const copyToClipboard = async (colorHex: string) => {
    try {
      await navigator.clipboard.writeText(colorHex);
      setCopiedColor(colorHex);
      setTimeout(() => setCopiedColor(null), 2000);
    } catch (err) {
      console.error('Failed to copy color:', err);
    }
  };

  const selectColor = (colorHex: string) => {
    setSelectedColor(colorHex);
  };

  return {
    selectedColor,
    copiedColor,
    copyToClipboard,
    selectColor
  };
};
