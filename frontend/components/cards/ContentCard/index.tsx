import { ContentCardProps } from '@/schema/cards.schema';
import { FC } from 'react';

const ContentCard: FC<ContentCardProps> = ({ 
  title, 
  children, 
  className = '', 
  titleClassName = '' 
}) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 ${className}`}>
      <h2 className={`text-2xl font-semibold mb-6 text-center text-[#6B4E37] dark:text-[#E1B168] ${titleClassName}`}>
        {title}
      </h2>
      <div className="text-gray-600 dark:text-gray-400">
        {children}
      </div>
    </div>
  );
};

export default ContentCard;
