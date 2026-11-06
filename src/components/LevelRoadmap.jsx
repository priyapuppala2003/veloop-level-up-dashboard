import { Check, LockKeyhole, Sparkles } from 'lucide-react';
import LevelBadge from './LevelBadge.jsx';
import styles from './LevelRoadmap.module.css';

export default function LevelRoadmap({ levels }) {
  return (
    <section className="section-block" id="roadmap">
      <div className="section-heading">
        <div>
          <span className="section-kicker">THE ROAD AHEAD</span>
          <h2>Your level journey</h2>
          <p>Milestones make progress feel closer. Here's what lies ahead.</p>
        </div>
        <span className="roadmap-caption"><span className={styles.legendDot} /> 4 of 6 levels explored</span>
      </div>
      <div className={styles.roadmap} aria-label="Level progression roadmap">
        {levels.map((level, index) => (
          <article
            className={`${styles.levelCard} ${styles[level.state]}`}
            key={level.number}
            aria-current={level.state === 'current' ? 'step' : undefined}
          >
            {index < levels.length - 1 && <span className={styles.connector} aria-hidden="true" />}
            <div className={styles.levelTop}>
              {level.state === 'complete' && <Check size={14} aria-label="Completed" />}
              {level.state === 'locked' && <LockKeyhole size={13} aria-label="Locked" />}
              {level.state === 'current' && <Sparkles size={14} aria-label="Current level" />}
            </div>
            <div className={styles.badgeSlot}>
              <LevelBadge level={level} size="small" state={level.state} />
            </div>
            <h3>{level.name}</h3>
            <p>{level.reward}</p>
            <span className={styles.stateText}>
              {level.state === 'complete' && 'Completed'}
              {level.state === 'current' && 'You are here'}
              {level.state === 'next' && 'Next goal'}
              {level.state === 'locked' && 'Locked'}
            </span>
          </article>
        ))}
      </div>
    </section>
  );
}
