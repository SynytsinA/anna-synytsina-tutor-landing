import { useLanguage } from '@/context/LanguageContext';
import styles from './GameLoader.module.css';

export const GameLoader = () => {
  const { t } = useLanguage();

  return (
    <div className={styles.loaderContainer}>
      <div className={styles.wand}>
        <div className={styles.sparkles}>
          {[...Array(5)].map((_, i) => (
            <div key={i} className={styles.sparkle} />
          ))}
        </div>
      </div>
      <div className={styles.loadingText}>{t.themes.loader}</div>
    </div>
  );
};
