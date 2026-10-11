import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStylingStore } from '../store/useStylingStore';
import dataset from '../data/dataset.json';
import { maleOutfits } from '../data/maleOutfits';
import { Bookmark, RefreshCw, LayoutGrid, Sparkles } from 'lucide-react';
import { Stepper } from '../components/Stepper';
import { Button } from '../components/Button';
import { getModelImage } from '../utils/modelImage';
import { getOutfitImage } from '../utils/imageHelper';

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

const Result = () => {
  const navigate = useNavigate();
  const { gender, event, clothingId, color, style, accessories, culturalScore, reset, generatedPreview } = useStylingStore();
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    if (!clothingId) {
      navigate('/step-1');
    }
  }, [clothingId, navigate]);

  if (!clothingId) {
    return null;
  }

  const isMale = gender === 'nam';

  let item: any = null;
  let activeColors: { id: string; name: string; hex: string }[] = [];
  let mainImageSrc = getModelImage(gender);
  let saveImageSrc = '';

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
      
      const fallbackImage = getOutfitImage(maleItem, color || '');
      
      mainImageSrc = generatedPreview || fallbackImage;
      saveImageSrc = mainImageSrc;
    }
  } else {
    item = (dataset?.items || []).find((i: any) => i.id === clothingId);
    activeColors = defaultFemaleColors;
    if (item) {
      mainImageSrc = generatedPreview || getModelImage(gender); // Fallback to model image
      saveImageSrc = generatedPreview || (item.images && item.images.length > 0 ? `/assets/${item.images[0]}` : '');
    }
  }

  if (!item) return null;

  const colorData = activeColors.find(c => c.id === color) || { id: color, name: color || 'Nguyên bản', hex: '#cccccc' };
  const safeAccessories = accessories || [];
  
  // Mock scores and reasoning if they weren't set by API
  const finalCultScore = culturalScore || 9.2;
  const finalAestheticScore = 9.5; 
  const aiReason = `Bộ trang phục ${item?.name || ''} kết hợp cùng màu ${colorData?.name || 'nguyên bản'} và phong cách ${style || 'truyền thống'} tạo nên sự cân bằng hoàn hảo. Các chi tiết tôn vinh nét đẹp văn hóa Việt, rất phù hợp cho không gian ${event}.`;

  const handleSaveLookbook = () => {
    if (isSaved) return;

    const newLook = {
      id: Date.now().toString(),
      clothingId,
      image: saveImageSrc,
      name: item?.name || 'Outfit',
      gender,
      event,
      color: colorData?.name || 'Nguyên bản',
      style: style || 'Tự do',
      accessories: safeAccessories,
      aestheticScore: finalAestheticScore,
      culturalScore: finalCultScore,
      createdAt: new Date().toISOString()
    };

    const existingStr = localStorage.getItem('smart_viet_phuc_lookbook');
    const existing = existingStr ? JSON.parse(existingStr) : [];
    localStorage.setItem('smart_viet_phuc_lookbook', JSON.stringify([newLook, ...existing]));
    
    setIsSaved(true);
  };

  const handleRestart = () => {
    reset();
    navigate('/step-1');
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col relative overflow-x-hidden animate-in fade-in duration-500">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex-grow flex flex-col w-full relative z-10">
        
        <Stepper currentStep={6} />

        <div className="text-center mb-10">
           <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B4A38] drop-shadow-sm mb-4">
             LOOK CỦA BẠN ĐÃ SẴN SÀNG
           </h2>
           <p className="text-gray-600 font-medium max-w-2xl mx-auto">AI Stylist đã hoàn thiện bộ trang phục dựa trên sở thích, hoàn cảnh và giá trị văn hóa Việt Nam.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 flex-grow items-start">
          
          {/* Left: Image (55%) */}
          <div className="lg:w-[55%] w-full relative h-[650px] lg:h-[750px] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/50 bg-white">
             <img
               src={mainImageSrc}
               alt={item.name}
               className="absolute inset-0 w-full h-full object-cover object-top"
             />
             <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent"></div>
             
             <div className="absolute bottom-8 left-8 right-8 text-white">
               <h2 className="text-4xl font-serif font-bold drop-shadow-lg mb-2">{item.name}</h2>
               <p className="text-sm font-bold uppercase tracking-widest opacity-90">{event} • {gender}</p>
             </div>
          </div>

          {/* Right: Info, Scores, Actions (45%) */}
          <div className="lg:w-[45%] w-full flex flex-col gap-6 sticky top-24">
             
             <div className="bg-white/95 backdrop-blur-md rounded-[24px] p-8 shadow-xl border border-white/50">
               
               <div className="grid grid-cols-2 gap-8 mb-8 pb-8 border-b border-gray-100">
                  {/* Scores */}
                  {/* Thẩm mỹ */}
                  <div className="flex flex-col items-center">
                     <div className="w-24 h-24 rounded-full border-4 border-gray-50 flex items-center justify-center relative mb-4 bg-white shadow-sm">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle cx="44" cy="44" r="44" className="fill-none stroke-[#0B4A38] stroke-[4]" strokeDasharray="276" strokeDashoffset={276 - (276 * finalAestheticScore) / 10} transform="translate(4,4)" />
                        </svg>
                        <div className="text-2xl font-black text-gray-800 flex flex-col items-center leading-none">
                          {finalAestheticScore * 10}
                          <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1">Điểm</span>
                        </div>
                     </div>
                     <p className="font-bold text-gray-800 uppercase tracking-widest text-sm">THẨM MỸ</p>
                  </div>

                  {/* Văn hóa */}
                  <div className="flex flex-col items-center">
                     <div className="w-24 h-24 rounded-full border-4 border-gray-50 flex items-center justify-center relative mb-4 bg-white shadow-sm">
                        <svg className="absolute inset-0 w-full h-full -rotate-90">
                          <circle cx="44" cy="44" r="44" className="fill-none stroke-[#C89B45] stroke-[4]" strokeDasharray="276" strokeDashoffset={276 - (276 * finalCultScore) / 10} transform="translate(4,4)" />
                        </svg>
                        <div className="text-2xl font-black text-gray-800 flex flex-col items-center leading-none">
                          {finalCultScore * 10}
                          <span className="text-[10px] text-gray-400 font-bold tracking-widest uppercase mt-1">Điểm</span>
                        </div>
                     </div>
                     <p className="font-bold text-gray-800 uppercase tracking-widest text-sm">VĂN HÓA</p>
                  </div>
               </div>

               {/* AI Reason */}
               <div className="bg-[#f9f6f0] rounded-[20px] p-6 border border-[#C89B45]/10 mb-8 relative">
                 <div className="absolute -top-3 left-8 w-6 h-6 bg-[#f9f6f0] transform rotate-45 border-l border-t border-[#C89B45]/10"></div>
                 <h4 className="font-bold text-[#0B4A38] text-[13px] mb-3 flex items-center gap-2 uppercase tracking-wide">
                   <Sparkles className="w-4 h-4 text-[#C89B45]" /> Vì sao AI chọn look này?
                 </h4>
                 <p className="text-gray-700 text-sm leading-relaxed font-medium">
                   "{aiReason}"
                 </p>
               </div>

               {/* Info Grid */}
               <div className="grid grid-cols-2 gap-4 mb-8">
                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Màu sắc</p>
                   <div className="flex items-center gap-2">
                     {colorData?.hex && <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: colorData.hex }}></div>}
                     <span className="font-bold text-gray-800 text-sm">{colorData?.name || color || 'Nguyên bản'}</span>
                   </div>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">Phong cách</p>
                   <p className="font-bold text-gray-800 text-sm">{style || 'Tự do'}</p>
                 </div>
                 <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 col-span-2">
                   <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-2">Phụ kiện</p>
                   <div className="flex flex-wrap gap-2">
                     {safeAccessories.length > 0 && !safeAccessories.includes('Không dùng') ? (
                       safeAccessories.map(acc => (
                         <span key={acc} className="px-3 py-1 bg-white text-[#0B4A38] font-bold text-[11px] rounded-lg border border-gray-200">{acc}</span>
                       ))
                     ) : (
                       <span className="text-sm text-gray-500 font-medium">Không dùng phụ kiện</span>
                     )}
                   </div>
                 </div>
               </div>

               {/* Actions */}
               <div className="flex flex-col gap-3">
                 <Button 
                   variant="primary"
                   onClick={handleSaveLookbook}
                   disabled={isSaved}
                   fullWidth
                   className="!h-14 !text-base"
                 >
                   <Bookmark className="w-5 h-5 mr-2" /> {isSaved ? 'ĐÃ LƯU LOOKBOOK' : 'LƯU LOOKBOOK'}
                 </Button>
                 <div className="grid grid-cols-2 gap-3">
                   <Button 
                     variant="outline"
                     onClick={handleRestart}
                     fullWidth
                   >
                     <RefreshCw className="w-4 h-4 mr-2" /> PHỐI LẠI
                   </Button>
                   <Button 
                     variant="outline"
                     onClick={() => navigate('/step-3')}
                     fullWidth
                   >
                     <LayoutGrid className="w-4 h-4 mr-2" /> KHÁC
                   </Button>
                 </div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Result;
