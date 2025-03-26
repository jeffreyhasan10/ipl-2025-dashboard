import React, { useState, useEffect } from 'react';
import { teams } from '@/utils/teamData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTypewriter } from '@/lib/animations';
import { cn } from '@/lib/utils';
import { showTeamSelectionToast } from '@/lib/toast-utils';
import { motion, AnimatePresence } from 'framer-motion';

const TeamCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const activeTeam = teams[activeIndex];

  // Typewriter effect for team tagline
  const { displayText } = useTypewriter(activeTeam.tagline, 50);

  // Autoplay carousel
  useEffect(() => {
    if (!autoplay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % teams.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [autoplay]);

  // Pause autoplay on hover
  const handleMouseEnter = () => setAutoplay(false);
  const handleMouseLeave = () => setAutoplay(true);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev + 1) % teams.length);
    setAutoplay(false);
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev - 1 + teams.length) % teams.length);
    setAutoplay(false);
  };

  const handleTeamDetails = () => {
    showTeamSelectionToast(activeTeam.name);
  };

  // Prepare class for background gradient based on team color
  const getTeamGradient = () => {
    const [fromColor] = activeTeam.colorClass.split(' ');
    return `bg-gradient-to-r ${activeTeam.colorClass} bg-opacity-20`;
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const teamVariants = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: -100, transition: { duration: 0.5 } },
  };

  const logoVariants = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.5, type: 'spring', stiffness: 100 } },
    hover: { scale: 1.1 },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.2 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const arrowVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.5, delay: 0.4 } },
    hover: { scale: 1.2 },
    tap: { scale: 0.9 },
  };

  const dotVariants = {
    active: { scale: 1.5, backgroundColor: '#ffffff', transition: { duration: 0.3 } },
    inactive: { scale: 1, backgroundColor: 'rgba(255, 255, 255, 0.5)', transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className="relative max-w-5xl mx-auto h-96 mt-10 overflow-hidden rounded-2xl glass"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Background that changes with team */}
      <motion.div
        className={cn('absolute inset-0 z-0 opacity-30', getTeamGradient())}
        key={activeIndex}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 1 }}
      />

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          className="absolute inset-0 z-10 flex items-center justify-center"
          variants={teamVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="flex flex-col lg:flex-row items-center justify-between w-full px-8 gap-6">
            {/* Team logo */}
            <motion.div
              className="flex-shrink-0 w-32 h-32 md:w-48 md:h-48"
              variants={logoVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <img
                src={activeTeam.logo}
                alt={activeTeam.name}
                className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]"
              />
            </motion.div>

            {/* Team info */}
            <div className="text-center lg:text-left flex-grow max-w-xl">
              <motion.h3
                className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70"
                variants={textVariants}
                initial="hidden"
                animate="visible"
              >
                {activeTeam.name}
              </motion.h3>

              <motion.div
                className="mb-4 h-8"
                variants={textVariants}
                initial="hidden"
                animate="visible"
              >
                <p className="text-lg md:text-xl font-medium italic text-white/90">"{displayText}"</p>
              </motion.div>

              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-4 mt-6"
                variants={textVariants}
                initial="hidden"
                animate="visible"
              >
                <div className="glass px-4 py-2 rounded-full">
                  <span className="text-white/80 text-sm">Played: </span>
                  <span className="font-bold">{activeTeam.matchesPlayed}</span>
                </div>
                <div className="glass px-4 py-2 rounded-full">
                  <span className="text-white/80 text-sm">Won: </span>
                  <span className="font-bold text-green-400">{activeTeam.wins}</span>
                </div>
                <div className="glass px-4 py-2 rounded-full">
                  <span className="text-white/80 text-sm">Lost: </span>
                  <span className="font-bold text-red-400">{activeTeam.losses}</span>
                </div>
              </motion.div>

              <motion.div
                className="mt-6"
                variants={textVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.button
                  className="cta-button"
                  onClick={handleTeamDetails}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  View Team Details
                </motion.button>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation arrows */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 glass p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Previous team"
        variants={arrowVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 glass p-2 rounded-full hover:bg-white/10 transition-colors"
        aria-label="Next team"
        variants={arrowVariants}
        initial="hidden"
        animate="visible"
        whileHover="hover"
        whileTap="tap"
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Dots indicator */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex space-x-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { delay: 0.6 } }}
      >
        {teams.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              setAutoplay(false);
            }}
            className="w-2 h-2 rounded-full transition-all"
            variants={dotVariants}
            animate={index === activeIndex ? 'active' : 'inactive'}
            whileHover={{ scale: 1.3, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
            aria-label={`Go to team ${index + 1}`}
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TeamCarousel;