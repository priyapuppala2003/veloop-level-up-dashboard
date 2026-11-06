import { useEffect, useState } from 'react';
import {
  Activity,
  ArrowUpRight,
  Bell,
  ChevronDown,
  CircleHelp,
  Compass,
  Crown,
  Gamepad2,
  Gift,
  Menu,
  RotateCcw,
  Sparkles,
  Trophy,
  X,
} from 'lucide-react';
import ActivityPanel from './components/ActivityPanel.jsx';
import EarningHub from './components/EarningHub.jsx';
import LevelRoadmap from './components/LevelRoadmap.jsx';
import PrecisionSprint from './components/PrecisionSprint.jsx';
import ProgressOverview from './components/ProgressOverview.jsx';
import { dashboardData, earningOpportunities } from './data/dashboard.js';
import styles from './App.module.css';

const navigation = [
  { label: 'Overview', href: '#overview', icon: Compass },
  { label: 'Level journey', href: '#roadmap', icon: Trophy },
  { label: 'Play & earn', href: '#play', icon: Gamepad2 },
  { label: 'Opportunities', href: '#earn', icon: Gift },
  { label: 'XP activity', href: '#activity', icon: Activity },
];

function SkeletonDashboard() {
  return (
    <div className={styles.skeleton} role="status" aria-label="Loading level progress">
      <span className={styles.skeletonWide} />
      <span className={styles.skeletonShort} />
      <span className={styles.skeletonBlock} />
      <span className={styles.skeletonBlock} />
    </div>
  );
}

function LevelUpDialog({ onClose }) {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className={styles.modalBackdrop} role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}>
      <section className={styles.levelUpModal} role="dialog" aria-modal="true" aria-labelledby="level-up-title">
        <button className={styles.closeModal} type="button" aria-label="Close preview" onClick={onClose}><X size={18} /></button>
        <div className={styles.modalGlow} />
        <div className={styles.modalBadge}><Crown size={29} /></div>
        <span className={styles.modalEyebrow}>MILESTONE PREVIEW</span>
        <h2 id="level-up-title">A new chapter<br />starts here.</h2>
        <span className={styles.modalLevel}>LEVEL 05 <Sparkles size={15} /></span>
        <div className={styles.modalReward}><strong>+500 VEs</strong><span>Sample reward · Demo only</span></div>
        <p>In a live experience, reaching the next level may unlock rewards according to VELOOP’s approved level configuration.</p>
        <button className={styles.continueButton} type="button" onClick={onClose}>Back to your journey</button>
      </section>
    </div>
  );
}

function ErrorState({ onRetry }) {
  return (
    <div className={styles.errorState} role="alert">
      <span><CircleHelp size={22} /></span>
      <h2>Unable to load level progress</h2>
      <p>We couldn’t load your level information right now. Please try again.</p>
      <button type="button" onClick={onRetry}><RotateCcw size={15} /> Try again</button>
    </div>
  );
}

export default function App() {
  const [loadState, setLoadState] = useState('loading');
  const [data, setData] = useState(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const loadData = () => {
    setLoadState('loading');
    window.setTimeout(() => {
      try {
        setData(dashboardData);
        setLoadState('loaded');
      } catch {
        setLoadState('error');
      }
    }, 260);
  };

  useEffect(() => {
    loadData();
  }, []);

  const closeNav = () => setMobileNavOpen(false);

  if (loadState === 'loading') {
    return <main className={styles.loadingPage}><SkeletonDashboard /></main>;
  }

  if (loadState === 'error' || !data) {
    return <main className={styles.loadingPage}><ErrorState onRetry={loadData} /></main>;
  }

  return (
    <div className={styles.appShell} id="overview">
      <aside className={`${styles.sidebar} ${mobileNavOpen ? styles.sidebarOpen : ''}`}>
        <a className={styles.brand} href="#overview" onClick={closeNav} aria-label="VELOOP home">
          <span className={styles.brandMark}><span /></span>
          <span>VELOOP<span className={styles.brandSub}>REWARDS</span></span>
        </a>
        <div className={styles.sideLabel}>YOUR SPACE</div>
        <nav className={styles.nav} aria-label="Main navigation">
          {navigation.map(({ label, href, icon: Icon }, index) => (
            <a className={`${styles.navLink} ${index === 0 ? styles.navActive : ''}`} href={href} key={label} onClick={closeNav}>
              <Icon size={17} strokeWidth={1.8} /><span>{label}</span>
              {index === 3 && <span className={styles.navNew}>NEW</span>}
            </a>
          ))}
        </nav>
        <div className={styles.sidebarBottom}>
          <div className={styles.streakCard}>
            <div className={styles.streakTop}><Sparkles size={15} /><span>YOUR MOMENTUM</span></div>
            <strong>Keep showing up.</strong>
            <p>Small steps can make a big difference.</p>
            <div className={styles.streakDots}><i /><i /><i /><i /><i /><span>+2</span></div>
          </div>
          <button className={styles.helpLink} type="button" onClick={() => document.getElementById('level-info')?.showModal()}>
            <CircleHelp size={16} /> Help & level info <ArrowUpRight size={13} />
          </button>
          <dialog id="level-info" className={styles.nativeDialog}>
            <form method="dialog">
              <div className={styles.dialogHeader}><strong>About your level</strong><button aria-label="Close">×</button></div>
              <p>XP helps you progress through VELOOP Rewards levels. Sample values, earning activities, and rewards shown here are for product design preview only.</p>
              <button className={styles.dialogDone}>Got it</button>
            </form>
          </dialog>
          <div className={styles.profile}>
            <div className={styles.avatar}>PP</div>
            <div><strong>{data.userName} Puppala</strong><span>Member account</span></div>
            <ChevronDown size={15} />
          </div>
        </div>
      </aside>

      {mobileNavOpen && <button className={styles.mobileOverlay} aria-label="Close navigation" onClick={closeNav} />}
      <main className={styles.main}>
        <header className={styles.topbar}>
          <button className={styles.menuButton} type="button" aria-label={mobileNavOpen ? 'Close menu' : 'Open menu'} onClick={() => setMobileNavOpen((open) => !open)}>
            {mobileNavOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className={styles.breadcrumb}><span>Rewards</span><span>/</span><strong>Level up</strong></div>
          <div className={styles.topActions}>
            <span className={styles.demoMode}>DEMO PREVIEW</span>
            <button className={styles.bellButton} type="button" aria-label="Notifications"><Bell size={18} /><i /></button>
            <div className={styles.topAvatar}>PP</div>
          </div>
        </header>

        <div className={styles.content}>
          <section className={styles.pageIntro}>
            <div>
              <span className={styles.welcome}>GOOD TO SEE YOU, {data.userName.toUpperCase()} <span>✦</span></span>
              <h1>Your next level is<br className={styles.mobileBreak} /> within reach.</h1>
              <p>Keep earning XP, unlock new milestones, and discover rewards along the way.</p>
            </div>
            <div className={styles.introMark} aria-hidden="true"><div><Crown size={24} /></div><span>YOUR JOURNEY<br />STARTS HERE</span></div>
          </section>

          <ProgressOverview data={data} onPreviewLevelUp={() => setShowLevelUp(true)} />
          <LevelRoadmap levels={data.levels} />
          <PrecisionSprint />
          <EarningHub opportunities={earningOpportunities} />
          <ActivityPanel activities={data.activities} />
          <footer className={styles.footer}>
            <span>VELOOP REWARDS <span>·</span> LEVEL-UP EXPERIENCE</span>
            <span>All rewards shown are illustrative demo values.</span>
          </footer>
        </div>
      </main>
      {showLevelUp && <LevelUpDialog onClose={() => setShowLevelUp(false)} />}
    </div>
  );
}
