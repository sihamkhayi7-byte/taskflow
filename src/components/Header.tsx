import styles from './Header.module.css';



interface HeaderProps {
  title: string;
  onMenuClick: () => void;
  userName?: string;
  onLogout?: () => void;
}

export default function Header({ title, onMenuClick, userName, onLogout }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick}>☰</button>
        <h1 className={styles.logo}>{title}</h1>
      </div>
      <div className={styles.right} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        {userName && <span style={{ color: 'white' }}>{userName}</span>}
        {onLogout && (
          <button 
            onClick={onLogout}
            style={{ padding: '4px 8px', borderRadius: '4px', cursor: 'pointer' }}
          >
            Déconnexion
          </button>
        )}
      </div>
    </header>
  );
}