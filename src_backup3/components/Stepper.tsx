import { Check } from 'lucide-react';

export const stepsConfig = [
  { label: 'Chọn đối tượng' },
  { label: 'Chọn dịp' },
  { label: 'Chọn trang phục' },
  { label: 'AI gợi ý' },
  { label: 'Hoàn tất' }
];

export const Stepper = ({ currentStep }: { currentStep: number }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mb-10 relative px-4 hidden md:block animate-in fade-in duration-500">
      {/* Connector base */}
      <div className="absolute top-[19px] left-[10%] right-[10%] h-[2px] bg-gray-200 -z-10 rounded-full"></div>
      
      {/* Connector active */}
      <div 
        className="absolute top-[19px] left-[10%] h-[2px] bg-[#0B4A38] -z-10 transition-all duration-500 ease-out-expo rounded-full" 
        style={{ width: `${Math.min((currentStep - 1) / (stepsConfig.length - 1) * 80, 80)}%` }}
      ></div>
      
      <div className="flex justify-between relative z-10">
        {stepsConfig.map((step, idx) => {
          const stepNum = idx + 1;
          const isActive = stepNum === currentStep;
          const isCompleted = stepNum < currentStep;

          return (
            <div key={idx} className="flex flex-col items-center gap-3 w-28">
              <div 
                className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 relative ${
                  isActive 
                    ? 'bg-[#0B4A38] text-white scale-110 shadow-md shadow-[#0B4A38]/30' 
                    : isCompleted
                    ? 'bg-white text-[#0B4A38] border-2 border-[#0B4A38] shadow-sm'
                    : 'bg-[#F8F4E9] text-gray-400 border border-gray-200'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 rounded-full ring-[6px] ring-[#C89B45]/20 animate-pulse-slow"></div>
                )}
                {isCompleted ? <Check className="w-5 h-5 text-[#0B4A38]" /> : stepNum}
              </div>
              <span className={`text-[13px] text-center transition-colors duration-300 ${
                isActive ? 'text-[#0B4A38] font-bold' : isCompleted ? 'text-[#0B4A38]/80 font-bold' : 'text-gray-400 font-semibold'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
