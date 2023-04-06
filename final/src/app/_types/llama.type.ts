export interface Llama {
  id: string;
  name: string;
  imageFileName: string;
  pokedByTheseLlamas?: string[];
  userId?: number;
  isPoked?: boolean;
}
