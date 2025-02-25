import { reactive, ref } from 'vue';
import type { MagicCard } from './types';

export function useMagicCardForm() {
  const form = reactive<MagicCard>({
    name: '',
    effect: '',
    attack: 0,
    defense: null,
    flavorText: ''
  });

  const errors = reactive<{ name?: string; attack?: string }>({});
  const cards = ref<MagicCard[]>([]);

  const validateForm = () => {
    errors.name = form.name.trim() ? '' : 'Le nom est requis.';
    errors.attack = form.attack >= 0 ? '' : 'L\'attaque doit être ≥ 0.';

    return !errors.name && !errors.attack;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      cards.value.push({ ...form });
      form.name = '';
      form.effect = '';
      form.attack = 0;
      form.defense = null;
      form.flavorText = '';
    }
  };

  return { form, errors, cards, handleSubmit };
}