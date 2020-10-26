export default function removeArrrayItem(itemIndex: number, array: any[]) {
  return [...array.slice(0, itemIndex), ...array.slice(itemIndex + 1)];
}
