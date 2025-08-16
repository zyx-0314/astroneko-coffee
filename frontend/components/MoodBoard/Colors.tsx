"use client";

import React from 'react';

interface Color {
  hex: string;
  name: string;
}

export function MoodBoardColors() {
  const neutralColors: Color[] = [
    { hex: "#F8F9FA", name: "Light Gray" },
    { hex: "#E9ECEF", name: "Gray 100" },
    { hex: "#6C757D", name: "Gray 500" },
    { hex: "#343A40", name: "Gray 800" },
    { hex: "#212529", name: "Almost Black" }
  ];

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Colors</h2>
        <div className="flex items-center gap-2 px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-sm">
          🎨 Shuffle
          <span className="text-xs opacity-70">C</span>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Neutrals Palette */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-3">Neutrals</h3>
          <div className="space-y-1">
            {neutralColors.map((color, index) => (
              <div 
                key={index}
                className="h-12 rounded-lg border border-gray-200 dark:border-gray-700"
                style={{ backgroundColor: color.hex }}
                title={`${color.name} - ${color.hex}`}
              />
            ))}
          </div>
        </div>

        {/* Shingle Fawn - Main Color */}
        <div className="bg-gradient-to-br from-[#6B4E37] to-[#5A3E2A] rounded-xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-medium mb-2">Shingle Fawn</h3>
            <div className="text-sm opacity-90 mb-4">Main</div>
            <div className="text-xs font-mono">#6B4E37</div>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-8 translate-y-8" />
        </div>

        {/* Jungle Green */}
        <div className="bg-gradient-to-br from-[#2CA6A4] to-[#238A88] rounded-xl p-6 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-medium mb-2">Jungle Green</h3>
            <div className="text-xs font-mono">#2CA6A4</div>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-8 translate-y-8" />
        </div>

        {/* Equator */}
        <div className="bg-gradient-to-br from-[#E1B168] to-[#D4A356] rounded-xl p-6 text-gray-800 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-lg font-medium mb-2">Equator</h3>
            <div className="text-xs font-mono">#E1B168</div>
          </div>
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/20 rounded-full translate-x-8 translate-y-8" />
        </div>
      </div>

      {/* Color Usage Guidelines */}
      <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Color Usage Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full bg-[#6B4E37]" />
              <span className="font-medium text-gray-900 dark:text-white">Primary (Shingle Fawn)</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Brand headers, primary buttons, coffee-related elements</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full bg-[#2CA6A4]" />
              <span className="font-medium text-gray-900 dark:text-white">Accent (Jungle Green)</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Success states, fresh ingredients, eco-friendly features</p>
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-4 h-4 rounded-full bg-[#E1B168]" />
              <span className="font-medium text-gray-900 dark:text-white">Highlight (Equator)</span>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">Warm accents, premium items, special offers</p>
          </div>
        </div>
      </div>
    </section>
  );
}
