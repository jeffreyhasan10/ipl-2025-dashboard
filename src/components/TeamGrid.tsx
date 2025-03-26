import React, { useRef, useState } from "react";
import { teams } from "@/utils/teamData";
import TeamCard from "@/components/TeamCard";
import { Trophy, Info } from "lucide-react";
import { useInView } from "@/lib/animations";
import { showToast } from "@/lib/toast-utils";
import { motion } from "framer-motion";

const TeamGrid = () => {
  const [activeTeamId, setActiveTeamId] = useState<string | null>(null);
  const { ref, isInView } = useInView({ threshold: 0.1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const innerContainerRef = useRef<HTMLDivElement>(null);

  // Handle team details click
  const handleViewTeamDetails = (teamName: string) => {
    showToast("Team Details", `Viewing complete details for ${teamName}`);
  };

  // Calculate drag constraints dynamically
  const calculateDragConstraints = () => {
    if (containerRef.current && innerContainerRef.current) {
      const containerWidth = containerRef.current.offsetWidth;
      const lastTeamCard = innerContainerRef.current.lastElementChild;
      
      if (lastTeamCard) {
        const lastTeamRight = lastTeamCard.getBoundingClientRect().right;
        const containerRight = containerRef.current.getBoundingClientRect().right;
        
        const maxDrag = Math.min(
          0, 
          containerWidth - lastTeamRight + containerRight - (lastTeamCard as HTMLElement).offsetWidth
        );

        return {
          left: maxDrag,
          right: 0
        };
      }
    }
    return { left: 0, right: 0 };
  };

  return (
    <section id="teams" className="section-container" ref={ref}>
      {/* Header with animation */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.7 }}
        className="mb-12 text-center"
      >
        <span className="pill-tag mb-4">MEET THE TEAMS</span>
        <h2 className="section-title">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            IPL 2025 Teams
          </span>
        </h2>
        <p className="section-subtitle">
          The best cricket talent from around the world, competing in the most
          exciting T20 league.
        </p>
      </motion.div>

      <div 
        ref={containerRef} 
        className="overflow-hidden w-full relative"
      >
        <motion.div
          ref={innerContainerRef}
          drag="x"
          dragConstraints={() => calculateDragConstraints()}
          dragElastic={0.1} // Reduced elasticity for slower drag
          dragMomentum={true}
          dragTransition={{ 
            power: 0.1, // Reduced power for slower drag
            timeConstant: 200 // Increased time constant for smoother drag
          }}
          className="flex gap-6 cursor-grab active:cursor-grabbing"
        >
          {teams.map((team, index) => (
            <motion.div
              key={team.id}
              className="flex-shrink-0 w-[300px] snap-start"
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onMouseEnter={() => {
                const timer = setTimeout(() => setActiveTeamId(team.id), 50);
                return () => clearTimeout(timer);
              }}
              onMouseLeave={() => {
                const timer = setTimeout(() => setActiveTeamId(null), 50);
                return () => clearTimeout(timer);
              }}
            >
              <TeamCard
                team={team}
                index={index}
                isActive={team.id === activeTeamId}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Selected team details */}
      {activeTeamId && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="mt-8 glass p-6 rounded-xl"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <motion.div whileHover={{ scale: 1.05 }} className="w-24 h-24">
              <img
                src={teams.find((t) => t.id === activeTeamId)?.logo}
                alt={teams.find((t) => t.id === activeTeamId)?.name}
                className="w-full h-full object-contain"
              />
            </motion.div>

            <div className="flex-grow">
              <h3 className="text-2xl font-bold mb-2">
                {teams.find((t) => t.id === activeTeamId)?.name}
              </h3>

              <div className="flex flex-wrap gap-4 mt-2">
                <div className="flex items-center">
                  <Trophy className="w-4 h-4 mr-2 text-yellow-400" />
                  <span>
                    IPL Titles:{" "}
                    <span className="font-bold ml-1">
                      {activeTeamId === "mi"
                        ? "5"
                        : activeTeamId === "csk"
                        ? "5"
                        : activeTeamId === "kkr"
                        ? "3"
                        : activeTeamId === "gt"
                        ? "1"
                        : activeTeamId === "srh"
                        ? "1"
                        : activeTeamId === "rr"
                        ? "1"
                        : "0"}
                    </span>
                  </span>
                </div>

                <div className="flex items-center">
                  <Info className="w-4 h-4 mr-2 text-blue-400" />
                  <span>
                    Captain:{" "}
                    <span className="font-bold ml-1">
                      {teams
                        .find((t) => t.id === activeTeamId)
                        ?.players.find((p) => p.isCaptain)?.name || "TBA"}
                    </span>
                  </span>
                </div>
              </div>

              <div className="mt-4">
                <h4 className="font-medium mb-2">Recent Form</h4>
                <div className="flex gap-2">
                  {teams
                    .find((t) => t.id === activeTeamId)
                    ?.recentForm.map((result, i) => (
                      <motion.span
                        key={i}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.3, delay: i * 0.1 }}
                        className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
                          result === "W"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-red-500/20 text-red-400"
                        }`}
                      >
                        {result}
                      </motion.span>
                    ))}
                </div>
              </div>
            </div>

            <div className="mt-4 md:mt-0 flex-shrink-0">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="secondary-button"
                onClick={() => {
                  const teamName =
                    teams.find((t) => t.id === activeTeamId)?.name || "";
                  handleViewTeamDetails(teamName);
                }}
              >
                Complete Team Details
              </motion.button>
            </div>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default React.memo(TeamGrid);