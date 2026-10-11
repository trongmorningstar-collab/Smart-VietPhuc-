import { ArrowRight, Sparkles, Landmark, GraduationCap, PartyPopper, TreePine, Wine, Leaf, ShieldCheck, Gem, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useStylingStore } from '../store/useStylingStore';
import { Button } from '../components/Button';
import { useEffect, useState } from 'react';

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

const featureCards = [
  { id: 1, icon: Landmark, title: 'Đi lễ chùa', desc: 'Trang nghiêm, thanh lịch.', img: '/assets/images/female-temple.jpg' },
  { id: 2, icon: PartyPopper, title: 'Sự kiện văn hóa', desc: 'Tỏa sáng trong lễ hội truyền thống.', img: '/assets/images/event_3_lehoi.jpg' },
  { id: 3, icon: ShieldCheck, title: 'Phong cách nam', desc: 'Tối giản, tinh tế, đàng hoàng.', img: '/assets/images/event_5_daopho.jpg' },
  { id: 4, icon: Gem, title: 'Phong cách nữ', desc: 'Duyên dáng, hiện đại, thanh lịch.', img: '/assets/images/female-school.jpg' },
  { id: 5, icon: Sparkles, title: 'AI phối đồ', desc: 'Gợi ý Việt phục theo dịp của bạn.', img: '/assets/images/female-party.jpg' }
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
  const setField = useStylingStore((state) => state.setField);
  const [mounted, setMounted] = useState(false);
  const [activeHomeEvent, setActiveHomeEvent] = useState<string | null>(null);
  const [robotBounce, setRobotBounce] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSelectEvent = (eventTitle: string | null = null) => {
    setField('gender', null); 
    if (eventTitle) {
      setField('event', eventTitle);
    }
    navigate('/step-1');
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

  const handleLookbook = () => {
    navigate('/lookbook');
  };

  return (
    <div className="relative min-h-screen flex flex-col justify-center overflow-hidden w-full bg-[#f4ebd9]">
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
      `}</style>
      
      {/* Background from ZIP */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img src="/assets/images/bg-original.png" alt="Background" className="w-full h-full object-cover opacity-90 scale-105" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#FFFDF7]/90 via-[#FFFDF7]/50 to-[#0B4A38]/5"></div>
      </div>

      <div className={`max-w-[1440px] mx-auto px-6 lg:px-12 pt-12 pb-12 relative z-10 w-full flex flex-col gap-10 transition-all duration-300 ease-out ${isExiting ? 'opacity-0 scale-[0.98] -translate-x-4' : 'opacity-100'}`}>
        
        {/* HERO SECTION */}
        <section className="flex flex-col lg:flex-row items-center justify-between gap-12 mt-4 lg:mt-8">
          
          {/* LEFT: Content */}
          <div className={`lg:w-[55%] flex flex-col justify-center transition-all duration-700 delay-100 ease-out-expo ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-[#FFFDF7]/70 backdrop-blur-md rounded-[24px] p-6 lg:p-10 shadow-xl border border-white/60 relative overflow-hidden isolate">
              
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
              
              <div className="flex flex-wrap gap-4 mb-8">
                <Button 
                  variant="primary" 
                  onClick={handleLookbook}
                  className="!px-7 !h-[52px] !rounded-[16px] shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
                >
                  Khám phá bộ sưu tập <ArrowRight className="w-4 h-4 ml-1.5" />
                </Button>
                <Button 
                  variant="secondary" 
                  onClick={() => handleSelectEvent()}
                  className="!px-7 !h-[52px] !rounded-[16px] !bg-[#FFFDF7] !text-[#0B4A38] !border-[#C89B45]/50 hover:!border-[#C89B45] shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 group"
                >
                  <Sparkles className="w-4 h-4 mr-2 text-[#C89B45]" />
                  AI Stylist tư vấn <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>

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
          <div className={`lg:w-[35%] max-w-[480px] w-full flex flex-col justify-center transition-all duration-700 delay-500 ease-out-expo ${mounted ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
            <div className="w-full bg-[#FFFDF7]/95 backdrop-blur-xl rounded-[24px] shadow-2xl p-6 lg:p-7 border border-[#C89B45]/20 relative overflow-hidden group isolate">
              <div className="absolute -right-10 -top-10 w-40 h-40 bg-[#C89B45]/10 rounded-full blur-3xl -z-10 transition-colors duration-500 group-hover:bg-[#C89B45]/20"></div>
              
              <div className="flex items-center gap-4 mb-5 relative z-10">
                 <div className={`w-[60px] h-[60px] lg:w-[76px] lg:h-[76px] rounded-full overflow-hidden shrink-0 shadow-md border-[2.5px] border-[#C89B45]/40 bg-[#0B4A38] flex items-center justify-center robot-float transition-transform ${robotBounce ? 'robot-bounce' : ''}`}>
                   <video src="/assets/videos/ai-robot.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover scale-[1.1]" />
                 </div>
                 <div>
                   <h3 className="text-[#0B4A38] font-black text-[20px] font-serif leading-none mb-1">AI Stylist</h3>
                   <p className="text-[11px] text-[#233B33] font-bold uppercase tracking-wider">Tư vấn phối đồ</p>
                 </div>
              </div>
              
              <div className="bg-white rounded-[16px] p-4.5 mb-5 relative border border-[#C89B45]/15 shadow-sm z-10">
                <div className="absolute -top-2 left-8 w-4 h-4 bg-white transform rotate-45 border-l border-t border-[#C89B45]/15"></div>
                <p className="text-[#183029] font-medium text-[14.5px] leading-[1.5] relative z-10">
                  Chào bạn! Hôm nay bạn muốn mặc Việt phục trong dịp nào? 😊
                </p>
              </div>

              <div className={`flex flex-wrap gap-2.5 relative z-10 ${activeHomeEvent ? 'mb-5' : 'mb-2'}`}>
                {quickOptions.map((evt) => {
                  const isActive = activeHomeEvent === evt.name;
                  return (
                    <button
                      key={evt.id}
                      onClick={() => handleEventClick(evt.name)}
                      className={`flex items-center justify-center gap-2 py-2.5 px-3.5 rounded-full border transition-all duration-300 text-[13px] font-bold shadow-sm hover:shadow-md hover:-translate-y-0.5 group/btn ${
                        isActive 
                          ? 'bg-[#0B4A38] text-white border-[#0B4A38]' 
                          : 'bg-white border-gray-200 text-[#233B33] hover:border-[#C89B45] hover:bg-[#FFFDF7]'
                      }`}
                    >
                      <evt.icon className={`w-4 h-4 ${isActive ? 'text-[#C89B45]' : 'text-[#C89B45] opacity-80 group-hover/btn:opacity-100'}`} />
                      {evt.name}
                    </button>
                  );
                })}
              </div>

              {activeHomeEvent && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 relative z-10">
                  <div className="bg-[#f9f6f0] rounded-[16px] p-4.5 mb-5 border border-[#C89B45]/20 shadow-sm relative">
                    <p className="text-[#183029] font-medium text-[14px] leading-[1.6]">
                      {aiHomeContents[activeHomeEvent]}
                    </p>
                  </div>
                  <Button 
                    variant="primary"
                    onClick={handleProceed}
                    className="w-full !rounded-[14px] !h-[48px] shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    ✨ Phối thử ngay
                  </Button>
                </div>
              )}

            </div>
          </div>

        </section>

        {/* DISCOVERY CARDS */}
        <section className={`mt-4 transition-all duration-1000 delay-700 ease-out-expo ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-wrap justify-center gap-5">
            {featureCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div 
                  key={card.id} 
                  className="w-full sm:w-[calc(50%-10px)] md:w-[calc(20%-16px)] bg-[#FFFDF7]/95 backdrop-blur-md rounded-[20px] overflow-hidden shadow-lg border border-white/60 group cursor-pointer transition-all duration-300 flex flex-col hover:shadow-xl hover:border-[#C89B45]/50 hover:-translate-y-1.5" 
                  onClick={() => handleSelectEvent(card.title === 'AI phối đồ' ? null : card.title)}
                  style={{ transitionDelay: `${idx * 80}ms` }}
                >
                  <div className="h-[140px] relative overflow-hidden bg-gray-100">
                    <img src={card.img} alt={card.title} className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
                    <div className="absolute bottom-3 left-4 flex items-center gap-2 text-white">
                       <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                         <Icon className="w-4 h-4 text-[#C89B45] drop-shadow-sm" />
                       </div>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col flex-grow bg-white">
                    <h3 className="text-[15px] font-bold font-serif text-[#0B4A38] mb-1.5 line-clamp-1">{card.title}</h3>
                    <p className="text-[#4F6C61] text-[12.5px] mb-3 flex-grow leading-relaxed font-medium line-clamp-2">{card.desc}</p>
                    <div className="text-[#0B4A38] font-bold flex items-center gap-1 transition-colors text-[12px] uppercase tracking-wider group-hover:text-[#C89B45]">
                      Khám phá <ArrowRight className="w-3.5 h-3.5 transform transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;
