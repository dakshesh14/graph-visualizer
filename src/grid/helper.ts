import { GridWalls } from "./types";

export function findGridItem(matrix: GridWalls[][], target: GridWalls) {
  for (let rIdx = 0; rIdx < matrix.length; rIdx++) {
    const cIdx = matrix[rIdx].indexOf(target);
    if (cIdx !== -1) return { rIdx, cIdx };
  }
  return null;
}

export function getNodeColorFromWallType(node: GridWalls) {
  switch (node) {
    case GridWalls.EMPTY:
      return "bg-transparent";
    case GridWalls.END:
      return "bg-red-500";
    case GridWalls.START:
      return "bg-green-500";
    case GridWalls.WALLS:
      return "bg-gray-500";
    default:
      return "bg-transparent";
  }
}
