import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStylingStore } from '../store/useStylingStore';
import dataset from '../data/dataset.json';
import { maleOutfits } from '../data/maleOutfits';
import { ArrowLeft, ArrowRight, Edit3, Landmark, Palette, Sparkles, Gem, CheckCircle2 } from 'lucide-react';
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

const Step5Preview = () => {
  const navigate = useNavigate();
  const { gender, event, clothingId, color, style, accessories, generatedPreview } = useStylingStore();
  const [activeImage, setActiveImage] = useState(0);

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
  let thumbnails: string[] = [];
  let mainImageSrc = getModelImage(gender);

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
      thumbnails = [fallbackImage]; // Male dataset only has 1 relevant image (the color)
    }
  } else {
    item = (dataset?.items || []).find((i: any) => i.id === clothingId);
    activeColors = defaultFemaleColors;
    if (item) {
      thumbnails = (item.images || []).map((img: string) => `/assets/${img}`);
      mainImageSrc = generatedPreview || getModelImage(gender); // Fallback to model image

    }
  }

  if (!item) return null;

  const colorData = activeColors.find(c => c.id === color) || { id: color, name: color || 'Nguyên bản', hex: '#cccccc' };
  const summaryThumb = thumbnails.length > 0 ? thumbnails[0] : getModelImage(gender);
  const safeAccessories = accessories || [];

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col relative overflow-x-hidden animate-in fade-in duration-300">
      <div className="max-w-[1400px] mx-auto px-4 md:px-8 flex-grow flex flex-col w-full relative z-10">
        
        <Stepper currentStep={5} />

        <div className="text-center mb-10">
           <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B4A38] drop-shadow-sm mb-4">
             Xem trước bộ Việt phục của bạn
           </h2>
           <p className="text-gray-600 font-medium max-w-2xl mx-auto">Kiểm tra lại toàn bộ diện mạo trước khi xem kết quả cuối cùng.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 flex-grow items-start">
          
          {/* Left/Center: Image & Gallery (65%) */}
          <div className="lg:w-[65%] w-full flex flex-col gap-6">
             <div className="flex flex-col md:flex-row gap-6 h-[600px]">
                {/* Thumbnails if > 1 image */}
                {thumbnails.length > 1 && (
                  <div className="md:w-28 flex md:flex-col gap-3 overflow-auto hide-scrollbar order-2 md:order-1">
                    {thumbnails.map((img, idx) => (
                      <button 
                        key={idx} 
                        onClick={() => setActiveImage(idx)}
                        className={`w-20 md:w-full aspect-[3/4] flex-shrink-0 rounded-[20px] overflow-hidden border-2 transition-all ${
                          activeImage === idx ? 'border-[#C89B45] shadow-md scale-105' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-[1.02]'
                        }`}
                      >
                        <img src={img} alt={`${item.name} ${idx+1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
                
                {/* Main Image */}
                <div className={`flex-1 rounded-[32px] overflow-hidden shadow-2xl border-4 border-white/50 order-1 md:order-2 bg-white relative group`}>
                   <img 
                     src={thumbnails.length > 1 ? thumbnails[activeImage] : mainImageSrc} 
                     alt={item.name} 
                     className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]" 
                   />
                </div>
             </div>
          </div>

          {/* Right: Summary Panel (35%) */}
          <div className="lg:w-[35%] w-full flex flex-col sticky top-24">
             <div className="bg-white/95 backdrop-blur-md rounded-[24px] p-6 lg:p-8 shadow-xl border border-white/50">
                <div className="flex items-center gap-3 border-b border-gray-100 pb-5 mb-6">
                   <div className="w-12 h-12 bg-[#0B4A38]/5 rounded-xl flex items-center justify-center">
                     <CheckCircle2 className="w-6 h-6 text-[#0B4A38]" />
                   </div>
                   <h2 className="text-2xl font-serif font-bold text-gray-800">Tóm tắt lựa chọn</h2>
                </div>

                <div className="flex flex-col gap-6 mb-8">
                   
                   {/* Event */}
                   <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#C89B45] shadow-sm">
                           <Landmark className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-1">Dịp sử dụng</p>
                            <p className="font-bold text-gray-800">{event || 'Chưa chọn'}</p>
                         </div>
                      </div>
                      <button onClick={() => navigate('/step-2')} className="text-xs text-[#0B4A38] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0B4A38]/5 px-2 py-1 rounded-md">
                        <Edit3 className="w-3 h-3"/> Sửa
                      </button>
                   </div>

                   {/* Clothing */}
                   <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center shadow-sm">
                           <img src={summaryThumb} className="w-full h-full object-cover" alt="thumb"/>
                         </div>
                         <div>
                            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-1">Bộ trang phục</p>
                            <p className="font-bold text-gray-800 line-clamp-1">{item.name || 'Chưa chọn'}</p>
                         </div>
                      </div>
                      <button onClick={() => navigate('/step-3')} className="text-xs text-[#0B4A38] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0B4A38]/5 px-2 py-1 rounded-md">
                        <Edit3 className="w-3 h-3"/> Sửa
                      </button>
                   </div>

                   {/* Color */}
                   <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#C89B45] shadow-sm">
                           <Palette className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-1">Màu sắc</p>
                            <div className="flex items-center gap-2">
                              {colorData?.hex && (
                                <div className="w-4 h-4 rounded-full shadow-sm ring-1 ring-black/5" style={{ backgroundColor: colorData.hex }}></div>
                              )}
                              <p className="font-bold text-gray-800">{colorData?.name || color || 'Nguyên bản'}</p>
                            </div>
                         </div>
                      </div>
                      <button onClick={() => navigate('/step-4')} className="text-xs text-[#0B4A38] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0B4A38]/5 px-2 py-1 rounded-md">
                        <Edit3 className="w-3 h-3"/> Sửa
                      </button>
                   </div>

                   {/* Style */}
                   <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#C89B45] shadow-sm">
                           <Sparkles className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-1">Phong cách</p>
                            <p className="font-bold text-gray-800">{style || 'Tự do'}</p>
                         </div>
                      </div>
                      <button onClick={() => navigate('/step-4')} className="text-xs text-[#0B4A38] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0B4A38]/5 px-2 py-1 rounded-md">
                        <Edit3 className="w-3 h-3"/> Sửa
                      </button>
                   </div>

                   {/* Accessories */}
                   <div className="flex items-center justify-between group">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center text-[#C89B45] shadow-sm">
                           <Gem className="w-5 h-5" />
                         </div>
                         <div>
                            <p className="text-[11px] text-gray-400 uppercase tracking-widest font-bold mb-1">Phụ kiện</p>
                            <p className="font-bold text-gray-800">
                              {safeAccessories.length > 0 && !safeAccessories.includes('Không dùng') ? safeAccessories.join(', ') : 'Không dùng phụ kiện'}
                            </p>
                         </div>
                      </div>
                      <button onClick={() => navigate('/step-4')} className="text-xs text-[#0B4A38] font-bold flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0B4A38]/5 px-2 py-1 rounded-md">
                        <Edit3 className="w-3 h-3"/> Sửa
                      </button>
                   </div>

                </div>

                {/* Actions */}
                <div className="flex flex-col gap-3 pt-6 border-t border-gray-100">
                  <Button 
                    variant="gold"
                    onClick={() => navigate('/result')}
                    fullWidth
                    className="!h-14 !text-base"
                  >
                    HOÀN THIỆN <ArrowRight className="w-5 h-5 ml-1" />
                  </Button>
                  <Button 
                    variant="secondary"
                    onClick={() => navigate('/step-4')}
                    fullWidth
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
                  </Button>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step5Preview;
