import { reactive, ref } from 'vue';
import type { VideoGame } from './types';

export function useVideoGameForm() {
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

  const errors = reactive<{ name?: string; price?:string; gameType?:string; quantity?: string;}>({});
  const game = ref<VideoGame[]>([]);

  const validateForm = () => {

    errors.name = form.name.trim() ? '' : 'Le nom est requis.';
    errors.price = form.price >= 0 ? '' : 'Le jeu doit avoir un prix valide.';
    errors.gameType = form.gameType.trim() ? '' : 'Le type de jeu est requis.';
    errors.quantity = form.quantity > -1 ? '' : 'La quantité doit être un nombre supérieur à -1.';
    

    return !errors.name && !errors.quantity && !errors.gameType && !errors.price;
  };

  const handleAdd = () => {
    if (validateForm()) {
      game.value.push({ ...form });
      form.name = '';
      form.publisher = null;
      form.maker = null;
      form.price = 0,
      form.gameType = '',
      form.desc = null,
      form.imgLink = '',
      form.quantity = 0,
      form.releaseDate = null;
    }
  };

  return { form, errors, game, handleAdd };
}