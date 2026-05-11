import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../features/auth/AuthContext';

interface Props { 
    children: React.ReactNode; 
}

export default function ProtectedRoute({ children }: Props) {
    const { state } = useAuth();
    const location = useLocation();

    // Si l'utilisateur n'est pas connecté, on le redirige vers /login
    // On garde en mémoire la page qu'il essayait d'atteindre (state.from)
    if (!state.user) {
        return <Navigate to="/login" state={{ from: location.pathname }} replace />;
    }

    // Si l'utilisateur est connecté, on affiche le contenu de la route
    return <>{children}</>;
}