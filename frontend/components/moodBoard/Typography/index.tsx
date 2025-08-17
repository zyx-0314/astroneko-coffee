"use client";

import { TypographyProps } from '@/schema/typography.schema';

export default function MoodBoardTypography({ className }: TypographyProps) {
  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Typography System</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Headings Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Headings</h3>
          
          <div className="space-y-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Heading 1</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">text-4xl font-bold</p>
            </div>
            <div>
              <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">Heading 2</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">text-3xl font-semibold</p>
            </div>
            <div>
              <h3 className="text-2xl font-medium text-gray-900 dark:text-white">Heading 3</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">text-2xl font-medium</p>
            </div>
            <div>
              <h4 className="text-xl font-medium text-gray-900 dark:text-white">Heading 4</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">text-xl font-medium</p>
            </div>
          </div>
        </div>

        {/* Body Text Section */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold mb-6 text-gray-900 dark:text-white">Body Text</h3>
          
          <div className="space-y-4">
            <div>
              <p className="text-lg text-gray-900 dark:text-white">Large body text for emphasis</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">text-lg</p>
            </div>
            <div>
              <p className="text-base text-gray-900 dark:text-white">Regular body text for main content</p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">text-base</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-300">Small text for captions and metadata</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">text-sm</p>
            </div>
          </div>
        </div>
      </div>

      {/* Typography Guidelines */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Typography Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Font Family</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Primary: Inter (Sans-serif)<br />
              Monospace: JetBrains Mono for code
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Scale & Hierarchy</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Clear visual hierarchy using size, weight, and spacing to guide user attention through content.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
