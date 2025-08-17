"use client";

import React from 'react';

export function MoodBoardTypography() {
  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Typography</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Heading Typography */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Heading</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">Cormorant Garamond</div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h1 className="text-4xl font-serif text-gray-900 dark:text-white leading-tight">
                Cormorant Garamond
              </h1>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">H1 - 36px / 2.25rem</div>
            </div>
            
            <div>
              <h2 className="text-3xl font-serif text-gray-900 dark:text-white leading-tight">
                Premium Coffee Experience
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">H2 - 30px / 1.875rem</div>
            </div>
            
            <div>
              <h3 className="text-2xl font-serif text-gray-900 dark:text-white leading-tight">
                Artisanal Brewing Methods
              </h3>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">H3 - 24px / 1.5rem</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.58L19 8l-9 9z"/>
                </svg>
                Google
              </span>
              <span className="text-gray-400">•</span>
              <span>Free</span>
            </div>
          </div>
        </div>

        {/* Body Typography */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">Body</h3>
            <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">Cantarell</div>
          </div>
          
          <div className="space-y-6">
            <div>
              <p className="text-lg text-gray-900 dark:text-white leading-relaxed font-sans">
                Cantarell Regular
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Large - 18px / 1.125rem</div>
            </div>
            
            <div>
              <p className="text-base text-gray-900 dark:text-white leading-relaxed font-sans">
                Perfect for body text and descriptions. Clean, readable, and modern typography that complements our coffee brand aesthetic.
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Base - 16px / 1rem</div>
            </div>
            
            <div>
              <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed font-sans">
                Smaller text for captions, labels, and supplementary information throughout the application.
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">Small - 14px / 0.875rem</div>
            </div>
            
            <div>
              <p className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed font-sans">
                Extra small text for fine print, timestamps, and minimal details.
              </p>
              <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">XS - 12px / 0.75rem</div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
              <span className="inline-flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.58L19 8l-9 9z"/>
                </svg>
                Google
              </span>
              <span className="text-gray-400">•</span>
              <span>Free</span>
            </div>
          </div>
        </div>
      </div>

      {/* Typography Usage */}
      <div className="mt-8 p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Typography Usage</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2 font-serif text-gray-900 dark:text-white">Cormorant Garamond (Headings)</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Page titles and main headings</li>
              <li>• Section headers</li>
              <li>• Featured coffee names</li>
              <li>• Brand messaging</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 font-sans text-gray-900 dark:text-white">Cantarell (Body)</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
              <li>• Body text and descriptions</li>
              <li>• Navigation and UI elements</li>
              <li>• Form labels and inputs</li>
              <li>• Button text and captions</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
