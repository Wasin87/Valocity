import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, ChevronRight, Play, Pause, Volume2, VolumeX, Sparkles, ChevronDown, Zap, Gauge, Flame } from 'lucide-react';

const HERO_VIDEOS = [
  {
    id: 'video-porsche',
    title: 'ENGINEERED TO INSPIRE.',
    subtitle: 'THE 2025 PORSCHE 911 GT3 RS & FERRARI SF90',
    desc: 'Discover the extraordinary world of premium automotive and technology.',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-sports-car-driving-on-a-road-at-sunset-41481-large.mp4',
    stats: { hp: '986 HP', accel: '2.5s', speed: '340 km/h' }
  },
  {
    id: 'video-amg',
    title: 'BEYOND PERFORMANCE.',
    subtitle: 'MERCEDES-AMG G63 MANSORY & BESPOKE ICONS',
    desc: 'Command every horizon with luxury off-road iconography and indestructible titanium engineering.',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-car-driving-fast-on-a-highway-at-night-42289-large.mp4',
    stats: { hp: '845 HP', accel: '2.6s', speed: '240 km/h' }
  },
  {
    id: 'video-electric',
    title: 'THE FUTURE IS ELECTRIC.',
    subtitle: 'TESLA CYBERBEAST & NEXT-GEN HYPERCAR EV',
    desc: 'Instant 1,020 HP torque delivery. The pinnacle of automotive intelligence and flagship hardware.',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-car-driving-through-a-neon-tunnel-41478-large.mp4',
    stats: { hp: '1,020 HP', accel: '1.99s', speed: '322 km/h' }
  }
];

export default function CinematicHeroBanner({ onNavigate }) {
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef(null);

  const currentVideo = HERO_VIDEOS[activeVideoIndex];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
      videoRef.current.play().catch(() => {});
    }
  }, [activeVideoIndex]);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleNextVideo = () => {
    setVideoLoaded(false);
    setActiveVideoIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
  };

  return (
    <section className="relative w-full min-h-[95vh] sm:min-h-screen flex items-center justify-center overflow-hidden bg-[#0B0B0D] border-b border-[#242426] select-none">
      
      {/* 1. CINEMATIC BACKGROUND VIDEO STREAM */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          autoPlay
          muted={isMuted}
          loop
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
          className={`w-full h-full object-cover object-center scale-105 transition-opacity duration-1000 ${
            videoLoaded ? 'opacity-85' : 'opacity-25'
          }`}
        >
          <source src={currentVideo.url} type="video/mp4" />
        </video>

        {/* Fallback image */}
        {!videoLoaded && (
          <img
            src="/src/assets/images/hero_porsche_911_gt3_1794232705362.jpg"
            alt="Hero Background"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}

        {/* Multi-layered Obsidian Dark Scrim Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0D] via-[#0B0B0D]/65 to-[#0B0B0D]/45" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0D]/95 via-[#0B0B0D]/60 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-[#C5A878]/15 via-transparent to-transparent" />
      </div>

      {/* 2. HERO CONTENT & TYPOGRAPHY */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 w-full flex flex-col justify-between min-h-[88vh]">
        
        {/* Top Tag & Video Selector Indicator */}
        <div className="flex items-center justify-between gap-4">
          <motion.div 
            key={currentVideo.id + '-tag'}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#171719]/85 border border-[#C5A878]/30 backdrop-blur-md shadow-xl"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C5A878] animate-pulse" />
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.2em] text-[#C5A878]">
              {currentVideo.subtitle}
            </span>
          </motion.div>

          {/* Video Controls (Play/Pause & Mute & Scene Switcher) */}
          <div className="flex items-center gap-2">
            <button
              onClick={togglePlay}
              className="p-2.5 rounded-xl bg-[#171719]/80 border border-[#242426] text-[#A7A9AC] hover:text-[#C5A878] hover:border-[#C5A878]/50 backdrop-blur-md transition-all shadow-lg"
              title={isPlaying ? "Pause Video" : "Play Video"}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={toggleMute}
              className="p-2.5 rounded-xl bg-[#171719]/80 border border-[#242426] text-[#A7A9AC] hover:text-[#C5A878] hover:border-[#C5A878]/50 backdrop-blur-md transition-all shadow-lg"
              title={isMuted ? "Unmute Audio" : "Mute Audio"}
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
            </button>

            <button
              onClick={handleNextVideo}
              className="px-3.5 py-1.5 rounded-xl bg-[#171719]/80 border border-[#242426] text-[#C5A878] font-mono text-xs font-bold hover:bg-[#242426] backdrop-blur-md transition-all flex items-center gap-1 shadow-lg"
            >
              Film {activeVideoIndex + 1}/{HERO_VIDEOS.length} <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Main Headline & Master Prompt CTAs */}
        <div className="max-w-4xl space-y-6 my-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVideo.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-extrabold font-display text-[#F5F4F0] tracking-tight leading-[1.02]">
                {currentVideo.title.split('.').map((part, i) => (
                  <React.Fragment key={i}>
                    {i === 0 ? part : <span className="gold-gradient-text block mt-1">{part}</span>}
                  </React.Fragment>
                ))}
              </h1>

              <p className="text-base sm:text-xl text-[#A7A9AC] max-w-2xl font-light leading-relaxed">
                {currentVideo.desc}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* Master Prompt CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              onClick={() => onNavigate('/cars')}
              className="group relative px-8 py-4 bg-gradient-to-r from-[#C5A878] via-[#E0C79B] to-[#C5A878] hover:brightness-110 text-[#0B0B0D] font-extrabold uppercase tracking-[0.15em] text-xs rounded-xl shadow-2xl shadow-[#C5A878]/25 flex items-center gap-3 transition-all hover:scale-105"
            >
              <span>EXPLORE COLLECTION</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => onNavigate('/cars')}
              className="px-8 py-4 bg-[#171719]/85 hover:bg-[#242426] text-[#F5F4F0] font-bold uppercase tracking-[0.15em] text-xs rounded-xl border border-[#242426] hover:border-[#C5A878]/50 backdrop-blur-md transition-all flex items-center gap-3"
            >
              <span>DISCOVER VEHICLES</span>
              <ChevronRight className="w-4 h-4 text-[#C5A878]" />
            </button>
          </div>
        </div>

        {/* Bottom Performance Stats Strip & Subtle Scroll Indicator */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[#242426] pt-6">
          
          {/* Animated Performance Stats */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentVideo.id + '-stats'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="grid grid-cols-3 gap-8 max-w-xl text-[#F5F4F0] font-mono"
            >
              <div className="flex items-center gap-3">
                <Flame className="w-5 h-5 text-[#C5A878] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#A7A9AC] uppercase tracking-widest block">Output</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#F5F4F0]">{currentVideo.stats.hp}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Gauge className="w-5 h-5 text-[#C5A878] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#A7A9AC] uppercase tracking-widest block">0-100 km/h</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#C5A878]">{currentVideo.stats.accel}</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Zap className="w-5 h-5 text-[#C5A878] shrink-0" />
                <div>
                  <span className="text-[10px] text-[#A7A9AC] uppercase tracking-widest block">Top Speed</span>
                  <span className="text-xl sm:text-2xl font-extrabold text-[#F5F4F0]">{currentVideo.stats.speed}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Subtle Scroll Down Indicator */}
          <div className="flex items-center gap-3 text-xs font-mono text-[#A7A9AC] uppercase tracking-widest">
            <span>Scroll to Discover</span>
            <div className="p-2 rounded-full bg-[#171719] border border-[#242426] animate-bounce text-[#C5A878]">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

        </div>

      </div>

      {/* Video Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-[#171719] z-20">
        <motion.div
          key={activeVideoIndex}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 15, ease: 'linear' }}
          className="h-full bg-gradient-to-r from-[#C5A878] via-[#E0C79B] to-[#C5A878] shadow-[0_0_10px_rgba(197,168,120,0.8)]"
        />
      </div>

    </section>
  );
}
