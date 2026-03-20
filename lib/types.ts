import { CATEGORIES, FUNKO_STATUSES } from "@/lib/constants";

export type Category = (typeof CATEGORIES)[number];
export type FunkoStatus = (typeof FUNKO_STATUSES)[number];

export interface Funko {
  id: string;
  nome: string;
  slug: string | null;
  categoria: Category;
  descricao: string | null;
  image_url: string | null;
  status: FunkoStatus;
  created_at: string;
  updated_at: string;
}
