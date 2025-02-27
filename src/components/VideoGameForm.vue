<script lang="ts">
import { defineComponent } from 'vue';
import { useVideoGameForm } from '../scripts/VideoGameValidation.ts';

export default defineComponent({
  setup() {
    return useVideoGameForm();
  }
});
</script>

<template>
  <div>
    <h2>Ajouter un jeu vidéo</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Nom :</label>
        <input v-model="form.name" type="text" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </div>

      <div>
        <label>Editeur :</label>
        <input v-model="form.publisher" type="text" />
      </div>

      <div>
        <label>Fabricant :</label>
        <input v-model="form.maker" type="text" />
      </div>

      <div>
        <label>Coût :</label>
        <input v-model="form.price" type="number" min="0" />
        <span v-if="errors.price" class="error">{{ errors.price }}</span>
      </div>

      <div>
        <label>Type de jeu :</label>
        <input v-model="form.gameType" type="text" />
        <span v-if="errors.gameType" class="error">{{ errors.gameType }}</span>
      </div>

      <div>
        <label>Description :</label>
        <textarea v-model="form.desc"></textarea>
      </div>

      <div>
        <label>Quantité :</label>
        <input v-model.number="form.quantity" type="number" min="0" />
        <span v-if="errors.quantity" class="error">{{ errors.quantity }}</span>
      </div>

      <div>
        <label>Image (lien) :</label>
        <input v-model="form.imgLink" type="text" />
      </div>

      <div>
        <label>Date de sortie :</label>
        <input v-model="form.releaseDate" type="date" />
      </div>

      <button type="submit">Ajouter</button>
    </form>
  </div>
</template>

<style scoped>
.error {
  color: red;
  font-size: 0.9em;
}
</style>
