<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import type { VideoGame } from '../scripts/types';

export default defineComponent({
  props: {
    games: {
      type: Array as () => VideoGame[],
      required: true,
      default: () => []
    },
    
  },
  
  setup(props) {

    const searchQuery = ref('');

    const filteredGames = computed(() => {
      return props.games.filter(game =>
        game.name.toLowerCase().includes(searchQuery.value.toLowerCase())
      );
    });

    const toggleDetails = (game: VideoGame) => {
      game.isDetailsVisible = !game.isDetailsVisible;
    };

    const getStock = (quantity: number, game: VideoGame) => {
      if (quantity === 0) {
        alert(`La quantité du jeu "${game.name}" est de 0 !`);
      }
      if (quantity >= 10) {
        return 'quantity-green';
      } else if (quantity >= 5) {
        return 'quantity-yellow'; 
      } else {
        return 'quantity-red';
      }
    };

    
    
    return { searchQuery, filteredGames, toggleDetails, getStock };
  }
});


</script>

<template>
  <div class="container border rounded-3 p-4">
    <h2>Liste des Jeux Vidéo</h2>

    <input
      v-model="searchQuery"
      type="text"
      placeholder="Rechercher un jeu..."
    />

    <div v-if="games.length">
      <div v-if="filteredGames.length">
        <div v-for="(game, index) in filteredGames" :key="index" class="game-item">
          <img 
            :src="game.imgLink" 
            alt="Image du jeu" 
            class="game-img"
            v-if="game.imgLink" 
          />
          <div class="game-info">
            <h3 @click="toggleDetails(game)">{{ game.name }}</h3>

            <div v-if="game.isDetailsVisible">
              <p><strong>Éditeur :</strong> {{ game.publisher || 'N/A' }}</p>
              <p><strong>Fabricant :</strong> {{ game.maker || 'N/A' }}</p>
              <p><strong>Type :</strong> {{ game.gameType }}</p>
              <p><strong>Prix :</strong> {{ game.price }}$</p>
              <p :class="getStock"(game.quantity)>
                <strong>Quantité :</strong> {{ game.quantity }}
              </p>
              <p><strong>Date de sortie :</strong> {{ game.releaseDate || 'N/A' }}</p>
            </div>

            <button @click="$emit('edit-game', game)">Modifier</button>
            <button @click="$emit('duplicate-game', game)">Dupliquer</button>
            <button @click="$emit('delete-game', game)">Supprimer</button>
          </div>
        </div>
      </div>
      <p v-else>Aucun jeu correspondant à votre recherche.</p>
    </div>
    
    <p v-else>Aucun jeu dans la liste.</p>
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

.quantity-green {
  color: green;
}

.quantity-yellow {
  color: yellow;
}

.quantity-red {
  color: red;
}
</style>