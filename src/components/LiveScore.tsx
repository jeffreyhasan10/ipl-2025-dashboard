import React, { useState, useEffect } from 'react';
import { liveMatch, teams } from '@/utils/teamData';
import { Play, ArrowRight, BarChart, Activity } from 'lucide-react';
import { showToast } from '@/lib/toast-utils';
import { motion, AnimatePresence } from 'framer-motion';

const LiveScore = () => {
  const [timer, setTimer] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [showPrediction, setShowPrediction] = useState(false);

  // Find team data
  const team1 = teams.find(team => team.id === liveMatch.team1.id);
  const team2 = teams.find(team => team.id === liveMatch.team2.id);

  // Updates timer to simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Simulate score updates
  useEffect(() => {
    if (timer > 0 && liveMatch.isLive) {
      if (timer % 3 === 0) {
        // 30% chance to add runs to team1
        if (Math.random() < 0.3) {
          const runsToAdd = [1, 2, 4, 6][Math.floor(Math.random() * 4)];
          liveMatch.team1.score += runsToAdd;

          if (runsToAdd === 4 || runsToAdd === 6) {
            showToast(`BOUNDARY!`, `${team1?.name} scores ${runsToAdd} runs!`);
          }
        }

        // 10% chance to add a wicket
        if (Math.random() < 0.1 && liveMatch.team1.wickets < 10) {
          liveMatch.team1.wickets += 1;
          showToast(`WICKET!`, `${team1?.name} loses a wicket!`);
        }

        // Update overs
        if (liveMatch.team1.overs < 20) {
          liveMatch.team1.overs = parseFloat((liveMatch.team1.overs + 0.1).toFixed(1));
          if (liveMatch.team1.overs.toFixed(1).endsWith('.6')) {
            liveMatch.team1.overs = Math.floor(liveMatch.team1.overs) + 1;
            showToast(`End of Over`, `${Math.floor(liveMatch.team1.overs)} overs completed`);
          }
        }

        // Update prediction based on current match situation
        if (liveMatch.team1.score > 180 && liveMatch.team1.overs > 18) {
          liveMatch.prediction.team1Chance = 75;
          liveMatch.prediction.team2Chance = 25;
        } else if (liveMatch.team1.wickets > 8) {
          liveMatch.prediction.team1Chance = 55;
          liveMatch.prediction.team2Chance = 45;
        }
      }
    }
  }, [timer]);

  const toggleScorecard = () => setIsVisible(!isVisible);
  const togglePrediction = () => setShowPrediction(!showPrediction);
  const handleLiveStream = () => showToast('Live Stream', 'Redirecting to live stream...');

  if (!team1 || !team2) return null;

  // Animation variants
  const containerVariants = {
    hidden: { y: '-100%' },
    visible: { y: 0, transition: { duration: 0.5, ease: 'easeInOut' } },
    exit: { y: '-100%', transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  const scoreVariants = {
    initial: { scale: 1 },
    animate: { scale: [1, 1.1, 1], transition: { duration: 0.3 } },
  };

  const predictionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.4 } },
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  const barVariants = {
    initial: { width: 0 },
    animate: { width: `${liveMatch.prediction.team1Chance}%`, transition: { duration: 1, ease: 'easeOut' } },
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-40 flex justify-center">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            className="glass mx-4 rounded-b-xl overflow-hidden shadow-xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center">
                  <motion.span
                    className="live-indicator"
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  >
                    LIVE
                  </motion.span>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center">
                    <img src={team1.logo} alt={team1.name} className="w-8 h-8 object-contain" />
                    <span className="font-bold ml-2">{team1.shortName}</span>
                    <motion.span
                      className="ml-2"
                      key={`${liveMatch.team1.score}-${liveMatch.team1.wickets}`}
                      variants={scoreVariants}
                      initial="initial"
                      animate="animate"
                    >
                      {liveMatch.team1.score}/{liveMatch.team1.wickets}
                    </motion.span>
                    <span className="text-xs text-white/70 ml-1">({liveMatch.team1.overs})</span>
                  </div>

                  <span className="text-white/50">vs</span>

                  <div className="flex items-center">
                    <img src={team2.logo} alt={team2.name} className="w-8 h-8 object-contain" />
                    <span className="font-bold ml-2">{team2.shortName}</span>
                    <motion.span
                      className="ml-2"
                      key={`${liveMatch.team2.score}-${liveMatch.team2.wickets}`}
                      variants={scoreVariants}
                      initial="initial"
                      animate="animate"
                    >
                      {liveMatch.team2.score}/{liveMatch.team2.wickets}
                    </motion.span>
                    <span className="text-xs text-white/70 ml-1">({liveMatch.team2.overs})</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <motion.button
                  className="bg-white/10 hover:bg-white/20 transition-colors p-1.5 rounded-full"
                  aria-label="Watch live stream"
                  onClick={handleLiveStream}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Play className="w-4 h-4 text-red-500" />
                </motion.button>

                <motion.button
                  className={`bg-white/10 hover:bg-white/20 transition-colors p-1.5 rounded-full ${
                    showPrediction ? 'bg-white/30' : ''
                  }`}
                  onClick={togglePrediction}
                  aria-label="Show match prediction"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <BarChart className="w-4 h-4" />
                </motion.button>

                <motion.button
                  className="bg-white/10 hover:bg-white/20 transition-colors p-1.5 rounded-full"
                  onClick={toggleScorecard}
                  aria-label="Toggle scorecard"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <ArrowRight
                    className={`w-4 h-4 transition-transform duration-300 ${
                      !isVisible ? 'rotate-180' : ''
                    }`}
                  />
                </motion.button>
              </div>
            </div>

            {/* AI Prediction Panel */}
            <AnimatePresence>
              {showPrediction && (
                <motion.div
                  className="px-4 py-3 border-t border-white/10 bg-gradient-to-r from-blue-900/30 to-purple-900/30"
                  variants={predictionVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                >
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Activity className="w-5 h-5 text-blue-400" />
                      <span className="font-medium">AI Match Prediction</span>
                    </div>

                    <div className="flex-1 flex items-center justify-center">
                      <div className="w-full max-w-xs">
                        <div className="flex justify-between text-xs mb-1">
                          <span>{team1.shortName}</span>
                          <span>{team2.shortName}</span>
                        </div>
                        <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                            variants={barVariants}
                            initial="initial"
                            animate="animate"
                          />
                        </div>
                        <div className="flex justify-between text-xs mt-1">
                          <span>{liveMatch.prediction.team1Chance}%</span>
                          <span>{liveMatch.prediction.team2Chance}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-sm bg-white/10 px-3 py-1 rounded">
                      <span className="text-yellow-400 font-medium">Key Factor:</span>{' '}
                      {liveMatch.prediction.keyFactors[0]}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LiveScore;