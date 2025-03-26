
export interface TeamData {
  id: string;
  name: string;
  shortName: string;
  colorClass: string;
  logo: string;
  tagline: string;
  captainImage?: string;
  players: Player[];
  recentForm: string[];
  matchesPlayed: number;
  wins: number;
  losses: number;
}

export interface Player {
  id: number;
  name: string;
  role: string;
  country: string;
  image: string;
  isCaptain?: boolean;
  stats: {
    matches: number;
    runs?: number;
    average?: number;
    wickets?: number;
    economy?: number;
    strikeRate?: number;
  };
}

export interface MatchPrediction {
  team1Chance: number;
  team2Chance: number;
  keyFactors: string[];
  playerToWatch: {
    id: number;
    teamId: string;
    reason: string;
  };
}

export const teams: TeamData[] = [
  {
    id: 'mi',
    name: 'Mumbai Indians',
    shortName: 'MI',
    colorClass: 'from-blue-600 to-blue-800',
    logo: '/MIoutline.png',
    tagline: "Duniya Hila Denge!",
    captainImage: '/hardik-pandya.png',
    recentForm: ['W', 'W', 'L', 'W', 'L'],
    matchesPlayed: 14,
    wins: 8,
    losses: 6,
    players: [
      {
        id: 1,
        name: 'Rohit Sharma',
        role: 'Batsman',
        country: 'India',
        image: '/rohit-sharma.png',
        stats: {
          matches: 228,
          runs: 5879,
          average: 30.30,
          strikeRate: 130.05
        }
      },
      {
        id: 2,
        name: 'Jasprit Bumrah',
        role: 'Bowler',
        country: 'India',
        image: '/jaspirit-bumrah.png',
        stats: {
          matches: 120,
          wickets: 145,
          economy: 7.39,
          strikeRate: 18.29
        }
      },
      {
        id: 25,
        name: 'Hardik Pandya',
        role: 'All-rounder',
        country: 'India',
        image: '/hardik-pandya.png',
        isCaptain: true,
        stats: {
          matches: 107,
          runs: 1476,
          wickets: 50,
          economy: 8.97,
          strikeRate: 153.91
        }
      }
    ]
  },
  {
    id: 'csk',
    name: 'Chennai Super Kings',
    shortName: 'CSK',
    colorClass: 'from-yellow-400 to-yellow-600',
    logo: '/CSKoutline.png',
    tagline: "Whistle Podu!",
    captainImage: '/ruturaj-gaikwad.png',
    recentForm: ['W', 'L', 'W', 'L', 'W'],
    matchesPlayed: 14,
    wins: 8,
    losses: 6,
    players: [
      {
        id: 3,
        name: 'MS Dhoni',
        role: 'Wicket-keeper',
        country: 'India',
        image: '/ms-dhoni.png',
        stats: {
          matches: 234,
          runs: 4978,
          average: 39.20,
          strikeRate: 135.20
        }
      },
      {
        id: 4,
        name: 'Ruturaj Gaikwad',
        role: 'Batsman',
        country: 'India',
        image: '/ruturaj-gaikwad.png',
        isCaptain: true,
        stats: {
          matches: 52,
          runs: 1797,
          average: 39.07,
          strikeRate: 135.52
        }
      }
    ]
  },
  {
    id: 'rcb',
    name: 'Royal Challengers Bangalore',
    shortName: 'RCB',
    colorClass: 'from-red-600 to-red-800',
    logo: 'RCBoutline.png',
    tagline: "Play Bold!",
    captainImage: '/rajput-patidar.png',
    recentForm: ['L', 'W', 'W', 'W', 'L'],
    matchesPlayed: 14,
    wins: 7,
    losses: 7,
    players: [
      {
        id: 5,
        name: 'Virat Kohli',
        role: 'Batsman',
        country: 'India',
        image: '/virat-kohli.png',
        stats: {
          matches: 237,
          runs: 7263,
          average: 37.24,
          strikeRate: 130.02
        }
      },
      {
        id: 6,
        name: 'krunal-pandya',
        role: 'Bowler',
        country: 'India',
        image: '/krunal-pandya.png',
        stats: {
          matches: 84,
          wickets: 93,
          economy: 8.71,
          strikeRate: 19.54
        }
      }
    ]
  },
  {
    id: 'kkr',
    name: 'Kolkata Knight Riders',
    shortName: 'KKR',
    colorClass: 'from-purple-700 to-purple-900',
    logo: '/KKRoutline.png',
    tagline: "Korbo Lorbo Jeetbo!",
    captainImage: '/ajinkya-rahane.png',
    recentForm: ['W', 'W', 'W', 'L', 'W'],
    matchesPlayed: 14,
    wins: 10,
    losses: 4,
    players: [
      {
        id: 7,
        name: 'ajinkya-rahane',
        role: 'Batsman',
        country: 'India',
        image: '/ajinkya-rahane.png',
        isCaptain: true,
        stats: {
          matches: 101,
          runs: 2776,
          average: 31.55,
          strikeRate: 125.38
        }
      },
      {
        id: 8,
        name: 'Varun Chakravarthy',
        role: 'All-rounder',
        country: 'West Indies',
        image: '/varun-chakravarthy.png',
        stats: {
          matches: 162,
          wickets: 163,
          economy: 6.67,
          strikeRate: 22.19
        }
      }
    ]
  },
  {
    id: 'dc',
    name: 'Delhi Capitals',
    shortName: 'DC',
    colorClass: 'from-blue-700 to-blue-900',
    logo: '/DCoutline.png',
    tagline: "Roar Machaa!",
    captainImage: '/axer-patel.png',
    recentForm: ['L', 'L', 'W', 'L', 'W'],
    matchesPlayed: 14,
    wins: 5,
    losses: 9,
    players: [
      {
        id: 9,
        name: 'Kl Rahul',
        role: 'Wicket-keeper',
        country: 'India',
        image: '/kl-rahul.png',
        isCaptain: true,
        stats: {
          matches: 98,
          runs: 2838,
          average: 34.61,
          strikeRate: 147.97
        }
      },
      {
        id: 10,
        name: 'Axar Patel',
        role: 'All-rounder',
        country: 'India',
        image: '/axar-patel.png',
        stats: {
          matches: 140,
          wickets: 112,
          economy: 7.44,
          strikeRate: 27.79
        }
      }
    ]
  },
  {
    id: 'srh',
    name: 'Sunrisers Hyderabad',
    shortName: 'SRH',
    colorClass: 'from-orange-500 to-orange-700',
    logo: '/SRHoutline.png',
    tagline: "Rise Up!",
    captainImage: '/pat-cummins.png',
    recentForm: ['W', 'W', 'L', 'W', 'W'],
    matchesPlayed: 14,
    wins: 9,
    losses: 5,
    players: [
      {
        id: 11,
        name: 'Pat Cummins',
        role: 'All-rounder',
        country: 'Australia',
        image: '/pat-cummins.png',
        isCaptain: true,
        stats: {
          matches: 42,
          wickets: 45,
          economy: 8.54,
          strikeRate: 21.18
        }
      },
      {
        id: 12,
        name: 'Heinrich Klaasen',
        role: 'Wicket-keeper',
        country: 'South Africa',
        image: '/heinrich-klaasen.png',
        stats: {
          matches: 19,
          runs: 687,
          average: 59.54,
          strikeRate: 181.47
        }
      }
    ]
  },
  {
    id: 'gt',
    name: 'Gujarat Titans',
    shortName: 'GT',
    colorClass: 'from-blue-500 to-blue-700',
    logo: '/GToutline.png',
    tagline: "Aava De!",
    captainImage: '/shubman-gill.png',
    recentForm: ['L', 'W', 'L', 'L', 'W'],
    matchesPlayed: 14,
    wins: 6,
    losses: 8,
    players: [
      {
        id: 13,
        name: 'Shubman Gill',
        role: 'Batsman',
        country: 'India',
        image: '/shubman-gill.png',
        isCaptain: true,
        stats: {
          matches: 77,
          runs: 2230,
          average: 37.79,
          strikeRate: 133.86
        }
      },
      {
        id: 14,
        name: 'Rashid Khan',
        role: 'Bowler',
        country: 'Afghanistan',
        image: '/rashid-khan.png',
        stats: {
          matches: 109,
          wickets: 130,
          economy: 6.89,
          strikeRate: 18.57
        }
      }
    ]
  },
  {
    id: 'lsg',
    name: 'Lucknow Super Giants',
    shortName: 'LSG',
    colorClass: 'from-blue-400 to-cyan-500',
    logo: '/LSGoutline.png',
    tagline: "Muskuraiye, Lucknow Waale!",
    captainImage: '/Rishabh-pant.png',
    recentForm: ['W', 'L', 'L', 'W', 'L'],
    matchesPlayed: 14,
    wins: 7,
    losses: 7,
    players: [
      {
        id: 15,
        name: 'Rishabh-pant',
        role: 'Batsman',
        country: 'India',
        image: '/Rishabh-pant.png',
        isCaptain: true,
        stats: {
          matches: 119,
          runs: 4163,
          average: 46.78,
          strikeRate: 134.55
        }
      },
      {
        id: 16,
        name: 'Nicholas Pooran',
        role: 'Wicket-keeper',
        country: 'West Indies',
        image: '/nichoolas-pooran.png',
        stats: {
          matches: 57,
          runs: 1270,
          average: 29.53,
          strikeRate: 162.21
        }
      }
    ]
  },
  {
    id: 'pbks',
    name: 'Punjab Kings',
    shortName: 'PBKS',
    colorClass: 'from-red-500 to-red-700',
    logo: '/PBKSoutline.png',
    tagline: "Sher Squad!",
    captainImage: '/shreyas-iyer.png',
    recentForm: ['L', 'L', 'W', 'L', 'L'],
    matchesPlayed: 14,
    wins: 4,
    losses: 10,
    players: [
      {
        id: 17,
        name: 'shreyas-iyer',
        role: 'Batsman',
        country: 'India',
        image: '/Shreyas-iyer.png',
        isCaptain: true,
        stats: {
          matches: 217,
          runs: 6617,
          average: 35.04,
          strikeRate: 127.61
        }
      },
      {
        id: 18,
        name: 'Arshdeep Singh',
        role: 'Bowler',
        country: 'India',
        image: '/arshdeep-singh.png',
        stats: {
          matches: 65,
          wickets: 77,
          economy: 8.71,
          strikeRate: 17.01
        }
      }
    ]
  },
  {
    id: 'rr',
    name: 'Rajasthan Royals',
    shortName: 'RR',
    colorClass: 'from-pink-500 to-pink-700',
    logo: 'RRoutline.png',
    tagline: "Halla Bol!",
    captainImage: '/Sanju-samson.png',
    recentForm: ['W', 'W', 'L', 'W', 'W'],
    matchesPlayed: 14,
    wins: 9,
    losses: 5,
    players: [
      {
        id: 19,
        name: 'Sanju Samson',
        role: 'Wicket-keeper',
        country: 'India',
        image: '/Sanju-samson.png',
        isCaptain: true,
        stats: {
          matches: 152,
          runs: 4003,
          average: 30.33,
          strikeRate: 137.95
        }
      },
      {
        id: 20,
        name: 'sandeep-sharma',
        role: 'Bowler',
        country: 'India',
        image: '/sandeep-sharma.png',
        stats: {
          matches: 145,
          wickets: 187,
          economy: 7.67,
          strikeRate: 16.95
        }
      }
    ]
  }
];

export const liveMatch = {
  id: 'match-1',
  team1: {
    id: 'mi',
    score: 162,
    wickets: 5,
    overs: 18.2,
  },
  team2: {
    id: 'csk',
    score: 128,
    wickets: 7,
    overs: 16.4,
  },
  isLive: true,
  venue: 'Wankhede Stadium, Mumbai',
  date: '2025-04-10',
  prediction: {
    team1Chance: 65,
    team2Chance: 35,
    keyFactors: [
      "MI's strong middle-order performance",
      "CSK struggling against pace bowling"
    ],
    playerToWatch: {
      id: 2,
      teamId: 'mi',
      reason: "Exceptional death bowling"
    }
  }
};

export const upcomingMatches = [
  {
    id: 'match-2',
    team1Id: 'rcb',
    team2Id: 'kkr',
    venue: 'M. Chinnaswamy Stadium, Bangalore',
    date: '2025-04-12',
    time: '19:30 IST',
    prediction: {
      team1Chance: 45,
      team2Chance: 55,
      keyFactors: [
        "KKR's top form in last 5 matches",
        "RCB's strong home record"
      ],
      playerToWatch: {
        id: 8,
        teamId: 'kkr',
        reason: "Impact in powerplay overs"
      }
    }
  },
  {
    id: 'match-3',
    team1Id: 'dc',
    team2Id: 'srh',
    venue: 'Arun Jaitley Stadium, Delhi',
    date: '2025-04-13',
    time: '15:30 IST',
    prediction: {
      team1Chance: 40,
      team2Chance: 60,
      keyFactors: [
        "SRH's batting strength",
        "DC's inconsistent performance"
      ],
      playerToWatch: {
        id: 12,
        teamId: 'srh',
        reason: "Middle overs acceleration"
      }
    }
  }
];
