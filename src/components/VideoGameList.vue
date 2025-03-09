<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue';
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

    const alertedGames = ref<string[]>([]);

    watch(
      () => props.games, 
      (newGames) => {
        newGames.forEach(game => {
          if (game.quantity === 0 && !alertedGames.value.includes(game.name)) {
            alert(`La quantité du jeu "${game.name}" est de 0 !`);
            alertedGames.value.push(game.name);  
          }
        });
      },
      { deep: true }
    );

    const toggleDetails = (game: VideoGame) => {
      if (game.isDetailsVisible === undefined) {
        game.isDetailsVisible = false;
      }
      game.isDetailsVisible = !game.isDetailsVisible;
    };

    const getStock = (quantity: number) => {
      if (quantity >= 10) {
        return 'quantity-green';
      } else if (quantity >= 5) {
        return 'quantity-yellow'; 
      } else {
        return 'quantity-red';
      }
    };

    const exportToCSV = () => {
      const csvContent = [
        ["Nom", "Éditeur", "Fabricant", "Type", "Prix", "Quantité", "Date de sortie"],
        ...props.games.map(game => [
          game.name,
          game.publisher || "N/A",
          game.maker || "N/A",
          game.gameType,
          game.price,
          game.quantity,
          game.releaseDate || "N/A"
        ])
      ]
      .map(row => row.map(value => `"${value}"`).join(",")) 
      .join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", "jeux_video.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };


    return { searchQuery, filteredGames, toggleDetails, getStock, exportToCSV };
  }
});
</script>

<template>
  <div class="container border rounded-3 p-4">
    <h2 class="text-center">Liste des Jeux Vidéo</h2>

    <div class="d-flex justify-content-between align-items-center mb-3">
      <button @click="exportToCSV" class="btn btn-primary">Exporter en CSV</button>
      <input
        v-model="searchQuery"
        type="text"
        class="form-control w-50"
        placeholder="Rechercher un jeu..."
      />
    </div>

    <div v-if="games.length">
      <div v-if="filteredGames.length">
        <div v-for="(game, index) in filteredGames" :key="index" class="game-item mb-3">
          <img 
            :src="game.imgLink" 
            alt="Image du jeu" 
            class="game-img img-fluid rounded"
            v-if="game.imgLink" 
          />
          <div class="game-info mt-2">
            <h3 @click="toggleDetails(game)" class="game-name">{{ game.name }}</h3>

            <div v-if="game.isDetailsVisible">
              <p><strong>Éditeur :</strong> {{ game.publisher || 'N/A' }}</p>
              <p><strong>Fabricant :</strong> {{ game.maker || 'N/A' }}</p>
              <p><strong>Type :</strong> {{ game.gameType }}</p>
              <p><strong>Prix :</strong> {{ game.price }}$</p>
              <p :class="getStock(game.quantity)">
                <strong>Quantité :</strong> {{ game.quantity }}
              </p>
              <p><strong>Date de sortie :</strong> {{ game.releaseDate || 'N/A' }}</p>
            </div>

            <div class="d-flex justify-content-between">
              <button @click="$emit('edit-game', game)" class="btn btn-warning btn-sm">Modifier</button>
              <button @click="$emit('duplicate-game', game)" class="btn btn-secondary btn-sm">Dupliquer</button>
              <button @click="$emit('delete-game', game)" class="btn btn-danger btn-sm">Supprimer</button>
            </div>
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
