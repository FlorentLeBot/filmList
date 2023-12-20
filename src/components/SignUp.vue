<template>
  <div>
    <!-- On affiche le titre "Inscription" -->
    <h2>Inscription</h2>
    <!-- On crée un formulaire qui appelle la fonction "signUp" lors de la soumission -->
    <form @submit.prevent="signUp">
      <!-- On crée un champ de saisie pour l'email avec liaison à la variable "email" -->
      <input type="email" v-model="email" placeholder="Email" required />
      <!-- On crée un champ de saisie pour le mot de passe avec liaison à la variable "password" -->
      <input type="password" v-model="password" placeholder="Mot de passe" required />
      <!-- On crée un bouton pour soumettre le formulaire -->
      <button type="submit">S'inscrire</button>
      <!-- On affiche un message d'erreur s'il y a une erreur d'inscription -->
      <p v-if="errorMessage">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import { ref } from 'vue';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Assurez-vous que le chemin est correct

export default {
  setup(_, { emit }) {
    const email = ref('');
    const password = ref('');
    const errorMessage = ref('');

    // On définit la fonction "signUp" pour gérer le processus d'inscription
    const signUp = async () => {
      // On réinitialise le message d'erreur
      errorMessage.value = '';
      try {
        // On appelle la fonction "createUserWithEmailAndPassword" pour créer un nouvel utilisateur
        await createUserWithEmailAndPassword(auth, email.value, password.value);
        // On émet un événement pour signaler le succès de l'inscription
        emit('sign-up-success');
      } catch (error) {
        // On affiche les erreurs ici en cas d'échec de l'inscription
        errorMessage.value = error.message;
      }
    };

    return { email, password, signUp, errorMessage };
  }
};
</script>
