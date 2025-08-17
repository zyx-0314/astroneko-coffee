"use client";

import { FC } from 'react';
import { Color } from '@/schema/colors.schema';
import { useColorPalette } from './Colors.hook';

const MoodBoardColors: FC = () => {
  const { selectedColor, copiedColor, copyToClipboard, selectColor } = useColorPalette();

  const brandColors: Color[] = [
    { hex: "#6B4E37", name: "Shingle Fawn" },
    { hex: "#2CA6A4", name: "Jungle Green" }, 
    { hex: "#E1B168", name: "Equator" },
    { hex: "#D4EDEC", name: "Light Mint" }
  ];

  const neutralColors: Color[] = [
    { hex: "#F8F9FA", name: "Light Gray" },
    { hex: "#E9ECEF", name: "Gray 100" },
    { hex: "#6C757D", name: "Gray 500" },
    { hex: "#343A40", name: "Gray 800" },
    { hex: "#212529", name: "Almost Black" }
  ];

  const renderColorCard = (color: Color, index: number) => (
    <div
      key={index}
      className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
      onClick={() => {
        copyToClipboard(color.hex);
        selectColor(color.hex);
      }}
    >
      <div
        className="h-32 w-full transition-transform duration-300 group-hover:scale-105"
        style={{ backgroundColor: color.hex }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
      <div className="p-4 bg-white dark:bg-gray-800">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
          {color.name}
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
          {color.hex}
        </p>
        {copiedColor === color.hex && (
          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
            Copied!
          </p>
        )}
        {selectedColor === color.hex && (
          <div className="absolute top-2 right-2 w-4 h-4 bg-green-500 rounded-full shadow-md">
            <div className="absolute inset-1 bg-white rounded-full" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Color Palette
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Click any color to copy its hex code to your clipboard.
        </p>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Brand Colors
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {brandColors.map(renderColorCard)}
        </div>
      </div>

      <div>
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Neutral Palette
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {neutralColors.map(renderColorCard)}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Usage Guidelines
        </h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Primary Brand Colors:</h4>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li><strong>Shingle Fawn (#6B4E37):</strong> Coffee warmth, earthy comfort</li>
              <li><strong>Jungle Green (#2CA6A4):</strong> Alien mystique, cosmic energy</li>
              <li><strong>Equator (#E1B168):</strong> Golden accents, premium feel</li>
              <li><strong>Light Mint (#D4EDEC):</strong> Fresh, clean background tones</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">Best Practices:</h4>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>Use brand colors for primary elements and calls-to-action</li>
              <li>Apply neutrals for text, backgrounds, and supporting elements</li>
              <li>Maintain sufficient contrast ratios for accessibility</li>
              <li>Consider dark mode variants for all color applications</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoodBoardColors;
