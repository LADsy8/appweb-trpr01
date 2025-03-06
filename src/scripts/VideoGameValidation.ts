import { ref } from 'vue';
import type { VideoGame, formErrors } from '../scripts/types';

export function VideoGameValidation(addGame: (game: VideoGame) => void) {

  const form = ref<VideoGame>({
    name: '',
    publisher: null,
    maker: null,
    price: 0,
    gameType: '',
    desc: null,
    imgLink: '',
    quantity: 0,
    releaseDate: null
  });

  const errors = ref<formErrors>({
    name: '',
    price: '',
    gameType:'',
    quantity: ''
  });

  const validateForm = () => {
    errors.value.name = form.value.name.trim() ? '' : 'Le nom est requis.';
    errors.value.price = form.value.price >= 0 ? '' : 'Le jeu doit avoir un prix valide.';
    errors.value.gameType = form.value.gameType.trim() ? '' : 'Le type de jeu est requis.';
    errors.value.quantity = form.value.quantity >= 0 ? '' : 'La quantité doit être un nombre positif.';

    return !errors.value.name && !errors.value.price && !errors.value.gameType && !errors.value.quantity;
  };

  const handleAdd = () => {
    if (validateForm()) {
      addGame(form.value);
    
      resetForm();
    }
  };
  const resetForm = () => {
    form.value = {
      name: '',
      publisher: null,
      maker: null,
      price: 0,
      gameType: '',
      desc: null,
      imgLink: '',
      quantity: 0,
      releaseDate: null
    };

    errors.value = {
      name: '',
      price: '',
      gameType: '',
      quantity: ''
    };
  };

  return { form, errors, handleAdd };
}
