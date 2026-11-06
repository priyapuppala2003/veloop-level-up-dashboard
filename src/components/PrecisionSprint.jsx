import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Check, Clock3, RotateCcw, Target, Zap } from 'lucide-react';
import styles from './PrecisionSprint.module.css';

const ROUND_SECONDS = 15;
const REWARD_THRESHOLD = 10;

export default function PrecisionSprint() {
  const [gameState, setGameState] = useState('ready');
  const [secondsLeft, setSecondsLeft] = useState(ROUND_SECONDS);
  const [score, setScore] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ x: 50, y: 50 });
  const timerRef = useRef(null);

  useEffect(() => () => window.clearInterval(timerRef.current), []);

  useEffect(() => {
    if (gameState === 'playing' && secondsLeft === 0) {
      window.clearInterval(timerRef.current);
      setGameState('result');
    }
  }, [gameState, secondsLeft]);

  const startGame = () => {
    window.clearInterval(timerRef.current);
    setScore(0);
    setSecondsLeft(ROUND_SECONDS);
    setTargetPosition({ x: 50, y: 50 });
    setGameState('playing');
    timerRef.current = window.setInterval(() => {
      setSecondsLeft((seconds) => Math.max(seconds - 1, 0));
    }, 1000);
  };

  const hitTarget = () => {
    if (gameState !== 'playing') return;
    setScore((current) => current + 1);
    setTargetPosition({
      x: 17 + Math.random() * 66,
      y: 18 + Math.random() * 64,
    });
  };

  const earnedDemoReward = score >= REWARD_THRESHOLD;

  return (
    <section className="section-block" id="play">
      <div className="section-heading">
        <div>
          <span className="section-kicker">A LITTLE MOMENTUM</span>
          <h2>Play your way forward</h2>
          <p>A quick skill challenge. Just you, a target, and 15 seconds.</p>
        </div>
        <span className={styles.demoOnly}>FRONTEND DEMO</span>
      </div>

      <article className={styles.gameCard}>
        <div className={styles.gameInfo}>
          <div className={styles.gameTitleLine}>
            <span className={styles.gameIcon}><Target size={19} /></span>
            <div>
              <h3>Precision Sprint</h3>
              <span className={styles.skillTag}><span /> SKILL CHALLENGE</span>
            </div>
          </div>
          <p className={styles.intro}>Tap the moving signal as many times as you can before the clock runs out. Find your focus and beat your best.</p>
          <div className={styles.rules}>
            <div><Clock3 size={15} /><span><strong>15 sec</strong><small>One quick round</small></span></div>
            <div><Target size={15} /><span><strong>Tap to score</strong><small>Each hit counts</small></span></div>
            <div><Zap size={15} /><span><strong>10+ hits</strong><small>Demo reward threshold</small></span></div>
          </div>
          <div className={styles.rewardPill}><span>DEMO REWARD</span><strong>+20 XP</strong><small>Not credited to an account</small></div>
          <div className={styles.eligibility}>Replay freely in this prototype. Live eligibility and reward rules require product approval.</div>
          {gameState === 'ready' && (
            <button type="button" className={styles.startButton} onClick={startGame}>
              Start challenge <ArrowUpRight size={16} />
            </button>
          )}
          {gameState === 'result' && (
            <button type="button" className={styles.startButton} onClick={startGame}>
              Play again <RotateCcw size={15} />
            </button>
          )}
        </div>

        <div className={`${styles.playArea} ${gameState === 'playing' ? styles.active : ''}`} aria-label="Precision Sprint play area">
          <div className={styles.gameTopBar}>
            <span><span className={styles.liveDot} /> {gameState === 'playing' ? 'ROUND IN PROGRESS' : 'READY WHEN YOU ARE'}</span>
            <div><span>TIME</span><strong>{String(secondsLeft).padStart(2, '0')}<small>s</small></strong></div>
          </div>
          <div className={styles.playField}>
            <div className={styles.gridTexture} aria-hidden="true" />
            {gameState === 'ready' && (
              <div className={styles.readyMessage}>
                <div className={styles.targetPreview}><Target size={25} /></div>
                <strong>Make every second count</strong>
                <span>Start the round to reveal your signal.</span>
              </div>
            )}
            {gameState === 'playing' && (
              <button
                type="button"
                className={styles.target}
                style={{ left: `${targetPosition.x}%`, top: `${targetPosition.y}%` }}
                onClick={hitTarget}
                aria-label="Tap the signal target"
              >
                <span /><span /><span />
              </button>
            )}
            {gameState === 'result' && (
              <div className={styles.result}>
                <div className={styles.resultCheck}>{earnedDemoReward ? <Check size={23} /> : <Target size={22} />}</div>
                <span className={styles.resultCaption}>{earnedDemoReward ? 'NICE FOCUS' : 'ROUND COMPLETE'}</span>
                <strong className={styles.finalScore}>{score}<small> hits</small></strong>
                <span className={styles.resultMessage}>{earnedDemoReward ? 'You unlocked the demo reward.' : 'Reach 10 hits to unlock the demo reward.'}</span>
                {earnedDemoReward && <span className={styles.resultReward}>+20 XP <small>DEMO ONLY</small></span>}
              </div>
            )}
            {gameState === 'playing' && (
              <div className={styles.scoreCounter} aria-live="polite">
                <span>SCORE</span><strong>{String(score).padStart(2, '0')}</strong>
              </div>
            )}
          </div>
          <div className={styles.gameBottomBar}>
            <span>BEST ROUND <strong>{score > 0 ? score : '—'}</strong></span>
            {gameState === 'playing' && <span>Tap the signal <span className={styles.tapPulse} /> </span>}
            {gameState === 'result' && <span className={styles.completedLabel}><Check size={13} /> ROUND COMPLETE</span>}
            {gameState === 'ready' && <span>Practice round</span>}
          </div>
        </div>
      </article>
      <p className={styles.finePrint}>Prototype only: game results are stored in local interface state. No XP or VEs are issued to a VELOOP account.</p>
    </section>
  );
}
