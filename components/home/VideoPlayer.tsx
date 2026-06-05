'use client';
import { useRef, useState } from 'react';

export function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const handlePlay = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  return (
    <div className="media">
      <video
        ref={videoRef}
        className="media-img"
        muted
        loop
        playsInline
        style={{ transform: 'scale(1.14)' }}
      >
        <source src="/cursorful-video-optimized.mp4" type="video/mp4" />
      </video>
      {!playing && (
        <button
          className="play-btn"
          onClick={handlePlay}
          aria-label="Videó lejátszása"
        >
          <div className="play-icon">
            <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </button>
      )}
    </div>
  );
}
