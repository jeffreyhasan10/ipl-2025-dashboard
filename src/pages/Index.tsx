
import React, { useEffect } from 'react';
import Hero from '@/components/Hero';
import Navbar from '@/components/Navbar';
import LiveScore from '@/components/LiveScore';
import TeamGrid from '@/components/TeamGrid';
import TeamCarousel from '@/components/TeamCarousel';
import AIPredictions from '@/components/AIPredictions';
import TicketSection from '@/components/TicketSection';
import FanZone from '@/components/FanZone';
import Footer from '@/components/Footer';

const Index = () => {
  // Effect for smooth scrolling animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          observer.unobserve(entry.target);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    
    document.querySelectorAll('.scroll-reveal').forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <LiveScore />
      <Hero />
      
      <main>
        <div className="scroll-reveal opacity-0">
          <TeamCarousel />
        </div>
        <TeamGrid />
        <AIPredictions />
        <TicketSection />
        <FanZone />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
