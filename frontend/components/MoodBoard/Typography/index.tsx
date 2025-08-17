"use client";

import { Button } from '@/components/ui/button';
import { useTypographyState } from './Typography.hook';
import { TypographyProps } from '@/schema/typography.schema';

export default function MoodBoardTypography({ className }: TypographyProps) {
  const { headingSection, bodySection, copiedText, copyToClipboard } = useTypographyState();

  const renderTypographySection = (section: typeof headingSection) => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{section.title}</h3>
        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{section.font}</div>
      </div>
      
      <div className="space-y-6">
        {section.examples.map((example, index) => (
          <div key={index}>
            <div 
              className={`text-gray-900 dark:text-white leading-tight ${
                section.title === 'Heading' 
                  ? `font-serif ${
                      example.tag === 'H1' ? 'text-4xl' :
                      example.tag === 'H2' ? 'text-3xl' :
                      example.tag === 'H3' ? 'text-2xl' : 'text-xl'
                    }`
                  : `font-sans ${
                      example.tag === 'Large' ? 'text-lg' :
                      example.tag === 'Regular' ? 'text-base' :
                      example.tag === 'Small' ? 'text-sm' : 'text-xs'
                    }`
              }`}
            >
              {example.text}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-2">{example.tag} - {example.size}</div>
            <div className="text-xs text-gray-400 dark:text-gray-500 mt-1">{example.description}</div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => copyToClipboard(example.text)}
              className="mt-2 text-xs"
            >
              {copiedText === example.text ? '✓ Copied' : 'Copy Text'}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <section className={className}>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">Typography</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {renderTypographySection(headingSection)}
        {renderTypographySection(bodySection)}
      </div>

      {/* Usage Guidelines */}
      <div className="mt-8 bg-white dark:bg-gray-800 rounded-xl p-8 border border-gray-200 dark:border-gray-700">
        <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-white">Typography Guidelines</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Cormorant Garamond (Headings)</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Elegant serif for brand presence</li>
              <li>• Use for headlines and titles</li>
              <li>• Maintains readability at large sizes</li>
              <li>• Creates sophisticated, premium feel</li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-2 text-gray-900 dark:text-white">Inter (Body Text)</h4>
            <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>• Clean sans-serif for readability</li>
              <li>• Optimized for screens and long reading</li>
              <li>• Excellent legibility at small sizes</li>
              <li>• Modern, approachable character</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
