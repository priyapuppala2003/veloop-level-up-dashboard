import { useId } from 'react';
import { Info } from 'lucide-react';
import styles from './InfoHint.module.css';

export default function InfoHint({ label, children }) {
  const tooltipId = useId();

  return (
    <span className={styles.wrap}>
      <button className={styles.button} type="button" aria-label={label} aria-describedby={tooltipId}>
        <Info size={15} aria-hidden="true" />
      </button>
      <span className={styles.tooltip} id={tooltipId} role="tooltip">
        {children}
      </span>
    </span>
  );
}
