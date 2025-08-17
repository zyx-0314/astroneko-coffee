import { useState } from 'react';

export const useTypography = () => {
  const [selectedFont, setSelectedFont] = useState<string>('inter');
  const [fontSize, setFontSize] = useState<number>(16);

  return {
    selectedFont,
    setSelectedFont,
    fontSize,
    setFontSize
  };
};
