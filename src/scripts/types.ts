export interface VideoGame{
  name: string;
  publisher: string | null;
  maker: string | null;
  price: number;
  gameType: string;
  desc: string | null;
  imgLink: string;
  quantity: number;
  releaseDate: string | null;
  isDetailsVisible: boolean;
}

export interface formErrors{
  name?: string;
  price?: string;
  gameType?: string;
  quantity?: string 
}

