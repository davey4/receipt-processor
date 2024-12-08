import { Receipt } from "../interfaces/receipt";
import { Item } from "../interfaces/item";

export const calculatePoints = (receipt: Receipt): number =>
  calculatePointsFromRetailer(receipt.retailer) +
  calculatePointsFromTotal(receipt.total) +
  calculatePointsFromItems(receipt.items) +
  calculatePointsFromPurchaseDate(receipt.purchaseDate) +
  calculatePointsFromPurchaseTime(receipt.purchaseTime);

// One point for every alphanumeric character in the retailer name.
const calculatePointsFromRetailer = (str: string): number => {
  const alphanumericMatches = str.match(/[a-zA-Z0-9]/g);
  return alphanumericMatches ? alphanumericMatches.length : 0;
};

// 50 points if the total is a round dollar amount with no cents.
// +
// 25 points if the total is a multiple of 0.25.
const calculatePointsFromTotal = (total: string): number => {
  const parsedTotal = parseFloat(total);
  const pointsForRoundTotal = parsedTotal % 1 === 0 ? 50 : 0;
  const pointsForMultiple = parsedTotal % 0.25 === 0 ? 25 : 0;
  return pointsForRoundTotal + pointsForMultiple;
};

// 5 points for every two items on the receipt.
// +
// If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
const calculatePointsFromItems = (items: Array<Item>): number => {
  const lengthPoints = Math.floor(items.length / 2) * 5;
  const descriptionPoints = items.reduce((acc, item) => {
    const parsedPrice = parseFloat(item.price);
    const points =
      item.shortDescription.trim().length % 3 === 0
        ? Math.ceil(parsedPrice * 0.2)
        : 0;
    return acc + points;
  }, 0);
  return lengthPoints + descriptionPoints;
};

// 6 points if the day in the purchase date is odd.
const calculatePointsFromPurchaseDate = (date: string): number =>
  new Date(date).getDate() % 2 !== 0 ? 6 : 0;

// 10 points if the time of purchase is after 2:00pm and before 4:00pm.
const calculatePointsFromPurchaseTime = (time: string): number => {
  const [hours, _] = time.split(":").map(Number);
  return hours >= 14 && hours < 16 ? 10 : 0;
};
