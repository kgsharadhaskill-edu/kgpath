import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, X } from 'lucide-react';

export default function AboutSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);

  const handlePlay = () => {
    const video = videoRef.current;
    if (video) {
      video.muted = false;
      video.play();
      setIsPlaying(true);
      setShowOverlay(false);
    }
  };

  const handlePause = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      setIsPlaying(false);
    }
  };

  const handleCancel = () => {
    const video = videoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
      setIsPlaying(false);
      setShowOverlay(true);
    }
  };

  return (
    <section className="py-16 md:py-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative aspect-video w-full rounded-lg overflow-hidden shadow-2xl">
          {/* Video element */}
          <video
            ref={videoRef}
            src="/videoplayback.mp4"
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            Your browser does not support the video tag.
          </video>

          {/* Vignette effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ boxShadow: 'inset 0 0 5rem 2.5rem rgba(0, 0, 0, 0.5)' }}
          ></div>

          {/* Overlay and Controls */}
          {showOverlay ? (
            // === Initial Overlay with Watch Now Button ===
            <div className="absolute inset-0 flex items-end justify-center bg-black/40 transition-opacity duration-300">
              <div className="pb-6 sm:pb-8 md:pb-10">
                <Button
                  size="lg"
                  onClick={handlePlay}
                  className="bg-white text-black hover:bg-gray-200 font-semibold px-6 py-3 rounded-md shadow-md"
                >
                  Watch Now
                  <Play className="ml-2 h-4 w-4 fill-current" />
                </Button>
              </div>
            </div>
          ) : (
            // === Control Buttons (Play, Pause, Cancel) ===
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3">
              {isPlaying ? (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handlePause}
                  className="bg-white/80 hover:bg-white text-black"
                >
                  <Pause className="h-4 w-4 mr-1" /> Pause
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handlePlay}
                  className="bg-white/80 hover:bg-white text-black"
                >
                  <Play className="h-4 w-4 mr-1" /> Play
                </Button>
              )}
              <Button
                variant="destructive"
                size="sm"
                onClick={handleCancel}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                <X className="h-4 w-4 mr-1" /> Cancel
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
