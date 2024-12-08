import { Item } from "./item";

export type Receipt = {
  retailer: string;
  purchaseDate: string;
  purchaseTime: string;
  items: Array<Item>;
  total: string;
};
