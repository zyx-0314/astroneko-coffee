import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlaceholderCardProps } from '@/schema/cards.schema';
import { FC } from "react";

const PlaceholderCard: FC<PlaceholderCardProps> = ({
  title,
  description,
  children,
  primaryButtonText,
  primaryButtonHref,
  secondaryButtonText,
  secondaryButtonHref,
  className = ''
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 max-w-2xl mx-auto ${className}`}>
      <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mb-6">
        {description}
      </p>
      {children}
      <div className="mt-8">
        <Button asChild className={secondaryButtonText ? "mr-4" : ""}>
          <Link href={primaryButtonHref}>
            {primaryButtonText}
          </Link>
        </Button>
        {secondaryButtonText && secondaryButtonHref && (
          <Button variant="outline" asChild>
            <Link href={secondaryButtonHref}>
              {secondaryButtonText}
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default PlaceholderCard;
