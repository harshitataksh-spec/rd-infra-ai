import React from 'react';
import rdInfraLogoImg from '../assets/images/rd_infra_logo_1789137049609.jpg';

export interface RDInfraLogoProps {
  className?: string;
  imgClassName?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark';
  showTagline?: boolean;
}

export const RDInfraLogo: React.FC<RDInfraLogoProps> = ({
  className = '',
  imgClassName = '',
  size = 'md',
  variant = 'light',
}) => {
  // Height configurations that keep the uploaded logo crisp, prominent, and intact
  const sizeClasses = {
    sm: 'h-10 sm:h-11 max-h-11',
    md: 'h-14 sm:h-16 lg:h-18 max-h-20',
    lg: 'h-20 sm:h-24 max-h-24',
    xl: 'h-28 sm:h-32 max-h-32',
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <div
        className={
          variant === 'dark'
            ? 'bg-white rounded-xl p-1.5 shadow-sm inline-flex items-center justify-center'
            : 'inline-flex items-center'
        }
      >
        <img
          src={rdInfraLogoImg}
          alt="RD INFRA - Building Better Tomorrows"
          referrerPolicy="no-referrer"
          onError={(e) => {
            if (e.currentTarget.src !== '/logo.jpg') {
              e.currentTarget.src = '/logo.jpg';
            }
          }}
          className={`${sizeClasses[size]} w-auto object-contain transition-transform duration-200 hover:scale-[1.02] ${imgClassName}`}
        />
      </div>
    </div>
  );
};

export default RDInfraLogo;

