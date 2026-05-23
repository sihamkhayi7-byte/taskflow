// src/api/axios.ts
import axios from 'axios'; // À ajouter avec les autres imports
// import axios from 'axios';

// On crée une instance personnalisée d'Axios [cite: 6, 7]
const api = axios.create({
  // L'URL de base de votre json-server [cite: 11]
  baseURL: 'http://localhost:4000',
  // Type de contenu envoyé par défaut [cite: 12]
  headers: { 'Content-Type': 'application/json' },
  // Temps maximum d'attente avant d'annuler la requête (5 secondes) [cite: 12, 13]
  timeout: 5000,
});

export default api; // On exporte l'instance pour l'utiliser partout [cite: 14]