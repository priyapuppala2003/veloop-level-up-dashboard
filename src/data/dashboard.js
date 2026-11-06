export const dashboardData = {
  userName: 'Priya',
  currentLevel: {
    number: 4,
    name: 'Voyager',
  },
  xp: {
    current: 6420,
    nextLevelTotal: 8000,
  },
  nextReward: {
    amount: 500,
    unit: 'VEs',
    level: 5,
  },
  levels: [
    { number: 1, name: 'Starter', reward: 'Welcome badge', state: 'complete' },
    { number: 2, name: 'Explorer', reward: '100 VEs', state: 'complete' },
    { number: 3, name: 'Achiever', reward: '10 Gems', state: 'complete' },
    { number: 4, name: 'Voyager', reward: 'Current level', state: 'current' },
    { number: 5, name: 'Trailblazer', reward: '500 VEs', state: 'next' },
    { number: 6, name: 'Pioneer', reward: '2 bonus spins', state: 'locked' },
  ],
  activities: [
    { label: 'Daily check-in', detail: 'Yesterday · Demo activity', amount: '+40 XP', icon: 'sun' },
    { label: 'Precision Sprint', detail: 'Oct 28 · Demo activity', amount: '+20 XP', icon: 'target' },
    { label: 'Weekly quest', detail: 'Oct 25 · Demo activity', amount: '+100 XP', icon: 'flag' },
  ],
};

export const earningOpportunities = [
  {
    id: 'sprint',
    title: 'Precision Sprint',
    description: 'A quick skill challenge. Find your rhythm and build your streak.',
    reward: 'Up to +20 XP',
    status: 'Available',
    icon: 'target',
  },
  {
    id: 'daily',
    title: 'Daily missions',
    description: 'A fresh set of small goals to keep your progress moving.',
    reward: 'XP rewards',
    status: 'Coming soon',
    icon: 'sparkles',
  },
  {
    id: 'referral',
    title: 'Invite your circle',
    description: 'Bring friends to VELOOP and celebrate milestones together.',
    reward: 'Rewards',
    status: 'Coming soon',
    icon: 'users',
  },
  {
    id: 'watch',
    title: 'Watch & earn',
    description: 'Discover eligible partner stories and earning opportunities.',
    reward: 'XP rewards',
    status: 'Coming soon',
    icon: 'play',
  },
];

export const formatNumber = (value) => new Intl.NumberFormat('en-US').format(value);
