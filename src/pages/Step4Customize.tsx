import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStylingStore } from '../store/useStylingStore';
import dataset from '../data/dataset.json';
import { maleOutfits } from '../data/maleOutfits';
import { Sparkles, Check, ArrowLeft, ArrowRight, Wand2, ShieldCheck, Loader2, Info, ImagePlus } from 'lucide-react';
import { getAiSuggestion, AiStylistResponse } from '../services/aiService';
import { Stepper } from '../components/Stepper';
import { Button } from '../components/Button';
import { getModelImage } from '../utils/modelImage';
import { getOutfitImage, getCombinationImage } from '../utils/imageHelper';

const defaultFemaleColors = [
  { id: 'xanh-luc', name: 'Xanh lục trầm', hex: '#1b5b43' },
  { id: 'kem', name: 'Kem', hex: '#f9f6f0' },
  { id: 'xanh-than', name: 'Xanh than', hex: '#1e3a8a' },
  { id: 'nau-dat', name: 'Nâu đất', hex: '#78350f' },
  { id: 'do-do', name: 'Đỏ đô', hex: '#7f1d1d' },
];

const colorHexMap: Record<string, string> = {
  red: '#7f1d1d',
  brown: '#78350f',
  cream: '#f9f6f0',
  green: '#1b5b43',
  navy: '#1e3a8a'
};

const styles = ['Trang nghiêm', 'Tối giản', 'Hiện đại', 'Gen Z'];

const Step4Customize = () => {
  const navigate = useNavigate();
  const { 
    gender, event, clothingId, color, accessories, style, setField,
    generatedPreview
  } = useStylingStore();

  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [suggestion, setSuggestion] = useState<AiStylistResponse | null>(null);
  const [showReason, setShowReason] = useState(false);

  useEffect(() => {
    if (!clothingId) {
      navigate('/step-3');
    }
  }, [clothingId, navigate]);

  if (!clothingId) {
    return null;
  }

  const isMale = gender === 'nam';
  
  let item: any = null;
  let activeColors: { id: string; name: string; hex: string }[] = [];
  let baseImageSrc = getModelImage(gender);
  let combinationImageSrc = null;

  if (isMale) {
    const maleItem = (maleOutfits || []).find(o => o.id === clothingId);
    item = maleItem;
    if (maleItem) {
      const safeColors = maleItem.colors || [];
      activeColors = safeColors.map(c => ({
        id: c.key,
        name: c.label || c.key,
        hex: colorHexMap[c.key] || '#cccccc'
      }));
      
      baseImageSrc = getOutfitImage(maleItem, color || '');
      combinationImageSrc = getCombinationImage(clothingId, color || '', accessories || []);
    }
  } else {
    item = (dataset?.items || []).find((i: any) => i.id === clothingId);
    if (item && item.colors) {
      activeColors = item.colors.map((c: any) => ({
        id: c.key,
        name: c.name,
        hex: c.hex
      }));
      baseImageSrc = getOutfitImage(item, color || '');
      combinationImageSrc = getCombinationImage(clothingId, color || '', accessories || []);
    } else {
      activeColors = defaultFemaleColors;
    }
  }
  
  const previewImageSrc = generatedPreview || combinationImageSrc || baseImageSrc;

  const handleFetchAi = async () => {
    setIsLoadingAi(true);
    setSuggestion(null);
    setShowReason(false);
    
    const context = {
      gender, event, clothingId, clothingName: item?.name || 'Trang phục', color, accessories, style,
      latestUserRequest: "Gợi ý phối đồ tối ưu nhất."
    };
    
    try {
      const response = await getAiSuggestion(context);
      setSuggestion(response);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingAi(false);
    }
  };

  useEffect(() => {
    if (!suggestion && !isLoadingAi) {
      handleFetchAi();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleColorChange = (newColor: string) => {
    setField('color', newColor);
    setField('generatedPreview', null);
    setField('imageGenerationError', null);
  };

  const handleStyleChange = (newStyle: string) => {
    setField('style', newStyle);
    setField('generatedPreview', null);
    setField('imageGenerationError', null);
  };

  const handleApplySuggestion = () => {
    if (suggestion?.changes) {
      if (suggestion.changes.color) setField('color', suggestion.changes.color);
      if (suggestion.changes.style) setField('style', suggestion.changes.style);
      if (suggestion.changes.accessories) setField('accessories', suggestion.changes.accessories);
      setField('generatedPreview', null);
      setField('imageGenerationError', null);
    }
  };

  const getCultureStatus = (score: number) => {
    if (score >= 8) return { label: 'Tuyệt vời', color: 'text-green-600' };
    if (score >= 5) return { label: 'Tạm ổn', color: 'text-yellow-600' };
    return { label: 'Cần chú ý', color: 'text-red-600' };
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col relative overflow-x-hidden animate-in fade-in duration-300">
      <div className="max-w-[1500px] mx-auto px-4 md:px-8 flex-grow flex flex-col w-full relative z-10">
        
        <Stepper currentStep={4} />

        <div className="flex flex-col lg:flex-row gap-6 flex-grow items-start">
          
          {/* Left: Options (25%) */}
          <div className="order-2 lg:order-1 lg:w-[25%] flex flex-col gap-6 lg:sticky top-24 w-full">
             <div className="mb-2 bg-white/60 backdrop-blur-md p-5 rounded-[20px] shadow-sm border border-white/50">
                <h1 className="text-3xl font-serif font-bold text-[#0B4A38] uppercase tracking-wide">TÙY CHỈNH<br/>TRANG PHỤC</h1>
                <p className="text-xs text-gray-600 uppercase mt-2 tracking-widest font-bold opacity-80">{event}</p>
             </div>

             {/* Colors */}
             <div className="bg-white/95 backdrop-blur-md rounded-[20px] p-6 shadow-md border border-white/50">
               <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                 <span className="w-6 h-6 rounded-full bg-[#0B4A38] text-white flex items-center justify-center text-xs shadow-inner">1</span>
                 Màu sắc
               </h3>
               <p className="text-[13px] text-gray-500 mb-5 font-medium">Chọn gam màu phù hợp không gian.</p>
               <div className="grid grid-cols-3 gap-3">
                 {activeColors.map(c => (
                   <button
                     key={c.id}
                     onClick={() => handleColorChange(c.id)}
                     className={`flex flex-col items-center gap-2 py-4 rounded-2xl border-2 transition-all ${
                       color === c.id ? 'border-[#0B4A38] bg-[#0B4A38]/5 shadow-sm scale-[1.02]' : 'border-transparent hover:border-gray-200 hover:bg-gray-50'
                     }`}
                   >
                     <div 
                       className={`w-12 h-12 rounded-full shadow-inner relative flex items-center justify-center transition-all ${color === c.id ? 'ring-2 ring-[#0B4A38] ring-offset-2' : ''}`}
                       style={{ backgroundColor: c.hex }}
                     >
                       {color === c.id && <Check className="w-6 h-6 text-white drop-shadow-md animate-in zoom-in" />}
                     </div>
                     <span className="text-[11px] font-bold text-gray-700 text-center uppercase tracking-wide">{c.name}</span>
                   </button>
                 ))}
               </div>
             </div>

             {/* Style */}
             <div className="bg-white/95 backdrop-blur-md rounded-[20px] p-6 shadow-md border border-white/50">
               <h3 className="font-bold text-gray-800 mb-1 flex items-center gap-2">
                 <span className="w-6 h-6 rounded-full bg-[#0B4A38] text-white flex items-center justify-center text-xs shadow-inner">2</span>
                 Phong cách
               </h3>
               <p className="text-[13px] text-gray-500 mb-5 font-medium">Định hình tinh thần trang phục.</p>
               <div className="grid grid-cols-2 gap-3">
                 {styles.map(s => (
                   <button
                     key={s}
                     onClick={() => handleStyleChange(s)}
                     className={`py-3 px-3 rounded-xl text-sm font-bold border transition-all relative shadow-sm ${
                       style === s ? 'border-[#0B4A38] bg-[#0B4A38]/5 text-[#0B4A38]' : 'border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                     }`}
                   >
                     {s}
                     {style === s && <div className="absolute -top-2 -right-2 w-5 h-5 bg-[#C89B45] rounded-full flex items-center justify-center shadow-md animate-in zoom-in"><Check className="w-3 h-3 text-white"/></div>}
                   </button>
                 ))}
               </div>
             </div>
          </div>

          {/* Center: Preview (45%) */}
          <div className="order-1 lg:order-2 lg:w-[45%] w-full flex flex-col relative h-[600px] lg:h-auto lg:aspect-[3/4] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/50 group bg-white/40">
             {item && (
               <img
                 key={previewImageSrc}
                 src={previewImageSrc}
                 alt="Preview"
                 className="absolute inset-0 w-full h-full object-cover object-top transition-all duration-300 ease-in-out group-hover:scale-105 animate-in fade-in"
                 style={{ filter: 'none' }}
               />
             )}
             <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/80 via-black/30 to-transparent pointer-events-none z-10"></div>
             
             {/* Name overlay */}
             {item && (
               <div className="absolute bottom-8 left-8 right-8 text-white z-20">
                 <h2 className="text-4xl lg:text-5xl font-serif font-bold drop-shadow-lg mb-3">{item.name}</h2>
                 <div className="flex gap-4 opacity-90 text-sm font-bold uppercase tracking-wider">
                   <span className="bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">{event}</span>
                   <span className="bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm border border-white/20">{style || 'Nguyên bản'}</span>
                 </div>
               </div>
             )}
          </div>

          {/* Right: AI Stylist (30%) */}
          <div className="order-3 lg:order-3 lg:w-[30%] w-full flex flex-col gap-6 lg:sticky top-24">
             <div className="bg-white/95 backdrop-blur-xl rounded-[24px] p-7 shadow-2xl border border-white/50 flex flex-col relative overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-4 pb-5 mb-5 border-b border-gray-100 relative z-10">
                   <div className="w-14 h-14 bg-[#0B4A38] rounded-2xl flex items-center justify-center shadow-inner">
                     <Sparkles className="w-7 h-7 text-[#C89B45]" />
                   </div>
                   <div>
                     <h3 className="text-xl font-bold text-[#0B4A38] font-serif">AI Stylist</h3>
                     <p className="text-[13px] text-gray-500 font-medium mt-1">Đồng hành khám phá vẻ đẹp Việt</p>
                   </div>
                </div>

                {isLoadingAi ? (
                  <div className="flex flex-col items-center justify-center py-16 text-[#0B4A38]">
                    <Loader2 className="w-10 h-10 animate-spin mb-4 text-[#C89B45]" />
                    <p className="font-bold text-sm animate-pulse">Đang phân tích lựa chọn của bạn...</p>
                  </div>
                ) : suggestion ? (
                  <div className="flex flex-col relative z-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                    
                    {/* Message Bubble */}
                    <div className="bg-[#f9f6f0] rounded-2xl p-5 rounded-tl-sm mb-6 border border-[#C89B45]/10 relative shadow-sm">
                       <p className="text-gray-800 font-medium leading-relaxed italic text-sm">
                         "{suggestion.message}"
                       </p>
                    </div>

                    {/* Culture Guard */}
                    <div className="mb-8 bg-gradient-to-br from-green-50 to-white rounded-2xl p-5 border border-green-100 shadow-sm flex items-center justify-between">
                       <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-700 shadow-inner">
                             <ShieldCheck className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-[11px] text-gray-500 font-bold uppercase tracking-wider mb-0.5">Phù hợp văn hóa</p>
                            <p className={`font-black text-sm ${getCultureStatus(suggestion.culturalScore).color}`}>
                              {getCultureStatus(suggestion.culturalScore).label}
                            </p>
                          </div>
                       </div>
                       <div className="text-4xl font-black text-[#0B4A38]/20 tracking-tighter">{suggestion.culturalScore.toFixed(1)}</div>
                    </div>
                    
                    {/* Reason Modal/Toggle */}
                    {showReason && (
                      <div className="mb-6 p-4 bg-gray-50 rounded-xl text-sm text-gray-600 leading-relaxed border border-gray-200 animate-in fade-in">
                        {suggestion.reason}
                      </div>
                    )}

                    {/* Actions Grid */}
                    <div className="flex flex-col gap-3 mt-auto">
                       <Button 
                         variant="primary"
                         onClick={handleApplySuggestion}
                         fullWidth
                       >
                         <Check className="w-5 h-5 mr-2" /> ÁP DỤNG GỢI Ý
                       </Button>
                       <div className="grid grid-cols-2 gap-3">
                         <Button 
                           variant="secondary"
                           onClick={handleFetchAi}
                           className="!text-xs !px-2"
                         >
                           <Wand2 className="w-4 h-4 mr-1.5" /> THỬ CÁCH KHÁC
                         </Button>
                         <Button 
                           variant="outline"
                           onClick={() => setShowReason(!showReason)}
                           className="!text-xs !px-2"
                         >
                           <Info className="w-4 h-4 mr-1.5" /> VÌ SAO?
                         </Button>
                       </div>
                    </div>

                  </div>
                ) : (
                  <div className="flex-grow flex flex-col items-center justify-center text-center py-16 opacity-80">
                    <Sparkles className="w-16 h-16 text-gray-200 mb-6" />
                    <p className="text-gray-500 font-medium mb-8">Bạn có muốn xem gợi ý phối đồ từ AI?</p>
                    <Button variant="secondary" onClick={handleFetchAi}>Bật AI Stylist</Button>
                  </div>
                )}

                {/* Visual Try-on Status */}
                <div className="mt-8 pt-6 border-t border-gray-100 relative z-10">
                   <h4 className="text-[13px] font-bold text-gray-800 uppercase tracking-wider mb-4 flex items-center gap-2">
                     <ImagePlus className="w-4 h-4 text-[#C89B45]" />
                     ✨ Ảnh Phối Thực Tế
                   </h4>
                   
                   <div className="bg-gray-50 rounded-xl p-4 text-xs text-gray-600 mb-4 border border-gray-100">
                      <p className="mb-2"><strong>Màu:</strong> {activeColors.find(c => c.id === color)?.name || 'Chưa chọn'}</p>
                      <p className="mb-2"><strong>Phụ kiện:</strong> {accessories.length > 0 ? accessories.join(', ') : 'Không dùng'}</p>
                      <p><strong>Phong cách:</strong> {style || 'Nguyên bản'}</p>
                   </div>

                   {accessories.includes('Không dùng') || accessories.length === 0 ? (
                     <div className="mb-4 p-3 bg-blue-50 text-blue-700 text-xs rounded-lg border border-blue-200">
                       Đang hiển thị màu trang phục nguyên bản.
                     </div>
                   ) : combinationImageSrc ? (
                     <div className="mb-4 p-3 bg-green-50 text-green-700 text-xs rounded-lg border border-green-200 flex items-center font-bold">
                       <Check className="w-4 h-4 mr-2" /> Đã áp dụng ảnh phối phụ kiện hoàn chỉnh.
                     </div>
                   ) : (
                     <div className="mb-4 p-3 bg-orange-50 text-orange-700 text-xs rounded-lg border border-orange-200 italic">
                       Đang xem màu trang phục – chưa có ảnh phối phụ kiện cho lựa chọn này.
                     </div>
                   )}
                </div>

             </div>

             {/* Bottom Navigation */}
             <div className="flex gap-4 sticky bottom-6 z-50">
                <Button 
                  variant="secondary"
                  onClick={() => navigate('/step-3')}
                  fullWidth
                >
                  <ArrowLeft className="w-5 h-5 mr-2" /> Quay lại
                </Button>
                <Button 
                  variant="gold"
                  onClick={() => navigate('/step-5')}
                  fullWidth
                >
                  Tiếp tục <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
             </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4Customize;

