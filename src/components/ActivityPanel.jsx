import { ArrowUpRight, Flag, Sun, Target } from 'lucide-react';
import styles from './ActivityPanel.module.css';

const icons = { sun: Sun, target: Target, flag: Flag };

export default function ActivityPanel({ activities }) {
  return (
    <section className="section-block" id="activity">
      <div className="section-heading">
        <div>
          <span className="section-kicker">SMALL STEPS ADD UP</span>
          <h2>Recent XP activity</h2>
          <p>See how your journey is taking shape.</p>
        </div>
        <span className={styles.demoTag}>DEMO ACTIVITY</span>
      </div>
      <div className={styles.panel}>
        {activities.length === 0 ? (
          <div className={styles.empty}>
            <span className={styles.emptyIcon}><ArrowUpRight size={18} /></span>
            <strong>Your XP journey starts here</strong>
            <span>Try a challenge or explore earning opportunities to get moving.</span>
          </div>
        ) : (
          activities.map((activity, index) => {
            const Icon = icons[activity.icon] ?? Flag;
            return (
              <div className={styles.row} key={`${activity.label}-${index}`}>
                <span className={styles.activityIcon}><Icon size={16} /></span>
                <span className={styles.activityText}><strong>{activity.label}</strong><small>{activity.detail}</small></span>
                <span className={styles.amount}>{activity.amount}</span>
              </div>
            );
          })
        )}
      </div>
      <p className={styles.disclaimer}>Sample entries for design preview only. This dashboard is not connected to a live account.</p>
    </section>
  );
}
