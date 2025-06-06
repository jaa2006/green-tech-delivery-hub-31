
import React from 'react';
import { cn } from '@/lib/utils';

interface IllustratedLoginButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  characterImage: string;
  variant: 'user' | 'driver';
}

const IllustratedLoginButton = React.forwardRef<HTMLButtonElement, IllustratedLoginButtonProps>(
  ({ className, children, characterImage, variant, ...props }, ref) => {
    return (
      <button
        className={cn(
          'illustrated-login-button relative w-full h-20 bg-[#0A5D5D] rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98]',
          className
        )}
        ref={ref}
        {...props}
      >
        {/* 3D Background Effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A5D5D] via-[#085456] to-[#064b4d] rounded-2xl"></div>
        
        {/* Inner Shadow for 3D effect */}
        <div className="absolute inset-1 bg-gradient-to-br from-white/10 to-transparent rounded-xl"></div>
        
        {/* Character Image */}
        <div className="absolute left-2 top-1/2 -translate-y-1/2 w-16 h-16 flex items-center justify-center">
          <img 
            src={characterImage} 
            alt={`Habisin ${variant} character`}
            className="w-14 h-14 object-contain drop-shadow-lg"
          />
        </div>
        
        {/* Button Text */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-right">
          <span className="text-white font-bold text-lg leading-tight">
            {children}
          </span>
        </div>
        
        {/* 3D Highlight */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-t-2xl"></div>
        
        {/* Bottom Shadow */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20 rounded-b-2xl"></div>

        <style>{`
          .illustrated-login-button:hover {
            box-shadow: 0 8px 25px rgba(10, 93, 93, 0.3);
          }
          
          .illustrated-login-button:active {
            box-shadow: 0 4px 15px rgba(10, 93, 93, 0.4);
          }
        `}</style>
      </button>
    );
  }
);

IllustratedLoginButton.displayName = "IllustratedLoginButton";

export { IllustratedLoginButton };
