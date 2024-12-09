import { Item } from "./item";

export interface Receipt {
  retailer: string;
  purchaseDate: string;
  purchaseTime: string;
  items: Array<Item>;
  total: string;
}
