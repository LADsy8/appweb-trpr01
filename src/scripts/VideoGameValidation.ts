import { reactive } from 'vue';
import type { VideoGame } from '../scripts/types';

export function VideoGameValidation(addGame: (game: VideoGame) => void) {
  const form = reactive<VideoGame>({
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

  const errors = reactive<{ name?: string; price?: string; gameType?: string; quantity?: string }>({});

  const validateForm = () => {
    errors.name = form.name.trim() ? '' : 'Le nom est requis.';
    errors.price = form.price >= 0 ? '' : 'Le jeu doit avoir un prix valide.';
    errors.gameType = form.gameType.trim() ? '' : 'Le type de jeu est requis.';
    errors.quantity = form.quantity >= 0 ? '' : 'La quantité doit être un nombre positif.';

    return !errors.name && !errors.price && !errors.gameType && !errors.quantity;
  };

  const handleAdd = () => {
    if (validateForm()) {
      addGame({ ...form });

      Object.assign(form, {
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
    }
  };

  return { form, errors, handleAdd };
}
