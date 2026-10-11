import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, Eye, Calendar, Sparkles } from 'lucide-react';

const Lookbook = () => {
  const navigate = useNavigate();
  const [looks, setLooks] = useState<any[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('smart_viet_phuc_lookbook');
    if (saved) {
      setLooks(JSON.parse(saved));
    }
  }, []);

  const handleDelete = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa look này?')) {
      const updated = looks.filter(l => l.id !== id);
      setLooks(updated);
      localStorage.setItem('smart_viet_phuc_lookbook', JSON.stringify(updated));
    }
  };

  return (
    <div className="min-h-screen pt-20 flex flex-col relative overflow-x-hidden">
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none">
         
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 flex-grow flex flex-col w-full relative z-10">
        
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-viet-green mb-4">LOOKBOOK CỦA BẠN</h1>
          <p className="text-gray-600">Những bộ trang phục mang đậm bản sắc Việt do chính bạn tạo ra.</p>
        </div>

        {looks.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-dashed border-gray-300 shadow-sm">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center text-gray-300 mb-4">
               <Sparkles className="w-10 h-10" />
             </div>
             <h3 className="text-xl font-bold text-gray-500 mb-2">Lookbook đang trống</h3>
             <p className="text-gray-400 mb-6">Bạn chưa lưu bộ trang phục nào.</p>
             <button 
               onClick={() => navigate('/')}
               className="px-8 py-3 bg-viet-green text-white font-bold rounded-full hover:bg-viet-green-light transition-colors"
             >
               PHỐI ĐỒ NGAY
             </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {looks.map(look => (
              <div key={look.id} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100 group">
                <div className="relative h-80 overflow-hidden bg-gray-100">
                  <img src={look.image.startsWith('/') || look.image.startsWith('http') || look.image.startsWith('data:') ? look.image : `/assets/${look.image}`} alt={look.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <h3 className="text-2xl font-serif font-bold mb-1 line-clamp-1">{look.name}</h3>
                    <p className="text-sm opacity-90 uppercase tracking-widest font-medium">{look.event} • {look.gender}</p>
                  </div>
                </div>

                <div className="p-5 flex flex-col gap-4">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4"/> {new Date(look.createdAt).toLocaleDateString('vi-VN')}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mt-2">
                    <button 
                      onClick={() => navigate(`/clothing/${look.clothingId}`)}
                      className="py-2.5 rounded-xl bg-viet-cream text-viet-green font-bold hover:bg-viet-green hover:text-white transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Eye className="w-4 h-4" /> XEM
                    </button>
                    <button 
                      onClick={() => handleDelete(look.id)}
                      className="py-2.5 rounded-xl bg-white border border-gray-200 text-red-500 font-bold hover:bg-red-50 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      <Trash2 className="w-4 h-4" /> XÓA
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Lookbook;

