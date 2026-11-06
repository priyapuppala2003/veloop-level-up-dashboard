# VELOOP Rewards — Level-Up Dashboard

A responsive concept for a premium level progression and rewards hub. The page brings current XP, the next milestone, a level roadmap, a skill-based mini-game, and future earning concepts into one experience.

> **Prototype notice:** All level, XP, reward, and activity values are illustrative demo data. The game uses local interface state only; it does not award XP or interact with a VELOOP account. New earning features are marked **Coming soon** until approved and connected to supported product services.

## Project overview

- Current level and XP progress at a glance
- Six collectible-style level badges, with distinct rank icons and visual states for completed, current, upcoming, and locked milestones
- XP remaining and the next level goal called out explicitly
- Locked next-level reward preview
- Six-step level roadmap with completed, current, next, and locked states
- “Precision Sprint,” a 15-second tap-based skill-game prototype with score, result, demo reward threshold, and replay
- Earning opportunity cards, including concepts clearly marked Coming soon
- Recent XP activity, contextual information, loading, error, and empty states
- Level-up celebration preview
- Responsive layout for mobile (320px+), tablet, laptop, and desktop

## Level and XP system

The sample dashboard data is kept separately in `src/data/dashboard.js` so it can later be replaced by an approved API response. It currently shows Level 04 (Voyager), 6,420 XP, and 8,000 XP as the next-level threshold. The interface calculates the remaining XP and progress percentage from those values.

## Next-level rewards

The sample Level 05 reward is 500 VEs. It is labeled as a demo value and does not imply a live or guaranteed reward. Final reward rules and data should come from the product backend.

## Game concept and rules

**Precision Sprint** is a short, skill-based interaction rather than a chance-based game.

- Tap the moving signal target as many times as possible in 15 seconds.
- Each successful tap adds one point.
- 10 or more hits reveal a **+20 XP demo reward**.
- The result screen shows the score and whether the demo threshold was reached.
- Replay is available freely in this prototype.
- Results exist only in local React state; no XP or VEs are issued to an account.
- Live eligibility, rate limits, and reward values require product approval.

## Earning features

Precision Sprint is available as a frontend demo. Daily missions, referrals, and Watch & Earn are shown as **Coming soon** concepts. They do not claim to be supported earning mechanisms.

## Technology stack

- React 19 and React Hooks
- Vite
- Bootstrap 5
- CSS Modules
- Lucide React

## Installation

Requirements: Node.js 20.19+ or 22.12+.

```bash
npm install
npm run dev
```

## Development commands

```bash
npm run dev       # Start the local development server
npm run build     # Create a production build in dist/
npm run preview   # Preview the production build locally
```

## Folder structure

```text
src/
  components/
    ActivityPanel.jsx
    EarningHub.jsx
    InfoHint.jsx
    LevelBadge.jsx
    LevelRoadmap.jsx
    PrecisionSprint.jsx
    ProgressOverview.jsx
  data/
    dashboard.js
  styles/
    global.css
  App.jsx
  main.jsx
```

## Component architecture

- `App.jsx` composes the dashboard, navigation, loading/error states, and level-up preview.
- `ProgressOverview` presents current level, XP progress, and the locked next reward.
- `LevelRoadmap` renders the completed/current/next/locked level states.
- `LevelBadge` gives each milestone a distinct rank icon and state treatment; the same badge is used for the current level and the roadmap.
- `PrecisionSprint` owns the playable game state and result/replay flow.
- `EarningHub` lists currently available and planned activities.
- `ActivityPanel` displays sample XP history or a no-activity empty state.
- `src/data/dashboard.js` separates sample configuration from presentation.

## Responsive behavior

The desktop layout uses a persistent side navigation and multi-column cards. At tablet and mobile widths the navigation becomes a drawer, content cards stack, and roadmap and earning cards reflow without horizontal scrolling. The layout supports a 320px minimum viewport.

## Animation and accessibility

Progress bars animate on entry; cards, the game target, and level-up preview use subtle transitions. Reduced-motion preferences disable nonessential animations. Interactive controls have keyboard focus styles and accessible labels; game score updates are announced to assistive technology.

## Screenshots and demo links

Screenshots can be added after capture.

- Live demo: Not deployed
- GitHub repository: https://github.com/priyapuppala2003/veloop-level-up-dashboard
- Deployment fallback is configured for `/Lvl-Dashboard` on Vercel and Netlify.

## Author

Priya Puppala
