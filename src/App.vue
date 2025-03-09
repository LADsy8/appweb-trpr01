
<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { VideoGame } from './scripts/types';
import VideoGameList from './components/VideoGameList.vue';
import VideoGameForm from './components/VideoGameForm.vue';

export default defineComponent({
  components: { VideoGameForm, VideoGameList },
  setup() {
    const games = ref<VideoGame[]>([]);
    const editingGame = ref<VideoGame | null>(null);
    const isDuplicating = ref(false);

    const addGame = (game: VideoGame) => {
      games.value.push(game);
      editingGame.value = null;
      isDuplicating.value = false;
    };

    const modifyGame = (updatedGame: VideoGame) => {
  const index = games.value.findIndex(g => g.name === editingGame.value?.name); 
  if (index !== -1) {
    games.value[index] = { ...updatedGame };
  }
  editingGame.value = null;
  isDuplicating.value = false;
};

    const handleEditGame = (game: VideoGame) => {
      editingGame.value = game;
      isDuplicating.value = false;
    };

    const handleDuplicateGame = (game: VideoGame) => {
      const duplicatedGame = { ...game, name: `${game.name} (Copie)` };
      
      editingGame.value = duplicatedGame;

      isDuplicating.value = true;
      
    };

    const handleDeleteGame = (gameToDelete: VideoGame) => {
      const confirmDelete = window.confirm(`Voulez-vous vraiment supprimer "${gameToDelete.name}" ?`);
      if (confirmDelete) {
        games.value = games.value.filter(game => game.name !== gameToDelete.name);
        if (editingGame.value?.name === gameToDelete.name) {
          editingGame.value = null;
    }
  }
};

    return { games, addGame, modifyGame, editingGame, handleDuplicateGame, handleEditGame, handleDeleteGame ,isDuplicating};
  }
});
</script>

<template>
  <div class="container-fluid px-0 ">
      <div class="row">
          <div class="col-12">
              <img src="./assets/images/BannersiteTP1AppWeb.jpg" class="img-fluid w-100 h-50">
          </div>
          <div class="col-6">
            <VideoGameList :games="games" @edit-game="editingGame = $event"  @duplicate-game="handleDuplicateGame" @delete-game="handleDeleteGame"/>
          </div>
          <div class="col-6">
            
            <VideoGameForm :addGame="addGame" :modifyGame="modifyGame" :editingGame="editingGame" :isDuplicating="isDuplicating"/>
          </div>
      
      </div>
  </div>
</template>


