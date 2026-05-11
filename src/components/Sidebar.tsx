import { NavLink } from 'react-router-dom';
import styles from './Sidebar.module.css';

// Définition de l'interface Project (doit être identique à celle du Dashboard)
interface Project {
  id: string;
  name: string;
  color: string;
}

// Mise à jour de SidebarProps pour inclure les fonctions de modification
interface SidebarProps {
  projects: Project[];
  isOpen: boolean;
  onRename: (project: Project) => void; // AJOUT
  onDelete: (id: string) => void;      // AJOUT
}

export default function Sidebar({ projects, isOpen, onRename, onDelete }: SidebarProps) {
  return (
    <aside className={`${styles.sidebar} ${isOpen ? styles.open : styles.closed}`}>
      <h2 className={styles.title}>Mes Projets</h2>
      <ul className={styles.list}>
        {projects.map((p) => (
          <li key={p.id} className={styles.projectItem}>
            <NavLink
              to={`/projects/${p.id}`}
              className={({ isActive }) => 
                `${styles.item} ${isActive ? styles.active : ''}`
              }
            >
              <span className={styles.dot} style={{ background: p.color }} />
              <span className={styles.projectName}>{p.name}</span>
            </NavLink>
            
            {/* Ajout des petits boutons d'action (Optionnel mais recommandé pour le TP) */}
            <div className={styles.actions}>
              <button 
                onClick={() => onRename(p)} 
                className={styles.actionBtn}
                title="Renommer"
              >
                ✏️
              </button>
              <button 
                onClick={() => onDelete(p.id)} 
                className={styles.actionBtn}
                title="Supprimer"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
}