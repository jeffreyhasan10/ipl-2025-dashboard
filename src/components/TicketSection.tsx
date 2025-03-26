
import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { showTicketBookingToast, showToast } from '@/lib/toast-utils';

interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  benefits: string[];
}

const tickets: TicketType[] = [
  {
    id: 'premium',
    name: 'Premium Experience',
    price: 8999,
    description: 'The ultimate cricket experience with the best views and premium services.',
    benefits: ['Premium seating', 'Lounge access', 'Complimentary food & drinks', 'Exclusive merchandise', 'Player meet & greet']
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 2999,
    description: 'Great seats with an amazing view of all the action.',
    benefits: ['Central stand seating', 'Food voucher', 'Official match program']
  },
  {
    id: 'budget',
    name: 'Value',
    price: 999,
    description: 'Be part of the electrifying atmosphere at an affordable price.',
    benefits: ['General seating', 'Great atmosphere', 'Access to all stadium amenities']
  }
];

const upcomingMatches = [
  {
    id: 1,
    team1: 'MI',
    team2: 'CSK',
    venue: 'Wankhede Stadium, Mumbai',
    date: '15 April 2025',
    time: '7:30 PM IST'
  },
  {
    id: 2,
    team1: 'RCB',
    team2: 'KKR',
    venue: 'M. Chinnaswamy Stadium, Bangalore',
    date: '18 April 2025',
    time: '7:30 PM IST'
  },
  {
    id: 3,
    team1: 'SRH',
    team2: 'DC',
    venue: 'Rajiv Gandhi Stadium, Hyderabad',
    date: '20 April 2025',
    time: '3:30 PM IST'
  }
];

const TicketSection = () => {
  const [selectedTicket, setSelectedTicket] = useState<string>('standard');
  const [selectedMatch, setSelectedMatch] = useState<number>(1);
  
  const handleBookNow = () => {
    const match = upcomingMatches.find(m => m.id === selectedMatch);
    const ticket = tickets.find(t => t.id === selectedTicket);
    
    if (match && ticket) {
      const matchDetails = `${match.team1} vs ${match.team2} on ${match.date} (${ticket.name} - ₹${ticket.price})`;
      showTicketBookingToast(matchDetails);
    }
  };

  return (
    <section id="tickets" className="section-container">
      <div className="mb-12 text-center">
        <span className="pill-tag mb-4">GET YOUR TICKETS</span>
        <h2 className="section-title">
          <span className="block bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            Book Your Seats
          </span>
        </h2>
        <p className="section-subtitle">
          Secure your spot for the most electrifying cricket experience of the year.
        </p>
      </div>
      
      <div className="glass p-8 rounded-2xl max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left column - Match selection */}
          <div>
            <h3 className="text-xl font-bold mb-4">Select a Match</h3>
            
            <div className="space-y-4">
              {upcomingMatches.map(match => (
                <div 
                  key={match.id}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedMatch === match.id
                      ? 'bg-white/10 border border-white/20 shadow-lg'
                      : 'bg-white/5 border border-transparent hover:bg-white/10'
                  }`}
                  onClick={() => {
                    setSelectedMatch(match.id);
                    showToast(
                      "Match Selected",
                      `${match.team1} vs ${match.team2} on ${match.date}`
                    );
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold">{match.team1}</span>
                        <span className="text-white/50">vs</span>
                        <span className="text-lg font-bold">{match.team2}</span>
                      </div>
                    </div>
                    
                    {selectedMatch === match.id && (
                      <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                    )}
                  </div>
                  
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <div className="flex items-center text-xs text-white/70">
                      <Calendar className="w-3 h-3 mr-1" />
                      {match.date}
                    </div>
                    <div className="flex items-center text-xs text-white/70">
                      <Clock className="w-3 h-3 mr-1" />
                      {match.time}
                    </div>
                    <div className="flex items-center text-xs text-white/70 col-span-2">
                      <MapPin className="w-3 h-3 mr-1" />
                      {match.venue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right column - Ticket types */}
          <div>
            <h3 className="text-xl font-bold mb-4">Choose Ticket Type</h3>
            
            <div className="space-y-4 mb-6">
              {tickets.map(ticket => (
                <div 
                  key={ticket.id}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    selectedTicket === ticket.id
                      ? 'bg-white/10 border border-white/20 shadow-lg'
                      : 'bg-white/5 border border-transparent hover:bg-white/10'
                  }`}
                  onClick={() => {
                    setSelectedTicket(ticket.id);
                    showToast(
                      "Ticket Type Selected",
                      `${ticket.name} - ₹${ticket.price}`
                    );
                  }}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold">{ticket.name}</h4>
                    <div className="text-right">
                      <span className="font-bold text-lg">₹{ticket.price}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-white/70 mt-1">{ticket.description}</p>
                  
                  {selectedTicket === ticket.id && (
                    <div className="mt-3 text-xs">
                      <div className="flex items-center mb-1">
                        <Users className="w-3 h-3 mr-1 text-blue-400" />
                        <span className="text-blue-400 font-medium">Ticket Benefits:</span>
                      </div>
                      <ul className="list-disc list-inside pl-1 space-y-1 text-white/70">
                        {ticket.benefits.map((benefit, index) => (
                          <li key={index}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <Button 
              className="w-full py-6 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg hover:shadow-lg hover:shadow-blue-500/20 transition-all"
              onClick={handleBookNow}
            >
              Book Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TicketSection;
