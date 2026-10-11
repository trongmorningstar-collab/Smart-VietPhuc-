import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Bot, Landmark, GraduationCap, PartyPopper, TreePine, Wine, Sparkles } from 'lucide-react';
import { useStylingStore } from '../store/useStylingStore';
import { Stepper } from '../components/Stepper';
import { Button } from '../components/Button';
import { useEffect, useState, useMemo } from 'react';

const aiContents: Record<string, { title: string, text: string, points: string[] }> = {
  'Đi lễ chùa': {
    title: '🌸 Đi lễ chùa',
    text: 'Ưu tiên trang nghiêm, thanh lịch, màu trầm hoặc trung tính.',
    points: ['Thiết kế kín đáo, thanh lịch', 'Chất liệu nhẹ, thoáng', 'Màu sắc trang nhã', 'Phù hợp nghi thức và văn hóa Việt']
  },
  'Sự kiện trường': {
    title: '🎓 Sự kiện trường',
    text: 'Trẻ trung, chỉn chu, dễ vận động nhưng vẫn giữ nét Việt.',
    points: ['Thiết kế năng động, dễ di chuyển', 'Màu sắc tươi sáng, trẻ trung', 'Chất liệu chống nhăn, thoải mái', 'Phối hợp phụ kiện hiện đại']
  },
  'Lễ hội': {
    title: '🏮 Lễ hội',
    text: 'Có thể nổi bật hơn với màu sắc, họa tiết và phụ kiện mang tinh thần truyền thống.',
    points: ['Màu sắc rực rỡ, nổi bật', 'Hoa văn truyền thống đặc sắc', 'Chất liệu lụa, gấm sang trọng', 'Thoải mái vận động cả ngày']
  },
  'Dạo phố': {
    title: '☕ Dạo phố',
    text: 'Thoải mái, hiện đại, dễ phối nhưng vẫn nhận diện được tinh thần Việt phục.',
    points: ['Thiết kế cách tân, ứng dụng cao', 'Chất liệu cotton, linen thoáng mát', 'Màu sắc pastel hoặc trung tính', 'Dễ dàng mix & match phụ kiện']
  },
  'Dự tiệc': {
    title: '🥂 Dự tiệc',
    text: 'Sang trọng, mạnh mẽ, có điểm nhấn nhưng tránh làm mất cấu trúc truyền thống.',
    points: ['Kiểu dáng sang trọng, quý phái', 'Chất liệu gấm, lụa cao cấp', 'Chi tiết thêu tay, đính kết', 'Màu sắc trầm ấm, quyền lực']
  }
};

const Step2Event = () => {
  const navigate = useNavigate();
  const { gender, event, setField } = useStylingStore();
  const [mounted, setMounted] = useState(false);
  const [displayEvent, setDisplayEvent] = useState(event);
  const [fadeState, setFadeState] = useState('in');

  useEffect(() => {
    setMounted(true);
  }, []);

  // Ensure routing logic doesn't crash if accessed directly
  useEffect(() => {
    if (!gender) {
      navigate('/step-1');
    }
  }, [gender, navigate]);

  // Crossfade effect for AI Stylist
  useEffect(() => {
    if (event !== displayEvent) {
      setFadeState('out');
      const timer = setTimeout(() => {
        setDisplayEvent(event);
        setFadeState('in');
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [event, displayEvent]);

  const handleNext = () => {
    if (event) navigate('/step-3');
  };

  const isFemale = gender === 'nữ';

  const eventsList = useMemo(() => [
    { 
      id: 'chua', 
      name: 'Đi lễ chùa', 
      icon: Landmark, 
      img: isFemale ? '/assets/images/female-temple.jpg' : '/assets/images/event_1_chua.jpg',
      objectPosition: isFemale ? 'center 15%' : 'center 20%'
    },
    { 
      id: 'truong', 
      name: 'Sự kiện trường', 
      icon: GraduationCap, 
      img: isFemale ? '/assets/images/female-school.jpg' : '/assets/images/event_2_truong.jpg',
      objectPosition: isFemale ? 'center 20%' : 'center 15%'
    },
    { 
      id: 'lehoi', 
      name: 'Lễ hội', 
      icon: PartyPopper, 
      img: isFemale ? '/assets/images/female-festival.jpg' : '/assets/images/event_3_lehoi.jpg',
      objectPosition: isFemale ? 'center 15%' : 'center 15%'
    },
    { 
      id: 'daopho', 
      name: 'Dạo phố', 
      icon: TreePine, 
      img: isFemale ? '/assets/images/female-street.jpg' : '/assets/images/event_5_daopho.jpg',
      objectPosition: isFemale ? 'center 15%' : 'center 15%'
    },
    { 
      id: 'dutiec', 
      name: 'Dự tiệc', 
      icon: Wine, 
      img: isFemale ? '/assets/images/female-party.jpg' : '/assets/images/event_6_dutiec.jpg',
      objectPosition: isFemale ? 'center 20%' : 'center 15%'
    },
  ], [isFemale]);

  const aiData = displayEvent && aiContents[displayEvent] ? aiContents[displayEvent] : null;

  return (
    <div className="min-h-screen pt-8 pb-12 flex flex-col relative z-10 px-4 md:px-8">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col flex-grow">
        
        <Stepper currentStep={2} />

        <div className={`text-center mb-8 transition-all duration-700 ease-out-expo ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
           <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B4A38] drop-shadow-sm mb-4">
             Bạn mặc Việt phục trong dịp nào?
           </h2>
           <div className="flex justify-center mb-2">
             <span className="text-[#C89B45] text-xl">❀</span>
           </div>
           <p className="text-gray-600 font-medium max-w-2xl mx-auto">
             Hãy chọn dịp mà bạn muốn mặc Việt phục.<br className="hidden md:block"/>
             AI Stylist sẽ gợi ý phong cách phù hợp nhất với nhu cầu và sở thích của bạn.
           </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-stretch justify-center flex-grow">
          {/* Options Grid (65-70%) - Flex wrap to center the bottom row */}
          <div className="flex flex-wrap justify-center gap-5 lg:w-[65%] w-full">
            {eventsList.map((evt, idx) => {
              const Icon = evt.icon;
              const isSelected = event === evt.name;
              
              return (
                <button
                  key={evt.id}
                  onClick={() => setField('event', evt.name)}
                  className={`w-full sm:w-[calc(50%-10px)] md:w-[calc(33.333%-14px)] relative group h-[200px] sm:h-[220px] rounded-[24px] overflow-hidden transition-all duration-300 flex flex-col text-center shadow-md hover:shadow-xl hover:-translate-y-[4px] ${
                    isSelected 
                      ? 'border-2 border-[#0B4A38] ring-2 ring-[#0B4A38]/10' 
                      : 'border border-gray-200/50 hover:border-[#0B4A38]/40 bg-[#F8F4E9]'
                  } ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: mounted ? `${idx * 50}ms` : '0ms' }}
                >
                  <div className="w-full h-[68%] relative overflow-hidden bg-gray-100">
                    <img 
                      src={evt.img} 
                      alt={evt.name} 
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]" 
                      style={{ objectPosition: evt.objectPosition }}
                    />
                    <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors duration-300"></div>
                  </div>

                  <div className={`flex flex-col items-center justify-center p-3 h-[32%] transition-colors duration-300 relative ${
                    isSelected ? 'bg-[#0B4A38]' : 'bg-white group-hover:bg-[#fcfbf7]'
                  }`}>
                    <div className="flex items-center gap-2 mb-1.5">
                      <Icon className={`w-4.5 h-4.5 transition-colors ${isSelected ? 'text-[#C89B45]' : 'text-[#0B4A38]'}`} />
                      <h3 className={`text-[15px] font-bold font-serif transition-colors ${isSelected ? 'text-white' : 'text-[#0B4A38]'}`}>
                        {evt.name}
                      </h3>
                    </div>
                    
                    <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-200 ${
                      isSelected ? 'bg-[#C89B45] scale-100 opacity-100' : 'bg-transparent border border-gray-300 scale-75 opacity-50 group-hover:border-[#C89B45]/50'
                    }`}>
                      {isSelected && <Check className="w-3.5 h-3.5 text-white animate-in zoom-in duration-200" strokeWidth={3} />}
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* AI Helper Panel (30-35%) */}
          <div className={`w-full lg:w-[35%] bg-white/95 backdrop-blur-xl rounded-[24px] p-7 shadow-2xl border border-white/60 flex flex-col transition-all duration-700 ease-out-expo ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`} style={{ transitionDelay: mounted ? '300ms' : '0ms' }}>
             
             <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-[#0B4A38] rounded-2xl flex items-center justify-center shadow-inner shrink-0 relative overflow-hidden">
                   <Bot className="w-7 h-7 text-[#C89B45] relative z-10" />
                   <div className="absolute top-1 right-1 w-2 h-2 bg-white rounded-full animate-ping opacity-50"></div>
                </div>
                <div>
                   <h4 className="font-bold text-[#0B4A38] text-[20px] font-serif leading-tight">AI Stylist</h4>
                   <p className="text-[12px] text-gray-500 font-medium">Tư vấn phối đồ cùng Smart Việt Phục</p>
                </div>
             </div>
             
             <div className="flex-grow flex flex-col">
               {!aiData ? (
                 <div className="bg-[#f9f6f0] p-6 rounded-2xl border border-[#C89B45]/20 mb-8 relative shadow-sm text-center flex-grow flex items-center justify-center">
                   <p className="text-[15px] text-gray-700 font-medium leading-relaxed relative z-10">
                     Chọn một dịp để mình tư vấn cho bạn.
                   </p>
                 </div>
               ) : (
                 <div className={`flex flex-col flex-grow transition-opacity duration-200 ${fadeState === 'in' ? 'opacity-100' : 'opacity-0'}`}>
                   <div className="bg-[#f9f6f0] p-5 rounded-2xl border border-[#C89B45]/20 mb-5 relative shadow-sm">
                     <div className="absolute -top-2 left-8 w-4 h-4 bg-[#f9f6f0] transform rotate-45 border-l border-t border-[#C89B45]/20"></div>
                     <h5 className="font-bold text-[#0B4A38] text-base mb-2 font-serif">{aiData.title}</h5>
                     <p className="text-[13.5px] text-gray-800 font-medium leading-relaxed relative z-10">
                       {aiData.text}
                     </p>
                   </div>

                   <div className="mt-auto">
                     <h6 className="text-[13px] font-bold text-gray-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                       <Sparkles className="w-4 h-4 text-[#C89B45]" /> Gợi ý từ AI Stylist
                     </h6>
                     <div className="space-y-3">
                       {aiData.points.map((point, i) => (
                         <div key={i} className="flex items-start gap-2.5">
                           <Check className="w-4 h-4 text-[#0B4A38] shrink-0 mt-0.5" /> 
                           <span className="text-[13.5px] text-gray-700 font-medium leading-snug">{point}</span>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>
               )}
             </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className={`flex justify-center gap-4 mt-12 transition-all duration-700 ease-out-expo ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`} style={{ transitionDelay: mounted ? '400ms' : '0ms' }}>
          <Button 
            variant="secondary"
            onClick={() => navigate('/step-1')}
            className="!px-6 !rounded-2xl"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </Button>
          <Button 
            variant="primary"
            onClick={handleNext}
            disabled={!event}
            className="!px-8 !rounded-2xl min-w-[140px]"
          >
            Tiếp tục <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step2Event;
