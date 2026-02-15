import React from 'react';

export const VideoBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-50 w-full h-full overflow-hidden bg-slate-950">
      {/* 
        Atmospheric background video (Blue Smoke/Nebula) 
        Represents the cosmic energy and the formless nature of Shiva.
        Using a reliable CDN source for the demo.
      */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-40 mix-blend-screen"
      >
        <source 
          src="https://cdn.pixabay.com/video/2019/04/20/22908-331682337_large.mp4" 
          type="video/mp4" 
        />
      </video>
      
      {/* Overlay to ensure text legibility and blend with the dark theme */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-900/50 to-slate-950/90" />
      <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-[1px]" />
    </div>
  );
};