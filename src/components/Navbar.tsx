import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowRight, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showAlertSubscriptionToast, showTicketBookingToast } from '@/lib/toast-utils';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAlertClick = () => showAlertSubscriptionToast();
  const handleBookTicketsClick = () => showTicketBookingToast();

  // Animation variants
  const navbarVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const linkVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.4 },
    }),
    hover: { x: 5, color: '#ffffff', transition: { duration: 0.3 } },
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const mobileMenuVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.4, ease: 'easeInOut' } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.3, ease: 'easeInOut' } },
  };

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'py-2 glass shadow-lg' : 'py-4 bg-transparent'
      }`}
      variants={navbarVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <a href="/" className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
              IPL 2025
            </span>
          </a>
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          {['Matches', 'Teams', 'Tickets', 'Fan Zone', 'Stats'].map((item, index) => (
            <motion.a
              key={item}
              href={`#${item.toLowerCase().replace(' ', '-')}`}
              className="text-sm text-white/80 transition-colors"
              variants={linkVariants}
              initial="hidden"
              animate="visible"
              custom={index}
              whileHover="hover"
            >
              {item}
            </motion.a>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <motion.div variants={buttonVariants} initial="hidden" animate="visible">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full bg-white/5 hover:bg-white/10 border-white/10"
              onClick={handleAlertClick}
              whileHover="hover"
              whileTap="tap"
            >
              <Bell className="w-4 h-4 mr-2" />
              Alerts
            </Button>
          </motion.div>
          <motion.div variants={buttonVariants} initial="hidden" animate="visible">
            <Button
              className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white"
              onClick={handleBookTicketsClick}
              whileHover="hover"
              whileTap="tap"
            >
              Book Tickets
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </motion.button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden glass py-4 px-4"
            variants={mobileMenuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <nav className="flex flex-col space-y-4">
              {['Matches', 'Teams', 'Tickets', 'Fan Zone', 'Stats'].map((item, index) => (
                <motion.a
                  key={item}
                  href={`#${item.toLowerCase().replace(' ', '-')}`}
                  className="text-white/80 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5"
                  onClick={() => setMobileMenuOpen(false)}
                  variants={linkVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  whileHover="hover"
                >
                  {item}
                </motion.a>
              ))}
              <div className="pt-2 flex flex-col space-y-2">
                <motion.div variants={buttonVariants} initial="hidden" animate="visible">
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-white/5 hover:bg-white/10 border-white/10 w-full justify-center"
                    onClick={() => {
                      handleAlertClick();
                      setMobileMenuOpen(false);
                    }}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Bell className="w-4 h-4 mr-2" />
                    Alerts
                  </Button>
                </motion.div>
                <motion.div variants={buttonVariants} initial="hidden" animate="visible">
                  <Button
                    className="rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white w-full justify-center"
                    onClick={() => {
                      handleBookTicketsClick();
                      setMobileMenuOpen(false);
                    }}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    Book Tickets
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </motion.div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;