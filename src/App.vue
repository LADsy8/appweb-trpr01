
<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { VideoGame } from './scripts/types';
import VideoGameForm from './components/VideoGameForm.vue';
import VideoGameList from './components/VideoGameList.vue';

export default defineComponent({
  components: { VideoGameForm, VideoGameList },
  setup() {
    const games = ref<VideoGame[]>([]);
    const editingGame = ref<VideoGame | null>(null);

    const addGame = (game: VideoGame) => {
      games.value.push(game);
    };

    const modifyGame = (updatedGame: VideoGame) => {
      const index = games.value.findIndex(g => g.name === updatedGame.name);
      if (index !== -1) {
        games.value[index] = updatedGame;
      }
      editingGame.value = null;
    };

    return { games, addGame, modifyGame, editingGame };
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
            <VideoGameList :games="games" @edit-game="editingGame = $event"/>
          </div>
          <div class="col-6">
            
            <VideoGameForm :addGame="addGame" :modifyGame="modifyGame" :editingGame="editingGame"/>
          </div>
      
      </div>
  </div>
</template>


