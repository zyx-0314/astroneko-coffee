import { InfoCardProps } from '@/schema/cards.schema';
import { FC } from 'react';

const InfoCard: FC<InfoCardProps> = ({ title, children, className = '' }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 ${className}`}>
      <h2 className="text-2xl font-semibold mb-4 text-[#6B4E37] dark:text-[#E1B168]">
        {title}
      </h2>
      <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {children}
      </div>
    </div>
  );
};

export default InfoCard;
