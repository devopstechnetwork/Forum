import {Topic} from "@shared/models/Topic";


export interface Category {
  id: number;
  title: string;
  topics?: Topic[];
  size: number;
  categoryType: string;
  description: string;
}
