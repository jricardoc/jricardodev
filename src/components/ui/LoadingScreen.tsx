import { useEffect, useState } from "react";
import styles from "./LoadingScreen.module.css";

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Cinematic Timing Configuration
    const duration = 2800; // Slightly longer for the "build up"
    const startExitTime = 2400; // Trigger exit just before end

    // Counter animation
    const startTime = Date.now();
    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progressValue = Math.min(
        100,
        Math.floor((elapsed / startExitTime) * 100)
      );

      setProgress(progressValue);

      if (elapsed < duration) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);

    // Trigger exit (The "Flash" & Shutter)
    const exitTimer = setTimeout(() => {
      setIsExiting(true);
    }, startExitTime);

    // Complete (Unmount)
    const completeTimer = setTimeout(() => {
      onComplete();
    }, duration);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  // Format counter to always show 2 digits (e.g., 01, 09, 99)
  const formattedProgress = progress < 10 ? `0${progress}` : progress;

  return (
    <div className={`${styles.fixedOverlay} ${isExiting ? styles.exit : ""}`}>
      {/* Noise Texture */}
      <div className={styles.noise} />

      {/* Flash Effect Layer */}
      <div className={styles.flash} />

      {/* Shutter Panels */}
      <div className={`${styles.shutter} ${styles.shutterTop}`} />
      <div className={`${styles.shutter} ${styles.shutterBottom}`} />

      {/* Main Content */}
      <div className={styles.content}>
        <div className={styles.brandWrapper}>
          <div className={styles.firstName}>Ricardo</div>
          <div className={styles.lastName}>Carvalho</div>
        </div>
      </div>

      {/* Technical Counter (Bottom Right) */}
      <div className={styles.counterWrapper}>
        <span className={styles.counterValue}>{formattedProgress}</span>
        <span className={styles.counterLabel}>% loaded</span>
      </div>
    </div>
  );
}
