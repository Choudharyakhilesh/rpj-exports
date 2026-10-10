'use client';
import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from 'lucide-react';

export function VideoTestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const videoTestimonials = [
    {
      id: 1,
      name: 'Priya Sharma',
      role: 'Fashion Boutique Owner',
      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      thumbnail:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=400&fit=crop',
      rating: 5,
      text: 'VK Enterprise provides exceptional quality products with amazing service!',
    },
    {
      id: 2,
      name: 'Rahul Patel',
      role: 'Retail Manager',
      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      thumbnail:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=400&fit=crop',
      rating: 5,
      text: 'Best bulk supplier in the market. Quality and service are outstanding!',
    },
    {
      id: 3,
      name: 'Anita Desai',
      role: 'Clothing Store Owner',
      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      thumbnail:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=400&fit=crop',
      rating: 5,
      text: "I've been working with VK Enterprise for 5 years. Always satisfied!",
    },
    {
      id: 4,
      name: 'Vikram Singh',
      role: 'Textile Business',
      videoUrl:
        'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
      thumbnail:
        'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=400&fit=crop',
      rating: 5,
      text: 'Excellent product range and competitive prices. Highly recommended!',
    },
  ];

  const handlePlayPause = () => {
    const currentVideo = videoRefs.current[activeIndex];
    if (currentVideo) {
      isPlaying ? currentVideo.pause() : currentVideo.play();
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    const currentVideo = videoRefs.current[activeIndex];
    if (currentVideo) {
      currentVideo.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVideoEnd = () => setIsPlaying(false);

  const goToNext = () => {
    videoRefs.current[activeIndex]?.pause();
    setIsPlaying(false);
    setActiveIndex((prev) => (prev + 1) % videoTestimonials.length);
  };

  const goToPrevious = () => {
    videoRefs.current[activeIndex]?.pause();
    setIsPlaying(false);
    setActiveIndex((prev) => (prev - 1 + videoTestimonials.length) % videoTestimonials.length);
  };

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (video && index !== activeIndex) video.pause();
    });
    setIsPlaying(false);
  }, [activeIndex]);

  return (
    <section className="py-3 website-bg text-black relative overflow-hidden mt-5">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-5">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-wide">
            Client Video Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Hear what our satisfied clients have to say
          </p>
        </div>
        <div className="relative top-50 flex items-center justify-between mt-8">
          <button
            onClick={goToPrevious}
            className="bg-white/10 border border-white/20 rounded-full p-3 hover:bg-white/20 transition"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Dots */}
          <div className="flex gap-3">
            {videoTestimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`transition-all rounded-full ${
                  index === activeIndex
                    ? 'w-12 h-2 bg-white'
                    : 'w-3 h-3 bg-white/40 hover:bg-white/70'
                }`}
              />
            ))}
          </div>

          <button
            onClick={goToNext}
            className="bg-white/10 border border-white/20 rounded-full p-3 hover:bg-white/20 transition"
          >
            <ChevronRight className="h-6 w-6" />
          </button>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="relative website-bg rounded-3xl overflow-hidden border border-white/10 shadow-xl">
            {videoTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`transition-all duration-700 ${
                  index === activeIndex
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 absolute inset-0 translate-y-10 pointer-events-none'
                }`}
              >
                <div className="grid md:grid-cols-2">
                  {/* Video Section */}
                  <div className="relative aspect-video bg-black">
                    <video
                      ref={(el) => {
                        videoRefs.current[index] = el;
                      }}
                      className="w-full h-full object-cover"
                      src={testimonial.videoUrl}
                      poster={testimonial.thumbnail}
                      onEnded={handleVideoEnd}
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-6">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={handlePlayPause}
                          className="bg-white/10 border border-white/20 rounded-full p-3 hover:bg-white/20 transition"
                        >
                          {isPlaying ? (
                            <Pause className="h-6 w-6 text-black" />
                          ) : (
                            <Play className="h-6 w-6 text-black" />
                          )}
                        </button>

                        <button
                          onClick={handleMuteToggle}
                          className="bg-white/10 border border-white/20 rounded-full p-3 hover:bg-white/20 transition"
                        >
                          {isMuted ? (
                            <VolumeX className="h-6 w-6 text-black" />
                          ) : (
                            <Volume2 className="h-6 w-6 text-black" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-10 flex flex-col justify-center border-l border-white/10">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <div key={i} className="h-5 w-5 bg-white rounded-sm" />
                      ))}
                    </div>

                    <blockquote className="text-2xl mb-6 leading-relaxed">
                      {` "{testimonial.text}"`}
                    </blockquote>

                    <div className="flex items-center gap-4">
                      <img
                        src={testimonial.thumbnail}
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border border-white/20"
                      />
                      <div>
                        <h4 className="font-bold text-lg">{testimonial.name}</h4>
                        <p className="text-gray-400">{testimonial.role}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
