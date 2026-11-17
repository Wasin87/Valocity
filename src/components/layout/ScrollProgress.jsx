import React, { useState, useEffect } from 'react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const currentScroll = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        setScrollProgress((currentScroll / scrollHeight) * 100);
      }
    };

    window.addEventListener('scroll', updateScrollProgress, { passive: true });
    return () => window.removeEventListener('scroll', updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] bg-[#0B0B0D] z-50 pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-[#C5A878] via-[#E0C79B] to-[#C5A878] transition-all duration-150 ease-out shadow-[0_0_8px_rgba(197,168,120,0.6)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
