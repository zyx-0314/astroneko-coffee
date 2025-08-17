"use client";

import { useState } from 'react';
import { TypographySection } from '@/schema/typography.schema';

export function useTypographyState() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const headingSection: TypographySection = {
    title: "Heading",
    font: "Cormorant Garamond",
    examples: [
      { tag: "H1", size: "36px / 2.25rem", text: "Cormorant Garamond", description: "Primary heading for hero sections" },
      { tag: "H2", size: "30px / 1.875rem", text: "Premium Coffee Experience", description: "Section headings and page titles" },
      { tag: "H3", size: "24px / 1.5rem", text: "Artisanal Brewing Methods", description: "Subsection headings" },
      { tag: "H4", size: "20px / 1.25rem", text: "Ethiopian Single Origin", description: "Card titles and small headings" }
    ]
  };

  const bodySection: TypographySection = {
    title: "Body Text",
    font: "Inter",
    examples: [
      { tag: "Large", size: "18px / 1.125rem", text: "Discover our carefully curated selection of premium coffee beans sourced from the finest farms around the world.", description: "Lead paragraphs and important descriptions" },
      { tag: "Regular", size: "16px / 1rem", text: "Our master roasters bring out the unique characteristics of each origin through precise temperature control and timing.", description: "Standard body text for content" },
      { tag: "Small", size: "14px / 0.875rem", text: "Roasted fresh daily in small batches to ensure optimal flavor and aroma in every cup.", description: "Supporting text and captions" },
      { tag: "Caption", size: "12px / 0.75rem", text: "Available in 250g and 500g packages", description: "Labels, captions, and fine print" }
    ]
  };

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return {
    headingSection,
    bodySection,
    copiedText,
    copyToClipboard
  };
}
