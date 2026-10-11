import { ArrowRight, Landmark, GraduationCap, PartyPopper, TreePine, Wine, Leaf, ShieldCheck, Gem, Globe, Play } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStylingStore } from '../store/useStylingStore';
import { Button } from '../components/Button';
import { useEffect, useState, useMemo } from 'react';
import { homeHeroGallery } from '../data/homeHeroGallery';

const valueStrip = [
  { icon: Gem, text: 'Chuẩn Việt đương đại' },
  { icon: Leaf, text: 'Chất liệu thân thiện' },
  { icon: ShieldCheck, text: 'Thiết kế tinh tế' },
  { icon: Globe, text: 'Phù hợp mọi hành trình' }
];

const quickOptions = [
  { id: 'chua', name: 'Đi lễ chùa', icon: Landmark },
  { id: 'truong', name: 'Sự kiện trường', icon: GraduationCap },
  { id: 'lehoi', name: 'Lễ hội', icon: PartyPopper },
  { id: 'daopho', name: 'Dạo phố', icon: TreePine },
  { id: 'dutiec', name: 'Dự tiệc', icon: Wine }
];

const aiHomeContents: Record<string, string> = {
  'Đi lễ chùa': 'Một set Việt phục thanh nhã, kín đáo với tông kem, xanh rêu hoặc nâu đất sẽ rất hợp không gian chùa. Muốn mình phối ngay một bộ vừa trang nghiêm vừa đẹp lên hình cho bạn không?',
  'Sự kiện trường': 'Đi học sự kiện, thuyết trình hay lễ tốt nghiệp thì nên chọn Việt phục gọn gàng, trẻ trung và dễ di chuyển. Mình có thể phối cho bạn một set vừa nổi bật vừa vẫn đúng chất Việt.',
  'Lễ hội': 'Lễ hội là lúc Việt phục có thể rực rỡ và cá tính hơn một chút. Mình sẽ giúp bạn chọn màu, kiểu dáng và phụ kiện để vừa nổi bật vừa không mất nét truyền thống.',
  'Dạo phố': 'Dạo phố hợp với Việt phục cách tân, nhẹ, thoải mái và dễ phối cùng phụ kiện hiện đại. Muốn thử một phiên bản thật trẻ nhưng nhìn vào vẫn nhận ra ngay chất Việt không?',
  'Dự tiệc': 'Dự tiệc nên chọn Việt phục có phom sang, màu chủ đạo rõ và điểm nhấn tinh tế. Mình có thể phối cho bạn một set đủ nổi bật để gây ấn tượng nhưng vẫn giữ nét Việt.'
};

const Home = () => {
  const navigate = useNavigate();
  const { gender, setField } = useStylingStore();
  const [mounted, setMounted] = useState(false);
  const [activeHomeEvent, setActiveHomeEvent] = useState<string | null>(null);
  const [robotBounce, setRobotBounce] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelectEvent = (eventTitle: string | null = null) => {
    if (eventTitle) {
      setField('event', eventTitle);
    }
    navigate('/step-1');
  };

  const handleCardClick = (cardGender: string, cardEventId: string) => {
    setField('gender', cardGender);
    setField('event', cardEventId);
    navigate('/step-3'); // nhảy thẳng vào luồng chọn trang phục
  };

  const handleEventClick = (eventName: string) => {
    setActiveHomeEvent(eventName);
    setRobotBounce(true);
    setTimeout(() => setRobotBounce(false), 300);
  };

  const handleProceed = () => {
    setIsExiting(true);
    setTimeout(() => {
      handleSelectEvent(activeHomeEvent);
    }, 250);
  };

  const displayCards = useMemo(() => {
    const maleCards = homeHeroGallery.filter(c => c.gender === 'nam');
    const femaleCards = homeHeroGallery.filter(c => c.gender === 'nữ');
    if (gender === 'nam') return [...maleCards, ...femaleCards];
    if (gender === 'nữ') return [...femaleCards, ...maleCards];
    return [...maleCards, ...femaleCards];
  }, [gender]);

  return (
    <div className="relative min-h-screen flex flex-col justify-center overflow-x-hidden w-full bg-[#f4ebd9]">
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }
        .robot-float { animation: float 3.2s ease-in-out infinite; }
        
        @keyframes pop {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        .robot-bounce { animation: pop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-50% - 10px)); }
        }
        .animate-scroll {
          animation: scroll-left 50s linear infinite;
          will-change: transform;
          display: flex;
          width: max-content;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .animate-scroll { 
            animation: none; 
            overflow-x: auto; 
            width: 100%; 
            scroll-snap-type: x mandatory;
          }
        }
        
        .card-shimmer {
          position: relative; 
          overflow: hidden;
        }
        .card-shimmer::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; width: 50%; height: 100%;
          background: linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent);
          transform: skewX(-20deg);
          transition: all 0.7s;
          pointer-events: none;
          z-index: 10;
        }
        .card-shimmer:hover::after {
          animation: shimmer-slide 1s ease-in-out;
        }
        @keyframes shimmer-slide {
          0% { left: -100%; }
          100% { left: 200%; }
        }
      `}</style>
      
      {/* Background from ZIP */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/assets/images/bg-original.png" alt="Background" className="w-full h-full object-cover opacity-90 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF7]/90 via-[#FFFDF7]/50 to-[#0B4A38]/5"></div>
      </div>

      <div className={`max-w-[1440px] mx-auto px-6 lg:px-12 pt-12 pb-12 relative z-10 w-full flex flex-col gap-10 transition-all duration-300 ease-out ${isExiting ? 'opacity-0 scale-[0.98] -translate-x-4' : 'opacity-100'}`}>
        
        {/* HERO SECTION */}
        <section className="flex flex-col lg:flex-row items-stretch justify-center gap-8 lg:gap-8 mt-4 lg:mt-8">
          
          {/* LEFT: Content */}
          <div className={`lg:w-1/2 flex flex-col transition-all duration-700 delay-100 ease-out-expo ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="h-full bg-[rgba(255,253,248,0.65)] backdrop-blur-md rounded-[24px] p-6 lg:p-10 shadow-lg border border-white/60 relative overflow-hidden isolate flex flex-col justify-center">
              
              <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/40 rounded-full blur-3xl -z-10"></div>

              <div className="inline-flex items-center mb-6">
                <span className="text-[11px] font-bold tracking-widest uppercase text-[#0B4A38] bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full border border-[#0B4A38]/15 shadow-sm">
                  THỜI TRANG VIỆT NAM ĐƯƠNG ĐẠI
                </span>
              </div>
              
              <h1 className="text-[44px] sm:text-5xl lg:text-[56px] font-serif font-[800] leading-[1.15] text-[#0B4A38] mb-5 drop-shadow-sm">
                SMART VIỆT PHỤC —<br />
                <span className="text-[#C89B45]">MẶC BẢN SẮC,</span><br />
                ĐI MUÔN NƠI
              </h1>
              
              <p className="text-[16px] text-[#233B33] leading-[1.65] font-medium max-w-[600px] mb-8">
                Khám phá và trải nghiệm Việt phục cùng công nghệ AI hiện đại, tôn vinh giá trị văn hóa Việt Nam, để mỗi hành trình của bạn đều đậm bản sắc và đầy cảm hứng.
              </p>
              
              {/* Value Strip */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-5 pt-6 border-t border-[#0B4A38]/10">
                {valueStrip.map((item, i) => (
                  <div key={i} className="flex items-center gap-3 text-[#183029]">
                    <item.icon className="w-5 h-5 text-[#C89B45] shrink-0" strokeWidth={2.5} />
                    <span className="text-[13.5px] font-bold">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: AI Stylist Card */}
          <div className={`lg:w-1/2 w-full flex flex-col transition-all duration-700 delay-500 ease-out-expo ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="h-full w-full bg-[rgba(255,253,248,0.65)] backdrop-blur-md rounded-[24px] shadow-lg p-6 lg:p-10 border border-white/50 relative overflow-hidden group isolate flex flex-col justify-center">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#C89B45]/10 rounded-full blur-3xl -z-10 transition-colors duration-500 group-hover:bg-[#C89B45]/20"></div>
              
              <div className="flex flex-col items-center text-center mb-8 relative z-10">
                 <div className={`w-[180px] h-[180px] md:w-[240px] md:h-[240px] lg:w-[320px] lg:h-[320px] rounded-full overflow-hidden shrink-0 shadow-2xl border-[4px] border-[#C89B45]/40 bg-[#0B4A38] flex items-center justify-center robot-float transition-transform mb-6 ${robotBounce ? 'robot-bounce' : ''}`}>
                   <video src="/assets/videos/ai-robot.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover scale-[1.1]" />
                 </div>
                 <div>
                   <h3 className="text-[#0B4A38] font-black text-[26px] md:text-[30px] font-serif leading-none mb-2">AI Stylist</h3>
                   <p className="text-[12px] md:text-[13px] text-[#233B33] font-bold uppercase tracking-wider">Tư vấn phối đồ cùng Smart Việt Phục</p>
                 </div>
              </div>
              
              <div className="bg-white rounded-[16px] p-5 mb-6 relative border border-[#C89B45]/15 shadow-sm z-10 text-center">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white transform rotate-45 border-l border-t border-[#C89B45]/15"></div>
                <p className="text-[#183029] font-medium text-[15px] leading-[1.6] relative z-10">
                  Chào bạn! Hôm nay bạn muốn mặc Việt phục trong dịp nào? 😊
                </p>
              </div>

              <div className={`flex flex-wrap justify-center gap-2.5 relative z-10 ${activeHomeEvent ? 'mb-6' : 'mb-2'}`}>
                {quickOptions.map((evt) => {
                  const isActive = activeHomeEvent === evt.name;
                  return (
                    <button
                      key={evt.id}
                      onClick={() => handleEventClick(evt.name)}
                      className={`flex items-center justify-center gap-2 py-3 px-4 rounded-full border transition-all duration-300 text-[14px] font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 group/btn ${
                        isActive 
                          ? 'bg-[#0B4A38] text-white border-[#0B4A38]' 
                          : 'bg-white border-gray-200 text-[#233B33] hover:border-[#C89B45] hover:bg-[#FFFDF7]'
                      }`}
                    >
                      <evt.icon className={`w-4.5 h-4.5 ${isActive ? 'text-[#C89B45]' : 'text-[#C89B45] opacity-80 group-hover/btn:opacity-100'}`} />
                      {evt.name}
                    </button>
                  );
                })}
              </div>

              {activeHomeEvent && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 relative z-10">
                  <div className="bg-[#f9f6f0] rounded-[16px] p-5 mb-6 border border-[#C89B45]/20 shadow-sm relative">
                    <p className="text-[#183029] font-medium text-[14px] leading-[1.6]">
                      {aiHomeContents[activeHomeEvent]}
                    </p>
                  </div>
                  <Button 
                    variant="primary"
                    onClick={handleProceed}
                    className="w-full !rounded-[14px] !h-[52px] text-[15px] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    ✨ Phối thử ngay
                  </Button>
                </div>
              )}

            </div>
          </div>

        </section>

        {/* GALLERY STRIP */}
        <section className={`mt-2 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] pb-4 transition-all duration-1000 delay-700 ease-out-expo ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="w-full overflow-hidden relative">
             <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#f4ebd9] to-transparent z-10 pointer-events-none"></div>
             <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#f4ebd9] to-transparent z-10 pointer-events-none"></div>
             
             <div className="animate-scroll gap-5 px-6">
                {/* Render the cards twice to create a seamless infinite loop */}
                {[...displayCards, ...displayCards].map((card, idx) => {
                  return (
                    <div 
                      key={`${card.id}-${idx}`} 
                      className="w-[260px] sm:w-[280px] shrink-0 card-shimmer bg-[#FFFDF7]/95 backdrop-blur-md rounded-[20px] overflow-hidden shadow-md border border-white/60 group cursor-pointer transition-all duration-300 flex flex-col hover:shadow-xl hover:border-[#C89B45]/80 hover:-translate-y-1.5 snap-center" 
                      onClick={() => handleCardClick(card.gender, card.eventId)}
                    >
                      <div className="h-[220px] relative overflow-hidden bg-gray-100">
                        <img src={card.image} alt={card.title} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0B4A38]/90 via-[#0B4A38]/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute bottom-4 left-5 right-5 flex flex-col justify-end text-white z-10">
                           <span className="text-[11px] font-bold tracking-widest uppercase text-[#C89B45] mb-1">
                             {card.gender === 'nam' ? 'Thời trang Nam' : 'Thời trang Nữ'}
                           </span>
                           <h3 className="text-[18px] font-bold font-serif leading-tight">{card.title}</h3>
                        </div>
                      </div>
                      <div className="p-4 flex items-center justify-between bg-white border-t border-[#C89B45]/10">
                        <div className="text-[#0B4A38] font-bold flex items-center gap-1.5 text-[12px] uppercase tracking-wider group-hover:text-[#C89B45] transition-colors">
                          <Play className="w-3.5 h-3.5 fill-current" /> Thử phối đồ
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#C89B45] transform transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  )
                })}
             </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
