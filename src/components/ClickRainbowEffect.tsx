import React, { useEffect, useState, useCallback } from "react";
import "./ClickRainbowEffect.css";

interface Particle {
  id: string;
  color: string;
  size: number;
  angle: number;
  curve: number;
  dist: number;
  duration: number;
  isSparkle: boolean;
}

interface ClickEvent {
  id: string;
  x: number;
  y: number;
  particles: Particle[];
}

// Bảng màu Xanh lá và Vàng thương hiệu
const GREEN_COLORS = ["#0F8F5B", "#22C55E", "#34D399"];
const YELLOW_COLORS = ["#D4A017", "#FACC15", "#FFD54A"];

export const ClickRainbowEffect: React.FC = () => {
  const [clicks, setClicks] = useState<ClickEvent[]>([]);

  const handlePointerDown = useCallback((e: PointerEvent) => {
    // Tôn trọng cài đặt hệ thống của người dùng
    if (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const { clientX, clientY } = e;
    const newClickId = Date.now().toString() + Math.random().toString();
    
    // Tối đa số click đồng thời để không lag
    setClicks(prev => {
      if (prev.length > 5) return prev;
      
      const particles: Particle[] = [];
      const totalOrbs = 10 + Math.floor(Math.random() * 3); // 10 - 12 particles
      
      // Tạo mảng màu xanh lá (60%) và vàng (40%)
      const colorsForThisClick: string[] = [];
      for(let i = 0; i < totalOrbs; i++) {
        const isGreen = Math.random() < 0.6;
        if (isGreen) {
          colorsForThisClick.push(GREEN_COLORS[Math.floor(Math.random() * GREEN_COLORS.length)]);
        } else {
          colorsForThisClick.push(YELLOW_COLORS[Math.floor(Math.random() * YELLOW_COLORS.length)]);
        }
      }

      // Xáo trộn nhẹ góc để các màu phân bố đều
      const baseAngleOffset = Math.random() * 360;

      // Sinh hạt tỏa ra
      colorsForThisClick.forEach((color, i) => {
        const isLarge = Math.random() > 0.85; // 15% hạt lớn
        const angle = baseAngleOffset + (i * (360 / colorsForThisClick.length)) + (Math.random() * 20 - 10);
        const curve = (Math.random() * 60 - 30); // Độ cong -30deg đến 30deg
        const dist = 60 + Math.random() * 60; // 60px đến 120px
        
        particles.push({
          id: `${newClickId}-orb-${i}`,
          color,
          size: isLarge ? (24 + Math.random() * 4) : (12 + Math.random() * 10), // 24-28px hoặc 12-22px
          angle,
          curve,
          dist,
          duration: 750 + Math.random() * 200, // 750ms - 950ms
          isSparkle: false
        });
      });

      // Sinh hạt sáng (sparkles)
      const sparkleCount = Math.floor(Math.random() * 3) + 3; // 3 - 5 sparkles
      for(let i = 0; i < sparkleCount; i++) {
        const angle = Math.random() * 360;
        const curve = (Math.random() * 40 - 20);
        const dist = 70 + Math.random() * 50; 
        
        particles.push({
          id: `${newClickId}-sparkle-${i}`,
          color: "#ffffff",
          size: 3 + Math.random() * 3, // 3-6px
          angle,
          curve,
          dist,
          duration: 700 + Math.random() * 200,
          isSparkle: true
        });
      }

      const newClick: ClickEvent = { id: newClickId, x: clientX, y: clientY, particles };

      // Tự dọn dẹp sau 1.2s (đảm bảo animation chạy xong)
      setTimeout(() => {
        setClicks(current => current.filter(c => c.id !== newClickId));
      }, 1200);

      return [...prev, newClick];
    });
  }, []);

  useEffect(() => {
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [handlePointerDown]);

  if (clicks.length === 0) return null;

  return (
    <div className="rainbow-effect-container">
      {clicks.map(click => (
        <div 
          key={click.id} 
          className="rainbow-click-origin"
          style={{ left: click.x, top: click.y }}
        >
          {/* Vòng sáng trung tâm */}
          <div className="rainbow-ring"></div>
          
          {/* Quả cầu & Hạt sáng */}
          {click.particles.map(p => (
            <div
              key={p.id}
              className={p.isSparkle ? "rainbow-sparkle" : "rainbow-particle"}
              style={{
                "--bg-color": p.color,
                "--shadow-color": p.isSparkle ? "transparent" : `${p.color}80`,
                width: p.size,
                height: p.size,
                "--angle": `${p.angle}deg`,
                "--curve": `${p.curve}deg`,
                "--dist": `${p.dist}px`,
                animationDuration: `${p.duration}ms`,
              } as React.CSSProperties}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

