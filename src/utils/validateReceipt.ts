import { Receipt } from "../interfaces/receipt";
import { Item } from "../interfaces/item";

const retailerRegex = /^[\w\s\-\&]+$/; // alpha-numeric characters, whitespace, hyphens, ampersands
const dateRegex = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD
const timeRegex = /^([01]?[0-9]|2[0-3]):([0-5][0-9])$/; // HH:MM
const amountRegex = /^\d+\.\d{2}$/; // number with exactly two decimal places
const descriptionRegex = /^[\w\s\-]+$/; // alpha-numeric characters, whitespace, hyphens

export const isValidReceipt = (receipt: any): receipt is Receipt => {
  return (
    typeof receipt.retailer === "string" &&
    retailerRegex.test(receipt.retailer) &&
    typeof receipt.purchaseDate === "string" &&
    dateRegex.test(receipt.purchaseDate) &&
    typeof receipt.purchaseTime === "string" &&
    timeRegex.test(receipt.purchaseTime) &&
    Array.isArray(receipt.items) &&
    receipt.items.length > 0 &&
    receipt.items.every(isValidItem) &&
    amountRegex.test(receipt.total) &&
    typeof receipt.total === "string"
  );
};

const isValidItem = (item: any): item is Item => {
  return (
    typeof item.shortDescription === "string" &&
    descriptionRegex.test(item.shortDescription) &&
    typeof item.price === "string" &&
    amountRegex.test(item.price)
  );
};
