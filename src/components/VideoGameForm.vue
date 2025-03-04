<script lang="ts">
import { defineComponent } from 'vue';
import { VideoGameValidation } from '../scripts/VideoGameValidation';

export default defineComponent({
  emits: ['add-game'],
  setup(_, { emit }) {
    const { form, errors, handleAdd } = VideoGameValidation((game) => {
      emit('add-game', game);
    });

    return { form, errors, handleAdd };
  }
});
</script>

<template>
  <div class="container border rounded-3 p-4">
    <h2>Ajouter un jeu vidéo</h2>
    <form @submit.prevent="handleAdd">
      <div class="row">
        <div class="col-6 p-4">
          <label>Nom :</label>
          <input v-model="form.name" type="text" />
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
          <button type="submit">Ajouter</button>
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
