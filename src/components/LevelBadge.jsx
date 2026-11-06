import { Compass, Crown, Flame, Medal, Sprout, Star } from 'lucide-react';
import styles from './LevelBadge.module.css';

const badgeIcons = [Sprout, Compass, Medal, Crown, Flame, Star];

export default function LevelBadge({ level, size = 'small', state = 'locked' }) {
  const Icon = badgeIcons[(level.number - 1) % badgeIcons.length];
  const number = String(level.number).padStart(2, '0');

  return (
    <span
      className={`${styles.badge} ${styles[size]} ${styles[state]}`}
      role="img"
      aria-label={`${level.name}, level ${number}`}
    >
      <Icon className={styles.icon} aria-hidden="true" />
      <span className={styles.number}>{number}</span>
    </span>
  );
}
