import { useAuth } from './features/auth/AuthContext';
import Login from './features/auth/Login';
import Dashboard from './pages/Dashboard';

export default function App() {
  const { state: authState } = useAuth();

  // Si l'utilisateur n'est pas connecté, on affiche le Login
  if (!authState.user) {
    return <Login />;
  }

  // Sinon, on affiche le Dashboard complet (qui contient Sidebar, Header, etc.)
  return <Dashboard />;
}