<script lang="ts">
import { defineComponent, ref } from 'vue';
import type { VideoGame } from './scripts/types';
import VideoGameForm from './components/VideoGameForm.vue';
import VideoGameList from './components/VideoGameList.vue';

export default defineComponent({
  components: { VideoGameForm, VideoGameList },
  setup() {
    const games = ref<VideoGame[]>([]);

    const addGame = (game: VideoGame) => {
      games.value.push(game);
    };

    return { games, addGame };
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
              <VideoGameList :games="games"/>
          </div>
          <div class="col-6">
            
              <VideoGameForm :addGame="addGame" :modify-game="addGame"/> 
          </div>
      
      </div>
  </div>
</template>


