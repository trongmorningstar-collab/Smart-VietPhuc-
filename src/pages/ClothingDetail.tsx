import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, BookOpen, Layers, Star } from 'lucide-react';
import dataset from '../data/dataset.json';
import { ClothingItem } from '../types';
import { useState } from 'react';

const ClothingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const item: ClothingItem | undefined = dataset.items.find((i: any) => i.id === id);
  const [activeImage, setActiveImage] = useState(0);

  if (!item) {
    return <div className="p-20 text-center">Không tìm thấy trang phục.</div>;
  }

  return (
    <div className="min-h-screen pt-20 flex flex-col relative">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
         
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full relative z-10 flex flex-col">
        
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-8 flex gap-2">
          <button onClick={() => navigate('/')} className="hover:text-viet-green">Trang chủ</button> &gt; 
          <button onClick={() => navigate('/step-3')} className="hover:text-viet-green">Bộ sưu tập</button> &gt; 
          <span className="text-viet-green font-medium">{item.name}</span>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-viet-green mb-4">TÌM HIỂU VỀ BỘ VIỆT PHỤC</h1>
          <p className="text-gray-600">Mỗi bộ Việt phục là một câu chuyện văn hóa, kết tinh từ lịch sử, thẩm mỹ và tâm hồn Việt.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 flex-grow">
          
          {/* Left: Gallery & Main Image */}
          <div className="lg:w-1/2 flex gap-4 h-[600px]">
            {/* Thumbnails */}
            {item.images.length > 1 && (
              <div className="w-24 flex flex-col gap-3 overflow-y-auto hide-scrollbar">
                {item.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={`w-full aspect-[3/4] rounded-lg overflow-hidden border-2 transition-all ${
                      activeImage === idx ? 'border-viet-gold shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={`/assets/${img}`} alt={`${item.name} ${idx+1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
            
            {/* Main Image */}
            <div className="flex-1 rounded-2xl overflow-hidden bg-white shadow-lg border border-viet-gold/20 relative">
              {/* Optional Arch framing effect like the reference image */}
              <div className="absolute inset-4 border-2 border-viet-gold/30 rounded-t-full pointer-events-none z-10"></div>
              <img 
                src={`/assets/${item.images[activeImage]}`} 
                alt={item.name} 
                className="w-full h-full object-cover" 
              />
            </div>
          </div>

          {/* Right: Info */}
          <div className="lg:w-1/2 flex flex-col">
            <h2 className="text-4xl font-serif font-bold text-gray-800 mb-2">{item.name}</h2>
            <p className="text-viet-gold font-medium mb-8 text-lg">{item.period_region}</p>

            <div className="space-y-6 flex-grow">
              
              {/* Origin */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4">
                 <div className="w-12 h-12 bg-viet-cream rounded-full flex-shrink-0 flex items-center justify-center">
                    <BookOpen className="w-6 h-6 text-viet-green" />
                 </div>
                 <div>
                    <h3 className="font-bold text-viet-green text-lg mb-2">Nguồn gốc</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.origin}</p>
                 </div>
              </div>

              {/* Features */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4">
                 <div className="w-12 h-12 bg-viet-cream rounded-full flex-shrink-0 flex items-center justify-center">
                    <Layers className="w-6 h-6 text-viet-green" />
                 </div>
                 <div>
                    <h3 className="font-bold text-viet-green text-lg mb-2">Đặc điểm</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.features}</p>
                 </div>
              </div>

              {/* Meaning */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex gap-4">
                 <div className="w-12 h-12 bg-viet-cream rounded-full flex-shrink-0 flex items-center justify-center">
                    <Star className="w-6 h-6 text-viet-green" />
                 </div>
                 <div>
                    <h3 className="font-bold text-viet-green text-lg mb-2">Ý nghĩa / Bối cảnh</h3>
                    <p className="text-gray-600 leading-relaxed text-sm md:text-base">{item.meaning_context}</p>
                 </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="flex justify-center mt-12 mb-8 gap-6">
          <button 
            onClick={() => navigate(-1)}
            className="px-8 py-3 rounded-full font-medium border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </button>
          
          <button 
            onClick={() => {
              // Option to immediately select this clothing and go back
              // navigate('/step-3'); // Or update state if needed
              navigate(-1);
            }}
            className="px-10 py-3 rounded-full font-medium bg-viet-green text-white hover:bg-viet-green-light transition-colors shadow-md flex items-center gap-2"
          >
            <Check className="w-5 h-5" /> Đã hiểu
          </button>
        </div>

      </div>
    </div>
  );
};

export default ClothingDetail;

