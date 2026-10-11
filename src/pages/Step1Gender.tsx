import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Bot } from 'lucide-react';
import { useStylingStore } from '../store/useStylingStore';
import { Stepper } from '../components/Stepper';
import { Button } from '../components/Button';
import { useEffect, useState } from 'react';

const Step1Gender = () => {
  const navigate = useNavigate();
  const { gender, setField } = useStylingStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleNext = () => {
    if (gender) navigate('/step-2');
  };

  const aiMessage = !gender 
    ? "Sau khi bạn chọn đối tượng, hệ thống sẽ phân tích phong cách, nhu cầu và gợi ý những mẫu Việt phục phù hợp nhất."
    : `Đã chọn ${gender === 'nam' ? 'Nam' : 'Nữ'}. Tiếp theo hãy cho mình biết bạn sẽ mặc Việt phục trong dịp nào.`;

  return (
    <div className="min-h-screen pt-8 pb-12 flex flex-col relative z-10 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col flex-grow">
        
        <Stepper currentStep={1} />

        <div className={`text-center mb-10 transition-all duration-700 ease-out-expo ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
           <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B4A38] drop-shadow-sm mb-4">
             Bạn muốn phối Việt phục cho ai?
           </h2>
           <p className="text-gray-600 font-medium max-w-2xl mx-auto">
             Hãy chọn đối tượng để Smart Việt Phục gợi ý những phong cách phù hợp nhất với nhu cầu và sở thích của bạn.
           </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center flex-grow">
          {/* Main Cards Area */}
          <div className="flex flex-col sm:flex-row gap-6 flex-grow justify-center lg:justify-end lg:pr-4">
            
            {/* Male Card */}
            <button 
              onClick={() => setField('gender', 'nam')}
              className={`relative group w-full sm:w-[320px] lg:w-[340px] h-[480px] lg:h-[520px] rounded-[24px] overflow-hidden transition-all duration-300 flex flex-col text-center shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                gender === 'nam' 
                  ? 'border-2 border-[#C89B45] ring-4 ring-[#C89B45]/20 scale-[1.02]' 
                  : 'border border-gray-200/50 hover:border-[#C89B45]/40 bg-[#F8F4E9]'
              } ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: mounted ? '100ms' : '0ms' }}
            >
              <div className="w-full h-[75%] relative overflow-hidden bg-gray-100">
                <img src="/assets/model-nam.jpg" alt="Nam" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
              </div>

              <div className={`flex flex-col items-center justify-center p-6 h-[25%] transition-colors duration-300 ${
                gender === 'nam' ? 'bg-[#0B4A38]' : 'bg-[#F8F4E9] group-hover:bg-[#f2efe2]'
              }`}>
                <h3 className={`text-2xl font-serif font-bold mb-1 transition-colors ${gender === 'nam' ? 'text-white' : 'text-[#0B4A38]'}`}>
                  Nam
                </h3>
                <p className={`text-[13px] font-medium transition-colors ${gender === 'nam' ? 'text-gray-300' : 'text-gray-500'}`}>
                  Lịch lãm · bản lĩnh · hiện đại
                </p>
                
                <div className={`mt-3 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                  gender === 'nam' ? 'bg-[#C89B45] scale-100 opacity-100' : 'bg-transparent border border-gray-300 scale-75 opacity-50 group-hover:border-[#C89B45]/50'
                }`}>
                  {gender === 'nam' && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </div>
              </div>
            </button>

            {/* Female Card */}
            <button 
              onClick={() => setField('gender', 'nữ')}
              className={`relative group w-full sm:w-[320px] lg:w-[340px] h-[480px] lg:h-[520px] rounded-[24px] overflow-hidden transition-all duration-300 flex flex-col text-center shadow-lg hover:shadow-xl hover:-translate-y-1 ${
                gender === 'nữ' 
                  ? 'border-2 border-[#C89B45] ring-4 ring-[#C89B45]/20 scale-[1.02]' 
                  : 'border border-gray-200/50 hover:border-[#C89B45]/40 bg-[#F8F4E9]'
              } ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: mounted ? '160ms' : '0ms' }}
            >
              <div className="w-full h-[75%] relative overflow-hidden bg-gray-100">
                <img src="/assets/model-nu.jpg" alt="Nữ" className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.025]" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
              </div>

              <div className={`flex flex-col items-center justify-center p-6 h-[25%] transition-colors duration-300 ${
                gender === 'nữ' ? 'bg-[#0B4A38]' : 'bg-[#F8F4E9] group-hover:bg-[#f2efe2]'
              }`}>
                <h3 className={`text-2xl font-serif font-bold mb-1 transition-colors ${gender === 'nữ' ? 'text-white' : 'text-[#0B4A38]'}`}>
                  Nữ
                </h3>
                <p className={`text-[13px] font-medium transition-colors ${gender === 'nữ' ? 'text-gray-300' : 'text-gray-500'}`}>
                  Thanh lịch · duyên dáng · hiện đại
                </p>
                
                <div className={`mt-3 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200 ${
                  gender === 'nữ' ? 'bg-[#C89B45] scale-100 opacity-100' : 'bg-transparent border border-gray-300 scale-75 opacity-50 group-hover:border-[#C89B45]/50'
                }`}>
                  {gender === 'nữ' && <Check className="w-4 h-4 text-white" strokeWidth={3} />}
                </div>
              </div>
            </button>
          </div>

          {/* AI Helper Panel */}
          <div className={`w-full lg:w-[320px] bg-white/95 backdrop-blur-xl rounded-[24px] p-7 shadow-2xl border border-white/60 flex flex-col transition-all duration-700 ease-out-expo ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: mounted ? '300ms' : '0ms' }}>
             
             <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#0B4A38] rounded-2xl flex items-center justify-center shadow-inner shrink-0">
                   <Bot className="w-7 h-7 text-[#C89B45]" />
                </div>
                <div>
                   <h4 className="font-bold text-[#0B4A38] text-[20px] font-serif leading-tight">AI Stylist</h4>
                   <p className="text-[12px] text-gray-500 font-medium">Trợ lý phối đồ cùng Smart Việt Phục</p>
                </div>
             </div>
             
             <div className="bg-[#f9f6f0] p-5 rounded-2xl border border-[#C89B45]/20 mb-8 relative shadow-sm">
               <div className="absolute -top-2 left-8 w-4 h-4 bg-[#f9f6f0] transform rotate-45 border-l border-t border-[#C89B45]/20"></div>
               <p className="text-[14px] text-gray-800 font-medium leading-relaxed relative z-10 transition-all duration-300">
                 {aiMessage}
               </p>
             </div>

             <div className="space-y-4 text-sm text-[#0B4A38] font-bold mt-auto mb-2">
               <div className="flex items-center gap-3">
                 <span className="text-[#C89B45] text-[16px]">◇</span> <span>Gợi ý theo phong cách</span>
               </div>
               <div className="flex items-center gap-3">
                 <span className="text-[#C89B45] text-[16px]">◇</span> <span>Phù hợp văn hóa & dịp sử dụng</span>
               </div>
               <div className="flex items-center gap-3">
                 <span className="text-[#C89B45] text-[16px]">◇</span> <span>Cá nhân hóa bằng AI</span>
               </div>
             </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className={`flex justify-center gap-4 mt-12 transition-all duration-700 ease-out-expo ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: mounted ? '400ms' : '0ms' }}>
          <Button 
            variant="secondary"
            onClick={() => navigate('/')}
            className="!px-6 !rounded-2xl"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </Button>
          <Button 
            variant="primary"
            onClick={handleNext}
            disabled={!gender}
            className="!px-8 !rounded-2xl min-w-[140px]"
          >
            Tiếp tục <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step1Gender;
