import React from 'react';
import { Facebook, Twitter, Instagram, Youtube, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

const Footer = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6 },
    }),
  };

  const linkVariants = {
    hover: { x: 5, color: '#ffffff', transition: { duration: 0.3 } },
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: (i: number) => ({
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.4, type: 'spring', stiffness: 100 },
    }),
    hover: { scale: 1.2, rotate: 10 },
  };

  const bottomVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.8, duration: 0.6 } },
  };

  return (
    <motion.footer
      className="bg-black/50 border-t border-white/10 mt-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <motion.div
            className="col-span-1"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={0}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
                IPL 2025
              </span>
            </div>
            <p className="text-white/70 text-sm mb-6">
              The ultimate destination for cricket fans to experience the excitement of IPL 2025.
            </p>
            <div className="flex space-x-4">
              {[
                { Icon: Facebook, href: '#' },
                { Icon: Twitter, href: '#' },
                { Icon: Instagram, href: '#' },
                { Icon: Youtube, href: '#' },
              ].map(({ Icon, href }, index) => (
                <motion.a
                  key={index}
                  href={href}
                  className="w-9 h-9 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors"
                  variants={iconVariants}
                  initial="hidden"
                  animate="visible"
                  custom={index}
                  whileHover="hover"
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            className="col-span-1"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={1}
          >
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { text: 'Matches', href: '#' },
                { text: 'Teams', href: '#teams' },
                { text: 'Tickets', href: '#tickets' },
                { text: 'Fan Zone', href: '#fan-zone' },
                { text: 'News & Media', href: '#' },
              ].map(({ text, href }, index) => (
                <motion.li key={index} whileHover="hover" variants={linkVariants}>
                  <a href={href} className="text-white/70 transition-colors">
                    {text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* IPL Teams */}
          <motion.div
            className="col-span-1"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={2}
          >
            <h3 className="text-lg font-bold mb-4">IPL Teams</h3>
            <ul className="space-y-2">
              {[
                'Mumbai Indians',
                'Chennai Super Kings',
                'Royal Challengers Bangalore',
                'Kolkata Knight Riders',
                'Delhi Capitals',
              ].map((team, index) => (
                <motion.li key={index} whileHover="hover" variants={linkVariants}>
                  <a href="#" className="text-white/70 transition-colors">
                    {team}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Important Info */}
          <motion.div
            className="col-span-1"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <h3 className="text-lg font-bold mb-4">Important Info</h3>
            <ul className="space-y-2">
              {[
                'About IPL',
                'Terms & Conditions',
                'Privacy Policy',
                'Contact Us',
                'FAQs',
              ].map((info, index) => (
                <motion.li key={index} whileHover="hover" variants={linkVariants}>
                  <a href="#" className="text-white/70 transition-colors">
                    {info}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center"
          variants={bottomVariants}
          initial="hidden"
          animate="visible"
        >
          <p className="text-white/50 text-sm">
            © 2025 IPL. All rights reserved.
          </p>
          <p className="text-white/50 text-sm mt-4 md:mt-0 flex items-center">
            Made with{' '}
            <motion.span
              className="mx-1"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }}
            >
              <Heart className="w-3 h-3 text-red-500" />
            </motion.span>{' '}
            for cricket fans
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;