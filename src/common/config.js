import { getScreenWidth } from "./helper";
import { BubbleSort } from "../sortFunctions/BubbleSort";
import { SelectionSort } from "../sortFunctions/SelectionSort";
import { InsertionSort } from "../sortFunctions/InsertionSort";
// colors setting
export const comparisionColor = "pink";
export const swapColor = "yellow";
export const sortedColor = "springgreen";
export const pivotColor = "sandybrown";

// time setting
export let swapTime = 1000;
export let compareTime = 500;

// init array
export let sortingArray = initArrayForScreenSize();

export const sortingAlgorithms = [
  { component: BubbleSort, title: "Sắp xếp nổi bọt", name: "SẮP XẾP NỔI BỌT" },
  { component: SelectionSort, title: "Sắp xếp chọn", name: "SẮP XẾP CHỌN" },
  { component: InsertionSort, title: "Sắp xếp chèn", name: "SẮP XẾP CHÈN" },
  
];

function initArrayForScreenSize() {
  const screenSize = getScreenWidth();
  if (screenSize < 460) return [6, 9, 6, 9];
  else if (screenSize < 720) return [9, 6, 6, 9, 4, 2, 0, 1];
  return [54, 39,35,4,31,88,68,34,98,44,87,84];
}
