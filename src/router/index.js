// On importe les dépendances nécessaires pour la gestion des routes
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../components/Home.vue'; // Composant de la page d'accueil
import Login from '../components/Login.vue'; // Composant de la page de connexion
import SignUp from '../components/SignUp.vue'; // Composant de la page d'inscription
import { auth } from '../firebaseConfig'; // Objet d'authentification de Firebase (vérifiez ce chemin)

// Définition des routes de l'application
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: { requiresAuth: true } // On définit la méta-information pour les routes nécessitant une authentification
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: SignUp
  }
];

// Création du routeur
const router = createRouter({
  history: createWebHistory(),
  routes
});

// Middleware pour la gestion de la navigation
router.beforeEach((to, from, next) => {
  // On vérifie si la route nécessite une authentification
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // On vérifie si l'utilisateur est authentifié
  const isAuthenticated = auth.currentUser;

  // Si la route nécessite une authentification et l'utilisateur n'est pas authentifié, on redirige vers la page de connexion
  if (requiresAuth && !isAuthenticated) {
    next('/login');
  } else if (!requiresAuth && isAuthenticated && to.path === '/login') {
    // Si la route ne nécessite pas d'authentification et l'utilisateur est authentifié, on redirige vers la page d'accueil
    next('/');
  } else {
    // Sinon, on laisse l'utilisateur accéder à la route demandée
    next();
  }
});

// Exportation du routeur
export default router;
