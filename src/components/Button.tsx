import { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'gold' | 'ghost' | 'outline';
  isLoading?: boolean;
  children: ReactNode;
  fullWidth?: boolean;
}

export const Button = ({ 
  variant = 'primary', 
  isLoading = false, 
  children, 
  fullWidth = false,
  className = '',
  disabled,
  ...props 
}: ButtonProps) => {
  
  const baseStyles = "relative inline-flex items-center justify-center gap-2 h-12 px-6 rounded-[16px] font-bold transition-all duration-200 overflow-hidden text-sm";
  const widthStyles = fullWidth ? "w-full" : "w-auto";
  
  const variants = {
    primary: "bg-[#0B4A38] text-white hover:bg-[#123F32] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95",
    secondary: "bg-white/95 backdrop-blur-sm border border-[#0B4A38]/30 text-[#0B4A38] hover:bg-[#0B4A38]/5 hover:border-[#0B4A38]/50 shadow-sm active:scale-95",
    gold: "bg-[#C89B45] text-white hover:bg-[#b0883b] shadow-md hover:shadow-lg hover:-translate-y-0.5 active:scale-95",
    ghost: "bg-transparent text-gray-500 hover:text-gray-800 hover:bg-gray-100/80 active:scale-95",
    outline: "bg-transparent border-2 border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50 active:scale-95"
  };

  const disabledStyles = disabled || isLoading 
    ? "opacity-50 cursor-not-allowed hover:translate-y-0 hover:shadow-none active:scale-100 pointer-events-none" 
    : "";

  return (
    <button 
      className={`${baseStyles} ${widthStyles} ${variants[variant]} ${disabledStyles} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
      {!isLoading && children}
    </button>
  );
};
