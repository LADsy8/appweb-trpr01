<script lang="ts">
import { defineComponent, type PropType, ref, watch } from 'vue';
import { VideoGameValidation } from '../scripts/VideoGameValidation';
import type { VideoGame } from '../scripts/types';

export default defineComponent({
  props: {
    addGame: {
      type: Function as PropType<(game: VideoGame) => void>,
      required: true
    },

    //c'est pour aller chercher le bon jeux et modifier les infos du jeux spécifique
    modifyGame: {
      type: Function as PropType<(game: VideoGame) => void>,
      required: true
    },
    //ici, c'est pour quand il déconstruit le jeux vidéo pour mettre les infos dans le formulaire
    editingGame: {
      type: Object as PropType<VideoGame | null>,
      default: null
    },
    isDuplicating: {
      type: Boolean,
      required: true
    }
  },
  setup(props) {
    const { form, errors, handleAdd, resetForm } = VideoGameValidation((game) => {
      if (props.isDuplicating) {
        props.addGame(game);
      } else {
        props.editingGame ? props.modifyGame(game) : props.addGame(game);
      }
    });

    const isEditing = ref(false);

    watch(() => props.editingGame, (newGame) => {
      if (newGame) {
        form.value = { ...newGame };
        isEditing.value = true;
      } else {
        resetForm();
        isEditing.value = false;
      }
    });

    return { form, errors, handleAdd, isEditing };
  }
});
</script>

<template>
  <div class="container border rounded-3 p-4">
    <h2>{{ isDuplicating ? 'Dupliquer un jeu vidéo' : (isEditing ? 'Modifier un jeu vidéo' : 'Ajouter un jeu vidéo') }}</h2>
    <form @submit.prevent="handleAdd">
      <div class="row">
        <div class="col-6 p-4">
          <label>Nom </label>
          <input v-model="form.name" type="text" v-text="" />
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
        </div>

        <div class="col-6 p-4">
          <label>Image (lien) :</label>
          <input v-model="form.imgLink" type="text" />
        </div>

        <div class="col p-4">
          <label>Éditeur :</label>
          <input v-model="form.publisher" type="text" />
        </div>

        <div class="col p-4">
          <label>Fabricant :</label>
          <input v-model="form.maker" type="text" />
        </div>

        <div class="col-12 p-4">
          <label>Description :</label>
          <textarea v-model="form.desc"></textarea>
        </div>

        <div class="col p-4">
          <label>Coût :</label>
          <input v-model="form.price" type="number" min="0" />
          <span v-if="errors.price" class="error">{{ errors.price }}</span>
        </div>

        <div class="col p-4">
          <label>Type de jeu :</label>
          <input v-model="form.gameType" type="text" />
          <span v-if="errors.gameType" class="error">{{ errors.gameType }}</span>
        </div>

        <div class="col p-4">
          <label>Quantité :</label>
          <input v-model.number="form.quantity" type="number" min="0" />
          <span v-if="errors.quantity" class="error">{{ errors.quantity }}</span>
        </div>

        <div class="col p-4">
          <label>Date de sortie :</label>
          <input v-model="form.releaseDate" type="date" />
        </div>

        <div class="col-12">
          <button v-on:submit="handleAdd">{{ isDuplicating ? 'Ajouter' : (isEditing ? 'Modifier' : 'Ajouter') }}</button>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-size: 0.9em;
}
</style>
