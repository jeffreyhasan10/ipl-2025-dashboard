import React, { useState } from 'react';
import { upcomingMatches, teams } from '@/utils/teamData';
import { Brain, TrendingUp, Calendar, MapPin, Award, ChevronDown, ChevronUp } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AIPredictions = () => {
  const [expandedMatchId, setExpandedMatchId] = useState<string | null>(null);

  const toggleExpand = (matchId: string) => {
    setExpandedMatchId(expandedMatchId === matchId ? null : matchId);
  };

  const getTeamById = (id: string) => teams.find(team => team.id === id);
  const getPlayerById = (teamId: string, playerId: number) => {
    const team = getTeamById(teamId);
    return team?.players.find(player => player.id === playerId);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const barVariants = {
    hidden: { width: 0 },
    visible: (percentage: number) => ({
      width: `${percentage}%`,
      transition: { duration: 1, ease: 'easeOut' },
    }),
  };

  const expandVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3 } },
  };

  return (
    <section id="predictions" className="section-container">
      {/* Section Header */}
      <motion.div
        className="mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <span className="pill-tag mb-4 flex items-center justify-center gap-2 mx-auto">
          <Brain className="w-4 h-4" />
          AI PREDICTIONS
        </span>
        <h2 className="section-title">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Match Predictions & Insights
          </span>
        </h2>
        <p className="section-subtitle">
          Our AI analyzes team performance, player form, and match conditions to predict outcomes and highlight key players.
        </p>
      </motion.div>

      {/* Matches */}
      <div className="max-w-4xl mx-auto space-y-6">
        {upcomingMatches.map((match, index) => {
          const team1 = getTeamById(match.team1Id);
          const team2 = getTeamById(match.team2Id);
          const playerToWatch = getPlayerById(match.prediction.playerToWatch.teamId, match.prediction.playerToWatch.id);

          if (!team1 || !team2 || !playerToWatch) return null;
          const isExpanded = expandedMatchId === match.id;

          return (
            <motion.div
              key={match.id}
              className="glass overflow-hidden"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: index * 0.1 }}
            >
              {/* Match Header */}
              <div className="p-5">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <img src={team1.logo} alt={team1.name} className="w-16 h-16 object-contain" />
                      <span className="text-sm font-bold mt-1">{team1.shortName}</span>
                    </div>
                    <div className="text-2xl font-bold text-white/80">vs</div>
                    <div className="flex flex-col items-center">
                      <img src={team2.logo} alt={team2.name} className="w-16 h-16 object-contain" />
                      <span className="text-sm font-bold mt-1">{team2.shortName}</span>
                    </div>
                  </div>

                  <div className="hidden md:block text-right">
                    <div className="flex items-center text-sm mb-2">
                      <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                      <span>{match.date} | {match.time}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <MapPin className="w-4 h-4 mr-2 text-pink-400" />
                      <span>{match.venue}</span>
                    </div>
                  </div>
                </div>

                {/* Mobile Date/Venue */}
                <div className="mt-4 md:hidden">
                  <div className="flex items-center text-sm mb-2">
                    <Calendar className="w-4 h-4 mr-2 text-blue-400" />
                    <span>{match.date} | {match.time}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <MapPin className="w-4 h-4 mr-2 text-pink-400" />
                    <span>{match.venue}</span>
                  </div>
                </div>

                {/* Win Probability */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-1">
                    <span>{team1.shortName} {match.prediction.team1Chance}%</span>
                    <span>{team2.shortName} {match.prediction.team2Chance}%</span>
                  </div>
                  <div className="h-2.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${team1.colorClass}`}
                      variants={barVariants}
                      initial="hidden"
                      animate="visible"
                      custom={match.prediction.team1Chance}
                    />
                  </div>
                </div>

                {/* Expand/Collapse Button */}
                <button
                  className="w-full mt-4 flex items-center justify-center gap-2 glass py-2 rounded-md hover:bg-white/10 transition-colors"
                  onClick={() => toggleExpand(match.id)}
                >
                  <span className="text-sm font-medium">
                    {isExpanded ? 'Hide Details' : 'Show Prediction Details'}
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>

              {/* Expanded Content */}
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="p-5 border-t border-white/10 bg-white/5"
                    variants={expandVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Key Factors */}
                      <div>
                        <h4 className="text-lg font-bold mb-3 flex items-center">
                          <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
                          Key Factors
                        </h4>
                        <ul className="space-y-2">
                          {match.prediction.keyFactors.map((factor, index) => (
                            <li key={index} className="flex">
                              <span className="text-purple-400 mr-2">•</span>
                              <span>{factor}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Player to Watch */}
                      <div>
                        <h4 className="text-lg font-bold mb-3 flex items-center">
                          <Award className="w-5 h-5 mr-2 text-yellow-400" />
                          Player to Watch
                        </h4>
                        <div className="glass p-4 rounded-lg">
                          <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-white/10 overflow-hidden mr-4">
                              <img
                                src={playerToWatch.image}
                                alt={playerToWatch.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Player';
                                }}
                              />
                            </div>
                            <div>
                              <h5 className="font-bold">{playerToWatch.name}</h5>
                              <p className="text-sm text-white/70">
                                {playerToWatch.role} • {getTeamById(match.prediction.playerToWatch.teamId)?.shortName}
                              </p>
                            </div>
                          </div>
                          <div className="mt-3 text-sm">
                            <p><span className="text-yellow-400">Why:</span> {match.prediction.playerToWatch.reason}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};

export default AIPredictions;