"use client";

import { FC } from "react";

import { Color } from "@/schema/colors.schema";

import { useColorPalette } from "./Colors.hook";

const MoodBoardColors: FC = () => {
  const { selectedColor, copiedColor, copyToClipboard, selectColor } =
    useColorPalette();

  const brandColors: Color[] = [
    { hex: "#6B4E37", name: "Shingle Fawn" },
    { hex: "#2CA6A4", name: "Jungle Green" },
    { hex: "#E1B168", name: "Equator" },
    { hex: "#D4EDEC", name: "Light Mint" },
  ];

  const neutralColors: Color[] = [
    { hex: "#F8F9FA", name: "Light Gray" },
    { hex: "#E9ECEF", name: "Gray 100" },
    { hex: "#6C757D", name: "Gray 500" },
    { hex: "#343A40", name: "Gray 800" },
    { hex: "#212529", name: "Almost Black" },
  ];

  const renderColorCard = (color: Color, index: number) => (
    <div
      key={index}
      className="group relative bg-white dark:bg-gray-800 shadow-md hover:shadow-lg rounded-lg overflow-hidden transition-all duration-300 cursor-pointer"
      onClick={() => {
        copyToClipboard(color.hex);
        selectColor(color.hex);
      }}
    >
      {/* Color Display Area */}
      <div
        className="relative border-0 w-full h-32 group-hover:scale-105 transition-transform duration-300"
        style={{
          backgroundColor: color.hex,
          minHeight: "8rem",
          width: "100%",
          display: "block",
        }}
      >
        {/* Visual confirmation overlay */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{ backgroundColor: color.hex }}
        />
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-black/10 group-hover:bg-black/40 transition-all duration-300 pointer-events-none" />

      {/* Color Info */}
      <div className="z-10 relative bg-white dark:bg-gray-800 p-4">
        <h3 className="mb-1 font-semibold text-gray-900 dark:text-white">
          {color.name}
        </h3>
        <p className="font-mono text-gray-600 dark:text-gray-400 text-sm uppercase">
          {color.hex}
        </p>
        {copiedColor === color.hex && (
          <p className="mt-1 font-medium text-green-600 dark:text-green-400 text-xs">
            Copied!
          </p>
        )}
        {selectedColor === color.hex && (
          <div className="top-2 right-2 z-20 absolute bg-green-500 shadow-md rounded-full w-4 h-4">
            <div className="absolute inset-1 bg-white rounded-full" />
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section className="space-y-8">
      <div>
        <h2 className="mb-2 font-bold text-gray-900 dark:text-white text-3xl">
          Color Palette
        </h2>
        <p className="mb-8 text-gray-600 dark:text-gray-400">
          Click any color to copy its hex code to your clipboard.
        </p>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-xl">
          Brand Colors
        </h3>
        <div className="gap-6 grid grid-cols-2 md:grid-cols-4">
          {brandColors.map(renderColorCard)}
        </div>
      </div>

      <div>
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-xl">
          Neutral Palette
        </h3>
        <div className="gap-6 grid grid-cols-2 md:grid-cols-5">
          {neutralColors.map(renderColorCard)}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 shadow-md p-6 rounded-lg">
        <h3 className="mb-4 font-semibold text-gray-900 dark:text-white text-xl">
          Usage Guidelines
        </h3>
        <div className="space-y-4 text-gray-600 dark:text-gray-400">
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              Primary Brand Colors:
            </h4>
            <ul className="space-y-1 mt-2 list-disc list-inside">
              <li>
                <strong>Shingle Fawn (#6B4E37):</strong> Coffee warmth, earthy
                comfort
              </li>
              <li>
                <strong>Jungle Green (#2CA6A4):</strong> Alien mystique, cosmic
                energy
              </li>
              <li>
                <strong>Equator (#E1B168):</strong> Golden accents, premium feel
              </li>
              <li>
                <strong>Light Mint (#D4EDEC):</strong> Fresh, clean background
                tones
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium text-gray-900 dark:text-white">
              Best Practices:
            </h4>
            <ul className="space-y-1 mt-2 list-disc list-inside">
              <li>Use brand colors for primary elements and calls-to-action</li>
              <li>
                Apply neutrals for text, backgrounds, and supporting elements
              </li>
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
