import { ArrowRight, ArrowUpRight, Check, Sparkles, Target, Users, Video } from 'lucide-react';
import { formatNumber } from '../data/dashboard.js';
import styles from './EarningHub.module.css';

const iconMap = {
  target: Target,
  sparkles: Sparkles,
  users: Users,
  play: Video,
};

export default function EarningHub({ opportunities }) {
  const goToGame = () => document.getElementById('play')?.scrollIntoView({ behavior: 'smooth', block: 'center' });

  return (
    <section className="section-block" id="earn">
      <div className="section-heading">
        <div>
          <span className="section-kicker">MAKE YOUR NEXT MOVE</span>
          <h2>Earn more XP & rewards</h2>
          <p>Choose your next step. New opportunities will appear as they become available.</p>
        </div>
        <span className={styles.featureCount}>01 AVAILABLE · 03 COMING SOON</span>
      </div>
      <div className={styles.cards}>
        {opportunities.map((item) => {
          const Icon = iconMap[item.icon];
          const available = item.status === 'Available';

          return (
            <article className={`${styles.card} ${available ? styles.available : ''}`} key={item.id}>
              <div className={styles.cardHeader}>
                <span className={styles.iconBox}><Icon size={18} /></span>
                <span className={`${styles.status} ${available ? styles.activeStatus : ''}`}>
                  {available && <span className={styles.statusDot} />}
                  {item.status}
                </span>
              </div>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <div className={styles.cardFooter}>
                <span>{available ? <><strong>{item.reward}</strong><small>Demo reward</small></> : <><strong>{item.reward}</strong><small>Concept</small></>}</span>
                {available ? (
                  <button type="button" aria-label={`Play ${item.title}`} onClick={goToGame}><ArrowRight size={16} /></button>
                ) : (
                  <span className={styles.soonLock}><Check size={13} /> Planned</span>
                )}
              </div>
            </article>
          );
        })}
      </div>
      <div className={styles.recommendation}>
        <div className={styles.recommendIcon}><Sparkles size={17} /></div>
        <div className={styles.recommendCopy}>
          <strong>Recommended for you</strong>
          <span>You’re {formatNumber(1580)} XP from Level 05. Try a Precision Sprint to keep your momentum going.</span>
        </div>
        <button type="button" onClick={goToGame}>Play now <ArrowUpRight size={15} /></button>
      </div>
    </section>
  );
}
