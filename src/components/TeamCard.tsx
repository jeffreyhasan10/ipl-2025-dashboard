
import React from 'react';
import { TeamData } from '@/utils/teamData';
import { ArrowRight, Users, Trophy, TrendingUp } from 'lucide-react';
import { showToast } from '@/lib/toast-utils';

interface TeamCardProps {
  team: TeamData;
  index: number;
  isActive?: boolean;
}

const TeamCard: React.FC<TeamCardProps> = ({ team, index, isActive = false }) => {
  const handleCardClick = () => {
    showToast(
      `${team.name} Selected`,
      `Viewing players for ${team.name}`
    );
  };

  const handleViewCompleteTeam = (e: React.MouseEvent) => {
    e.stopPropagation();
    showToast(
      "Team Roster",
      `Viewing complete roster for ${team.name}`
    );
  };

  return (
    <div 
      className={`card-3d opacity-0 animate-fade-in h-[400px] transition-transform duration-300 ${
        isActive ? 'scale-105' : ''
      }`}
      style={{ animationDelay: `${0.1 * index}s` }}
      onClick={handleCardClick}
    >
      <div className="card-inner h-full">
        {/* Card Front */}
        <div className="card-front h-full flex flex-col">
          <div 
            className={`card-glass h-full p-6 flex flex-col items-center justify-between bg-gradient-to-br ${team.colorClass} bg-opacity-10`}
          >
            <div className="w-20 h-20 md:w-24 md:h-24 mb-4">
              <img 
                src={team.logo} 
                alt={team.name} 
                className="w-full h-full object-contain filter drop-shadow-lg" 
              />
            </div>
            
            <div className="text-center mt-4 flex-grow flex flex-col justify-center">
              <h3 className="text-xl md:text-2xl font-bold mb-1">{team.name}</h3>
              <p className="text-sm text-white/70 italic">"{team.tagline}"</p>
              
              <div className="mt-4 flex justify-center gap-3">
                <div className="glass px-2 py-1 text-xs rounded">
                  <span className="text-white/70">W: </span>
                  <span className="font-bold text-green-400">{team.wins}</span>
                </div>
                
                <div className="glass px-2 py-1 text-xs rounded">
                  <span className="text-white/70">L: </span>
                  <span className="font-bold text-red-400">{team.losses}</span>
                </div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-sm text-white/70">Tap to see players</div>
              <div className="mt-2 p-2 inline-flex items-center justify-center rounded-full bg-white/10 text-white">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Card Back */}
        <div className="card-back absolute inset-0">
          <div 
            className={`card-glass h-full p-6 flex flex-col items-center bg-gradient-to-br ${team.colorClass} bg-opacity-10`}
          >
            <div className="w-12 h-12 mb-4">
              <img 
                src={team.logo} 
                alt={team.name} 
                className="w-full h-full object-contain" 
              />
            </div>
            
            <h3 className="text-lg font-bold mb-2">{team.name} Players</h3>
            
            <div className="w-full overflow-auto flex-grow">
              <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                {team.players.map((player) => (
                  <div 
                    key={player.id}
                    className="glass p-3 flex items-center hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      showToast(
                        "Player Selected",
                        `Viewing ${player.name}'s profile`
                      );
                    }}
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 flex-shrink-0 overflow-hidden">
                      <img 
                        src={player.image} 
                        alt={player.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // (e.target as HTMLImageElement).src = 'https://via.placeholder.com/100?text=Player';
                        }} 
                      />
                    </div>
                    
                    <div className="ml-3 flex-grow">
                      <div className="flex items-center">
                        <p className="font-medium text-sm">{player.name}</p>
                        {player.isCaptain && (
                          <span className="ml-1 bg-yellow-500/20 text-yellow-400 text-[10px] px-1 rounded">C</span>
                        )}
                      </div>
                      <p className="text-xs text-white/70">{player.role}</p>
                    </div>
                    
                    <div className="text-right text-xs">
                      {player.role === 'Batsman' && (
                        <div>
                          <p className="font-medium">{player.stats.runs}</p>
                          <p className="text-white/70">runs</p>
                        </div>
                      )}
                      
                      {player.role === 'Bowler' && (
                        <div>
                          <p className="font-medium">{player.stats.wickets}</p>
                          <p className="text-white/70">wickets</p>
                        </div>
                      )}
                      
                      {(player.role === 'All-rounder' || player.role === 'Wicket-keeper') && (
                        <div>
                          <p className="font-medium">{player.stats.matches}</p>
                          <p className="text-white/70">matches</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-4 w-full">
              <button 
                className="w-full glass hover:bg-white/10 transition py-2 rounded-lg text-sm font-medium"
                onClick={handleViewCompleteTeam}
              >
                View Complete Team
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamCard;
