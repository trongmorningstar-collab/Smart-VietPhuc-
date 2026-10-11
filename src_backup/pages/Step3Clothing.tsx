import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, Sparkles, Eye, Info } from 'lucide-react';
import { useStylingStore } from '../store/useStylingStore';
import dataset from '../data/dataset.json';
import { maleOutfits, MaleOutfit } from '../data/maleOutfits';
import { ClothingItem } from '../types';
import { Stepper } from '../components/Stepper';
import { Button } from '../components/Button';
import { getModelImage } from '../utils/modelImage';
import { getOutfitImage } from '../utils/imageHelper';

const Step3Clothing = () => {
  const navigate = useNavigate();
  const { gender, event, clothingId, setField } = useStylingStore();

  useEffect(() => {
    if (!gender || !event) {
      navigate('/step-1');
    }
  }, [gender, event, navigate]);

  if (!gender || !event) {
    return null;
  }

  const isMale = gender === 'nam';
  const datasetGender = isMale ? 'male' : 'female';
  
  // Female uses dataset.json, Male uses the new maleOutfits structure
  const femaleList: ClothingItem[] = (dataset?.items || []).filter(
    (item: any) => item?.gender === datasetGender
  );

  const handleSelectClothing = (id: string) => {
    setField('clothingId', id);
    if (isMale) {
      // Find default color and set it immediately
      const outfit = (maleOutfits || []).find(o => o.id === id);
      if (outfit && outfit.representativeColor) {
        setField('color', outfit.representativeColor);
      }
    }
  };

  const handleViewDetails = (id: string) => {
    navigate(`/clothing/${id}`);
  };

  const renderFemaleGrid = () => {
    return (femaleList || []).map((item) => {
      const isSelected = clothingId === item?.id;
      const tags = (item?.web_tags || []).slice(0, 3);
      
      return (
        <div 
          key={item.id || Math.random().toString()} 
          className={`bg-white/95 backdrop-blur-md rounded-[22px] overflow-hidden transition-all duration-300 flex flex-col h-[520px] ${
            isSelected 
              ? 'border-2 border-[#C89B45] shadow-2xl ring-4 ring-[#C89B45]/10 scale-[1.02]' 
              : 'border border-white shadow-md hover:shadow-xl hover:border-[#C89B45]/30 hover:scale-[1.01]'
          }`}
        >
          {/* Image */}
          <div className="relative h-64 overflow-hidden group">
            <img 
              src={item?.images?.[0] ? `/assets/${item.images[0]}` : getModelImage(gender)} 
              alt={item?.name || 'Outfit'} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isSelected && (
              <div className="absolute top-4 right-4 bg-[#C89B45] p-2 rounded-full shadow-xl z-10 animate-in zoom-in duration-200">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow bg-white">
            <h3 className="font-bold font-serif text-xl text-[#0B4A38] mb-1 line-clamp-2 min-h-[56px]">{item?.name || ''}</h3>
            <p className="text-xs text-gray-500 mb-4 font-bold uppercase tracking-wider">{item?.category || ''}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag: string, idx: number) => (
                <span key={idx} className="bg-[#0B4A38]/5 text-[#0B4A38] font-bold text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-lg border border-[#0B4A38]/10">
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
               <Button
                 variant={isSelected ? "primary" : "outline"}
                 onClick={() => handleSelectClothing(item.id)}
                 className="text-xs px-2 h-10 rounded-xl"
               >
                 <Eye className="w-4 h-4 mr-1.5" /> THỬ BỘ NÀY
               </Button>
               <Button
                 variant="secondary"
                 onClick={() => handleViewDetails(item.id)}
                 className="text-xs px-2 h-10 rounded-xl"
               >
                 <Info className="w-4 h-4 mr-1.5" /> TÌM HIỂU
               </Button>
            </div>
          </div>
        </div>
      );
    });
  };

  const renderMaleGrid = () => {
    return (maleOutfits || []).map((item: MaleOutfit) => {
      const isSelected = clothingId === item?.id;
      const tags = (item?.tags || []).slice(0, 3);
      const thumbnail = getOutfitImage(item, item?.representativeColor || '');
      
      return (
        <div 
          key={item.id || Math.random().toString()} 
          className={`bg-white/95 backdrop-blur-md rounded-[22px] overflow-hidden transition-all duration-300 flex flex-col h-[520px] ${
            isSelected 
              ? 'border-2 border-[#C89B45] shadow-2xl ring-4 ring-[#C89B45]/10 scale-[1.02]' 
              : 'border border-white shadow-md hover:shadow-xl hover:border-[#C89B45]/30 hover:scale-[1.01]'
          }`}
        >
          {/* Image */}
          <div className="relative h-64 overflow-hidden group">
            <img 
              src={thumbnail} 
              alt={item?.name || 'Outfit'} 
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            {isSelected && (
              <div className="absolute top-4 right-4 bg-[#C89B45] p-2 rounded-full shadow-xl z-10 animate-in zoom-in duration-200">
                <Check className="w-4 h-4 text-white" />
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6 flex flex-col flex-grow bg-white">
            <h3 className="font-bold font-serif text-xl text-[#0B4A38] mb-1 line-clamp-2 min-h-[56px]">{item?.name || ''}</h3>
            <p className="text-xs text-gray-500 mb-4 font-bold uppercase tracking-wider">{item?.category || ''}</p>
            
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-6">
              {tags.map((tag: string, idx: number) => (
                <span key={idx} className="bg-[#0B4A38]/5 text-[#0B4A38] font-bold text-[11px] uppercase tracking-wide px-3 py-1.5 rounded-lg border border-[#0B4A38]/10">
                  {tag}
                </span>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-auto grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
               <Button
                 variant={isSelected ? "primary" : "outline"}
                 onClick={() => handleSelectClothing(item.id)}
                 className="text-xs px-2 h-10 rounded-xl"
               >
                 <Eye className="w-4 h-4 mr-1.5" /> THỬ BỘ NÀY
               </Button>
               <Button
                 variant="secondary"
                 onClick={() => handleViewDetails(item.id)}
                 className="text-xs px-2 h-10 rounded-xl"
               >
                 <Info className="w-4 h-4 mr-1.5" /> TÌM HIỂU
               </Button>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen pt-24 pb-12 flex flex-col relative z-10 px-4 md:px-8 animate-in fade-in duration-300">
      <div className="max-w-7xl mx-auto w-full flex flex-col flex-grow">
        
        <Stepper currentStep={3} />

        <div className="text-center mb-10">
           <h2 className="text-4xl md:text-5xl font-serif font-bold text-[#0B4A38] drop-shadow-sm mb-4 uppercase">
             CHỌN TRANG PHỤC {gender}
           </h2>
           <p className="text-gray-600 font-medium max-w-2xl mx-auto">Trang phục truyền thống giúp bạn thể hiện lòng thành kính, sự thanh tịnh và nét đẹp văn hóa Việt.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 mb-10 items-start">
           {/* Left AI Stylist */}
           <div className="w-full lg:w-[320px] bg-white/95 backdrop-blur-xl rounded-[22px] overflow-hidden shadow-xl border border-white/50 sticky top-24 flex flex-col">
              {/* Model image preview */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={getModelImage(gender)}
                  alt={gender === 'nam' ? 'Nam' : 'Nữ'}
                  className="w-full h-full object-cover object-top"
                />
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#0B4A38]/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <p className="font-bold font-serif text-xl drop-shadow">{gender === 'nam' ? 'NAM' : 'NỮ'}</p>
                  <p className="text-xs text-gray-200 font-medium">{event}</p>
                </div>
              </div>

              {/* AI panel */}
              <div className="p-6 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-[#0B4A38] rounded-xl flex items-center justify-center text-[#C89B45] shadow-inner flex-shrink-0">
                      <Sparkles className="w-5 h-5" />
                   </div>
                   <div>
                     <h4 className="font-bold text-[#0B4A38] text-base font-serif">AI Stylist</h4>
                     <p className="text-[11px] text-gray-500 font-medium">Tư vấn dựa trên {event}</p>
                   </div>
                </div>
                <div className="bg-[#0B4A38]/5 p-4 rounded-xl border border-[#0B4A38]/10">
                  <p className="text-gray-700 text-sm font-medium leading-relaxed">
                    Dựa trên dịp <strong className="text-[#0B4A38]">{event}</strong>, hệ thống đã lọc các trang phục phù hợp nhất với tiêu chí thanh nhã, tôn dáng và trang nghiêm.
                  </p>
                </div>
              </div>
           </div>

           {/* Right Grid */}
           <div className="flex-grow w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {isMale ? renderMaleGrid() : renderFemaleGrid()}
              </div>
           </div>
        </div>

        {/* Bottom Actions */}
        <div className="sticky bottom-6 flex justify-center gap-4 mt-12 bg-white/80 py-4 px-6 rounded-[24px] backdrop-blur-md border border-white/50 shadow-lg w-full sm:w-fit mx-auto z-50">
          <Button 
            variant="secondary"
            onClick={() => navigate('/step-2')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" /> Quay lại
          </Button>
          <Button 
            variant="primary"
            onClick={() => navigate('/step-4')}
            disabled={!clothingId}
          >
            Tiếp tục <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Step3Clothing;
