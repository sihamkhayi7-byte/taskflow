import styles from './MainContent.module.css';

interface Column {
  id: string;
  title: string;
  tasks: string[];
}

export default function MainContent({ columns }: { columns: Column[] }) {
  return (
    <main className={styles.main}>
      <div className={styles.board}>
        {columns.map((col) => (
          <div key={col.id} className={styles.column}>
            <h3 className={styles.colTitle}>
              {col.title} <span className={styles.count}>{col.tasks.length}</span>
            </h3>
            <div className={styles.taskList}>
              {col.tasks.map((task, i) => (
                <div key={i} className={styles.card}>{task}</div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
