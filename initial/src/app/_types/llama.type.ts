export interface Llama {
  id: string;
  name: string;
  imageFileName: string;
  pokedByTheseLlamas?: Llama['id'][];
}
