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

    const defaultGames = ref<VideoGame[]>([
        {
          name: "The Legend of Zelda: Breath of the Wild",
          desc: "Explorez un vaste monde ouvert et sauvez Hyrule dans cette aventure épique.",
          publisher: "Nintendo",
          maker: "Nintendo EPD",
          gameType: "Action/Aventure",
          price: 79.99,
          quantity: 10,
          releaseDate: "2017-03-03",
          imgLink: "https://upload.wikimedia.org/wikipedia/en/c/c6/The_Legend_of_Zelda_Breath_of_the_Wild.jpg",
          isDetailsVisible: false
        },
        {
          name: "God of War Ragnarok",
          desc: "Kratos et Atreus affrontent les dieux nordiques dans un combat pour la survie.",
          publisher: "Sony Interactive Entertainment",
          maker: "Santa Monica Studio",
          gameType: "Action",
          price: 89.99,
          quantity: 5,
          releaseDate: "2022-11-09",
          imgLink: "https://upload.wikimedia.org/wikipedia/en/e/ee/God_of_War_Ragnar%C3%B6k_cover.jpg",
          isDetailsVisible: false
        },
        {
          name: "Elden Ring",
          desc: "Un RPG d'action en monde ouvert créé par FromSoftware et George R.R. Martin.",
          publisher: "Bandai Namco Entertainment",
          maker: "FromSoftware",
          gameType: "RPG",
          price: 79.99,
          quantity: 3,
          releaseDate: "2022-02-25",
          imgLink: "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg",
          isDetailsVisible: false
        },
        {
          name: "Cyberpunk 2077",
          desc: "Un RPG futuriste en monde ouvert où vous incarnez V dans Night City.",
          publisher: "CD Projekt",
          maker: "CD Projekt Red",
          gameType: "RPG",
          price: 59.99,
          quantity: 0,
          releaseDate: "2020-12-10",
          imgLink: "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
          isDetailsVisible: false
        },
        {
          name: "Red Dead Redemption 2",
          desc: "Plongez dans un western immersif avec Arthur Morgan et le gang Van der Linde.",
          publisher: "Rockstar Games",
          maker: "Rockstar Studios",
          gameType: "Action/Aventure",
          price: 69.99,
          quantity: 8,
          releaseDate: "2018-10-26",
          imgLink: "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg",
          isDetailsVisible: false
        }
    ]);

    defaultGames.value.forEach((game) => {
      form.value = { ...game }; 
      handleAdd();
    });

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
    <h2 class="text-center">{{ isDuplicating ? 'Dupliquer un jeu vidéo' : (isEditing ? 'Modifier un jeu vidéo' : 'Ajouter un jeu vidéo') }}</h2>
    <form @submit.prevent="handleAdd">
      <div class="row">
        <div class="col-12 col-md-6 mb-3">
          <label>Nom</label>
          <input v-model="form.name" type="text" class="form-control" />
          <span v-if="errors.name" class="error">{{ errors.name }}</span>
        </div>

        <div class="col-12 col-md-6 mb-3">
          <label>Image (lien)</label>
          <input v-model="form.imgLink" type="text" class="form-control" />
        </div>

        <div class="col-12 col-md-6 mb-3">
          <label>Éditeur</label>
          <input v-model="form.publisher" type="text" class="form-control" />
        </div>

        <div class="col-12 col-md-6 mb-3">
          <label>Fabricant</label>
          <input v-model="form.maker" type="text" class="form-control" />
        </div>

        <div class="col-12 mb-3">
          <label>Description</label>
          <textarea v-model="form.desc" class="form-control"></textarea>
        </div>

        <div class="col-12 col-md-6 mb-3">
          <label>Coût</label>
          <input v-model="form.price" type="number" min="1" class="form-control" />
          <span v-if="errors.price" class="error">{{ errors.price }}</span>
        </div>

        <div class="col-12 col-md-6 mb-3">
          <label>Type de jeu</label>
          <input v-model="form.gameType" type="text" class="form-control" />
          <span v-if="errors.gameType" class="error">{{ errors.gameType }}</span>
        </div>

        <div class="col-12 col-md-6 mb-3">
          <label>Quantité</label>
          <input v-model.number="form.quantity" type="number" min="0" class="form-control" />
          <span v-if="errors.quantity" class="error">{{ errors.quantity }}</span>
        </div>

        <div class="col-12 col-md-6 mb-3">
          <label>Date de sortie</label>
          <input v-model="form.releaseDate" type="date" class="form-control" />
        </div>

        <div class="col-12 text-center">
          <button type="submit" class="btn btn-primary w-100">{{ isDuplicating ? 'Ajouter' : (isEditing ? 'Modifier' : 'Ajouter') }}</button>
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
