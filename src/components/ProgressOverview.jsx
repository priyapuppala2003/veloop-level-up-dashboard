import { ArrowDownRight, ArrowUpRight, ChevronRight, Sparkles } from 'lucide-react';
import InfoHint from './InfoHint.jsx';
import LevelBadge from './LevelBadge.jsx';
import { formatNumber } from '../data/dashboard.js';
import styles from './ProgressOverview.module.css';

export default function ProgressOverview({ data, onPreviewLevelUp }) {
  const { currentLevel, xp, nextReward } = data;
  const remaining = Math.max(xp.nextLevelTotal - xp.current, 0);
  const progress = Math.min((xp.current / xp.nextLevelTotal) * 100, 100);

  return (
    <section className={styles.grid} aria-label="Your level progress">
      <article className={styles.progressCard}>
        <div className={styles.topline}>
          <span className={styles.eyebrow}>YOUR JOURNEY</span>
          <span className={styles.demoBadge}><span /> Demo data</span>
        </div>
        <div className={styles.heroRow}>
          <LevelBadge level={currentLevel} size="large" state="current" />
          <div className={styles.identity}>
            <span className={styles.currentLabel}>CURRENT LEVEL</span>
            <h2>{currentLevel.name}</h2>
            <p>Keep your momentum</p>
          </div>
          <button className={styles.previewButton} type="button" onClick={onPreviewLevelUp}>
            Preview level-up <ChevronRight size={15} />
          </button>
        </div>

        <div className={styles.progressHeader}>
          <div>
            <div className={styles.xpLabel}>Experience points <InfoHint label="About experience points">
              XP helps you progress through VELOOP Rewards levels. Rewards and experiences depend on the platform's approved level configuration.
            </InfoHint></div>
            <div className={styles.xpValue}>{formatNumber(xp.current)} <span>XP</span></div>
          </div>
          <div className={styles.toNext}>
            <span>LEVEL {String(currentLevel.number + 1).padStart(2, '0')} GOAL</span>
            <strong>{formatNumber(xp.nextLevelTotal)} XP</strong>
          </div>
        </div>
        <div
          className={styles.progressTrack}
          role="progressbar"
          aria-label="Progress to next level"
          aria-valuenow={Math.round(progress)}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <span className={styles.progressFill} style={{ '--progress': `${progress}%` }} />
        </div>
        <div className={styles.progressFoot}>
          <span>{Math.round(progress)}% complete</span>
          <span><strong>{formatNumber(remaining)} XP</strong> to Level {String(currentLevel.number + 1).padStart(2, '0')}</span>
        </div>
        <div className={styles.momentum}>
          <div className={styles.momentumIcon}><ArrowUpRight size={16} /></div>
          <p>Every action brings your next milestone closer.</p>
          <Sparkles size={16} className={styles.sparkle} aria-hidden="true" />
        </div>
      </article>

      <article className={styles.rewardCard}>
        <div className={styles.rewardHeader}>
          <div>
            <span className={styles.eyebrow}>NEXT LEVEL REWARD</span>
            <h2>Something good<br />is within reach.</h2>
          </div>
          <InfoHint label="About the next-level reward">
            This demo reward is associated with the next level in the sample configuration. It is not a live or guaranteed reward.
          </InfoHint>
        </div>
        <div className={styles.rewardVisual} aria-hidden="true">
          <div className={styles.rewardHalo} />
          <div className={styles.rewardCoin}><span>V</span></div>
          <div className={styles.rewardSparkle}><Sparkles size={16} /></div>
          <div className={styles.rewardShadow} />
        </div>
        <div className={styles.rewardValue}>
          <div><strong>{formatNumber(nextReward.amount)}</strong><span>{nextReward.unit}</span></div>
          <span className={styles.lockedLabel}><span className={styles.lockIcon}>↗</span> Unlock at Level {String(nextReward.level).padStart(2, '0')}</span>
        </div>
        <div className={styles.rewardProgress}>
          <div><span>Unlock progress</span><strong>{Math.round(progress)}%</strong></div>
          <div className={styles.rewardTrack}><span style={{ width: `${progress}%` }} /></div>
        </div>
        <div className={styles.demoNote}><ArrowDownRight size={14} /> Demo value · Final rewards depend on approved rules</div>
      </article>
    </section>
  );
}
