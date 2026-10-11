import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import { PageTransition } from './components/PageTransition';
import { ClickRainbowEffect } from './components/ClickRainbowEffect';
import Home from './pages/Home';
import Step1Gender from './pages/Step1Gender';
import Step2Event from './pages/Step2Event';
import Step3Clothing from './pages/Step3Clothing';
import Step4Customize from './pages/Step4Customize';
import Step5Preview from './pages/Step5Preview';
import ClothingDetail from './pages/ClothingDetail';
import Result from './pages/Result';
import Lookbook from './pages/Lookbook';

function App() {
  return (
    <Router>
      <div 
        className="min-h-screen flex flex-col font-sans bg-cover bg-center bg-no-repeat relative bg-fixed"
        style={{ backgroundImage: "url('/assets/smart-viet-phuc-background.jpg')" }}
      >
        <ClickRainbowEffect />
        {/* Global overlay for readability */}
        <div className="absolute inset-0 bg-white/60 pointer-events-none z-0"></div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow flex flex-col pt-[68px]">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/step-1" element={<Step1Gender />} />
                <Route path="/step-2" element={<Step2Event />} />
                <Route path="/step-3" element={<Step3Clothing />} />
                <Route path="/step-4" element={<Step4Customize />} />
                <Route path="/step-5" element={<Step5Preview />} />
                <Route path="/clothing/:id" element={<ClothingDetail />} />
                <Route path="/result" element={<Result />} />
                <Route path="/lookbook" element={<Lookbook />} />
              </Routes>
            </PageTransition>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
