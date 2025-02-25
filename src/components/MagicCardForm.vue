<script lang="ts">
import { defineComponent } from 'vue';
import { useMagicCardForm } from '../scripts/MagicFormValidation.ts';

export default defineComponent({
  setup() {
    return useMagicCardForm();
  }
});
</script>

<template>
  
  <div>
    <h2>Ajouter une carte Magic</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>Nom :</label>
        <input v-model="form.name" type="text" />
        <span v-if="errors.name" class="error">{{ errors.name }}</span>
      </div>

      <div>
        <label>Effet :</label>
        <textarea v-model="form.effect"></textarea>
      </div>

      <div>
        <label>Attaque :</label>
        <input v-model.number="form.attack" type="number" min="0" />
        <span v-if="errors.attack" class="error">{{ errors.attack }}</span>
      </div>

      <div>
        <label>Défense :</label>
        <input v-model.number="form.defense" type="number" min="0" />
      </div>

      <div>
        <label>Flavor Text :</label>
        <textarea v-model="form.flavorText"></textarea>
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