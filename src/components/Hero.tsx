import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero = () => {
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [muted, setMuted] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Handle scroll opacity
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const maxScroll = 500;
      const opacity = Math.max(0, 1 - scrollPosition / maxScroll);
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle audio mute with error handling
  const toggleMute = () => {
    if (audioRef.current) {
      const newMutedState = !audioRef.current.muted;
      audioRef.current.muted = newMutedState;
      setMuted(newMutedState);

      if (!newMutedState) {
        // Attempt to play audio when unmuting
        audioRef.current
          .play()
          .catch((error) => {
            console.error('Audio playback failed:', error);
            // Optionally notify the user
            alert('Audio playback failed. Please try again or check browser settings.');
          });
      } else {
        audioRef.current.pause(); // Pause when muting (optional)
      }
    } else {
      console.warn('Audio element not found');
    }
  };

  // Scroll to teams section
  const scrollToTeams = () => {
    const teamsSection = document.getElementById('teams');
    teamsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const scrollVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'reverse',
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity: scrollOpacity }}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/50 to-background z-10" />
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
          poster="/stadium-poster.jpg"
        >
          <source src="/stadium-video.webm" type="video/mp4" />
        </video>
      </div>

      {/* Audio
      <audio ref={audioRef} loop preload="auto">
        <source src="/stadium-crowd.mp3" type="audio/mp3" />
      </audio> */}

      {/* Mute Button
      <motion.button
        onClick={toggleMute}
        className="absolute top-6 right-6 z-20 p-3 rounded-full glass hover:bg-white/10 transition-colors"
        aria-label={muted ? 'Unmute crowd sound' : 'Mute crowd sound'}
        variants={buttonVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {muted ? (
            <>
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </>
          ) : (
            <>
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </>
          )}
        </svg>
      </motion.button> */}

      {/* Hero Content */}
      <div className="container mx-auto px-4 z-10 text-center">
        <motion.span
          className="pill-tag mb-6 inline-block"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          custom={0}
        >
          IPL 2025 SEASON
        </motion.span>

        <motion.h1
          className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          custom={1}
        >
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 drop-shadow-[0_5px_15px_rgba(124,58,237,0.4)]">
            Feel the Roar
          </span>{' '}
          of IPL 2025!
        </motion.h1>

        <motion.p
          className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-10"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          custom={2}
        >
          Experience cricket like never before with state-of-the-art stadiums,
          world-class players, and electric atmospheres.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row justify-center items-center gap-4"
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          custom={3}
        >
          <motion.button
            className="cta-button flex items-center animate-pulse-glow"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Book Tickets
            <ArrowRight className="ml-2 w-5 h-5" />
          </motion.button>

          <motion.button
            className="secondary-button"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Watch Live Matches
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.button
        onClick={scrollToTeams}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 p-3 rounded-full glass hover:bg-white/10 transition-colors"
        aria-label="Scroll down"
        variants={scrollVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowDown className="w-5 h-5" />
      </motion.button>
    </motion.section>
  );
};

export default Hero;