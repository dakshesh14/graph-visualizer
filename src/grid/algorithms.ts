import { GridWalls } from "./types";

export function findPathUsingDfs(
  matrix: GridWalls[][],
  rowIndex: number,
  colIndex: number,
  visited: Set<string>,
  path: { rIdx: number; cIdx: number }[],
  updateGrid: (grid: GridWalls[][]) => void
): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (
        rowIndex < 0 ||
        rowIndex >= matrix.length ||
        colIndex < 0 ||
        colIndex >= matrix[0].length
      ) {
        resolve(false);
        return;
      }

      if (
        matrix[rowIndex][colIndex] === GridWalls.WALLS ||
        visited.has(`${rowIndex},${colIndex}`)
      ) {
        resolve(false);
        return;
      }

      if (matrix[rowIndex][colIndex] === GridWalls.END) {
        resolve(true);
        return;
      }

      visited.add(`${rowIndex},${colIndex}`);
      path.push({ rIdx: rowIndex, cIdx: colIndex });

      const newGrid = matrix.map((row) => [...row]);
      newGrid[rowIndex][colIndex] = GridWalls.PATH;
      updateGrid(newGrid);

      const DIRECTIONS = [
        [-1, 0],
        [1, 0],
        [0, 1],
        [0, -1],
      ];

      (async () => {
        for (const [dx, dy] of DIRECTIONS) {
          if (
            await findPathUsingDfs(
              matrix,
              rowIndex + dx,
              colIndex + dy,
              visited,
              path,
              updateGrid
            )
          ) {
            resolve(true);
            return;
          }
        }

        path.pop();
        newGrid[rowIndex][colIndex] = GridWalls.EMPTY;
        updateGrid(newGrid);

        resolve(false);
      })();
    }, 50);
  });
}
