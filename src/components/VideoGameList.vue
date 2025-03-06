<script lang="ts">
import { defineComponent } from 'vue';
import type { VideoGame } from '../scripts/types';

export default defineComponent({
  props: {
    games: {
      type: Array as () => VideoGame[],
      required: true,
      default: () => []
    }
  }
});
</script>

<template>
  <div class="container border rounded-3 p-4">
    <h2>Liste des Jeux Vidéo</h2>
    <div v-if="games.length">
      <div v-for="(game, index) in games" :key="index" class="game-item">
        <img :src="game.imgLink" alt="Image du jeu" v-if="game.imgLink" class="game-img"/>
        <div class="game-info">
          <h3>{{ game.name }}</h3>
          <p><strong>Éditeur :</strong> {{ game.publisher || 'N/A' }}</p>
          <p><strong>Fabricant :</strong> {{ game.maker || 'N/A' }}</p>
          <p><strong>Type :</strong> {{ game.gameType }}</p>
          <p><strong>Prix :</strong> {{ game.price }}$</p>
          <p><strong>Quantité :</strong> {{ game.quantity }}</p>
          <p><strong>Date de sortie :</strong> {{ game.releaseDate || 'N/A' }}</p>
        </div>
        <button >Modifier</button>
        <button >Dupliquer</button>
        <button >Supprimer</button>
      </div>
    </div>
    <p v-else>Aucun jeu ajouté.</p>
  </div>
</template>

<style scoped>
.game-item {
  display: flex;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.game-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 8px;
}

.game-info {
  flex-grow: 1;
}
</style>
