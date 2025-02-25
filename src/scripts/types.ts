export interface MagicCard {
    name: string;
    effect?: string;
    attack: number;
    defense?: number | null;
    flavorText?: string;
  }