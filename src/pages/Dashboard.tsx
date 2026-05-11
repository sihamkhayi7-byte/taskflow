import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../features/auth/AuthContext';
import api from '../api/axios';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ProjectForm from '../components/ProjectForm'; // CORRECTION : Retrait du .tsx
import styles from './Dashboard.module.css';

interface Project { 
  id: string; 
  name: string; 
  color: string; 
}

interface Column { 
  id: string; 
  title: string; 
  tasks: string[]; 
}

export default function Dashboard() {
  const { state: authState, dispatch } = useAuth();
  
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [projects, setProjects] = useState<Project[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const [projRes, colRes] = await Promise.all([
          api.get('/projects'),
          api.get('/columns')
        ]);
        setProjects(projRes.data);
        setColumns(colRes.data);
      } catch (e) { 
        console.error("Erreur lors du chargement des données", e); 
      } finally { 
        setLoading(false); 
      }
    }
    fetchData();
  }, []);

  async function addProject(name: string, color: string) {
    setSaving(true);
    setError(null);
    try {
      const { data } = await api.post('/projects', { name, color });
      setProjects(prev => [...prev, data]);
      setShowForm(false);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || `Erreur ${err.response?.status}`);
      } else {
        setError('Erreur inconnue');
      }
    } finally {
      setSaving(false);
    }
  }

  async function renameProject(project: Project) {
    const newName = prompt('Nouveau nom:', project.name);
    if (newName && newName !== project.name) {
      try {
        const { data } = await api.put(`/projects/${project.id}`, { ...project, name: newName });
        setProjects(prev => prev.map(p => p.id === project.id ? data : p));
      } catch (e) {
        console.error("Erreur lors du renommage", e);
      }
    }
  }

  async function deleteProject(id: string) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce projet ?')) {
      try {
        await api.delete(`/projects/${id}`);
        setProjects(prev => prev.filter(p => p.id !== id));
      } catch (e) {
        console.error("Erreur lors de la suppression", e);
      }
    }
  }

  if (loading) return <div className={styles.loading}>Chargement...</div>;

  return (
    <div className={styles.layout}>
      <Header 
        title="TaskFlow" 
        onMenuClick={() => setSidebarOpen(p => !p)} 
        userName={authState.user?.name} 
        onLogout={() => dispatch({ type: 'LOGOUT' })} 
      />
      <div className={styles.body}>
        {/* On passe rename et delete à la Sidebar pour pouvoir les utiliser */}
        <Sidebar 
          projects={projects} 
          isOpen={sidebarOpen} 
          onRename={renameProject} 
          onDelete={deleteProject} 
        />
        
        <div className={styles.content}>
          <div className={styles.toolbar}>
            {error && <div className={styles.error}>{error}</div>}

            {!showForm ? (
              <button 
                className={styles.addBtn} 
                onClick={() => setShowForm(true)}
                disabled={saving}
              >
                {saving ? 'Création...' : '+ Nouveau projet'}
              </button>
            ) : (
              <ProjectForm 
                submitLabel={saving ? "Envoi..." : "Créer"} 
                onSubmit={(name, color) => addProject(name, color)} 
                onCancel={() => setShowForm(false)} 
              />
            )}
          </div>
          <MainContent columns={columns} />
        </div>
      </div>
    </div>
  );
}