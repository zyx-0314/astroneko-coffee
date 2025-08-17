import { FeatureCardProps } from '@/schema/cards.schema';
import { FC } from 'react';

const FeatureCard: FC<FeatureCardProps> = ({ icon, title, description, className = '' }) => {
  return (
    <div className={`text-center ${className}`}>
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
