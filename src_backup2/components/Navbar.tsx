import { Globe, ChevronDown, Check, Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';

const navLinks = [
  { label: 'Trang chủ', to: '/' },
  { label: 'Về chúng tôi', to: '/' },
];

const languages = [
  { code: 'vi', label: 'Tiếng Việt' },
  { code: 'en', label: 'English' },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [activeLang, setActiveLang] = useState('vi');
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#FFFDF7]/85 backdrop-blur-[8px] border-b border-[#0B4A38]/5 shadow-[0_4px_20px_rgba(0,0,0,0.02)] transition-all h-[76px] flex items-center">
      <div className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0 flex items-center gap-3 group" onClick={() => setIsOpen(false)}>
          <div className="h-12 w-12 rounded-full overflow-hidden border border-[#C89B45]/30 bg-white p-0.5 transition-transform group-hover:scale-105 shadow-sm">
            <img src="/assets/logo.png" alt="Smart Việt Phục" className="w-full h-full object-contain" />
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-black text-[#0B4A38] text-[15px] tracking-wide font-serif">SMART VIỆT PHỤC</div>
            <div className="text-[9px] text-[#C89B45] font-bold tracking-widest uppercase">Mặc bản sắc • Sống giá trị Việt</div>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-[14.5px] font-bold text-[#233B33] hover:text-[#0B4A38] hover:underline underline-offset-4 decoration-2 decoration-[#C89B45]/60 transition-all whitespace-nowrap"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Language */}
        <div className="flex items-center gap-3">
          <div className="relative hidden md:block" ref={langRef}>
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200/80 bg-white/60 hover:bg-white text-[#233B33] font-bold text-[13px] transition-all shadow-sm hover:shadow-md"
            >
              <Globe className="w-4 h-4 text-[#0B4A38]" />
              Ngôn ngữ
              <ChevronDown className={`w-3.5 h-3.5 text-gray-400 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
            </button>

            {langOpen && (
              <div className="absolute right-0 mt-3 w-40 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => { setActiveLang(lang.code); setLangOpen(false); }}
                    className="w-full flex items-center justify-between px-5 py-2.5 text-[14px] font-bold text-gray-700 hover:bg-[#0B4A38]/5 hover:text-[#0B4A38] transition-colors"
                  >
                    {lang.label}
                    {activeLang === lang.code && <Check className="w-4 h-4 text-[#0B4A38]" />}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-[#0B4A38] p-2 rounded-lg hover:bg-black/5 transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-[76px] left-0 w-full bg-[#FFFDF7] border-b border-gray-100 shadow-2xl animate-in slide-in-from-top-2 duration-200">
          <div className="px-6 py-6 space-y-4 flex flex-col">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block text-lg font-bold text-[#233B33] hover:text-[#0B4A38]"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-gray-200 mt-2">
              <div className="flex gap-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setActiveLang(lang.code)}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-colors ${
                      activeLang === lang.code
                        ? 'bg-[#0B4A38] text-white border-[#0B4A38]'
                        : 'border-gray-200 text-gray-600 hover:border-[#0B4A38]'
                    }`}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
