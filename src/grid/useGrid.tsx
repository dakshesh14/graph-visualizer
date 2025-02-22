import { useState } from "react";
import { findGridItem } from "./helper";
import { GridWalls } from "./types";

export function useGrid() {
  const [grid, setGrid] = useState(
    Array.from({ length: 10 }, () => Array(20).fill(GridWalls.EMPTY))
  );

  function updateGrid(newGrid: GridWalls[][]) {
    setGrid(newGrid);
  }

  function resetGrid() {
    setGrid(Array.from({ length: 10 }, () => Array(20).fill(GridWalls.EMPTY)));
  }

  function handleNodeClick(
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    rowIndex: number,
    colIndex: number
  ) {
    const isCtrlClick = e.ctrlKey || e.metaKey;

    if (isCtrlClick) {
      const startNodeIndex = findGridItem(grid, GridWalls.START);
      const endNodeIndex = findGridItem(grid, GridWalls.END);

      if (startNodeIndex !== null && endNodeIndex !== null) {
        alert("You have already set start and end index");
        return;
      }

      if (
        startNodeIndex !== null &&
        startNodeIndex.rIdx === rowIndex &&
        startNodeIndex.cIdx === colIndex
      ) {
        alert("Start and end must be different node.");
        return;
      }

      if (
        endNodeIndex !== null &&
        endNodeIndex.rIdx === rowIndex &&
        endNodeIndex.cIdx === colIndex
      ) {
        alert("Start and end must be different node.");
        return;
      }

      const deepCopy = grid.map((row) => [...row]);

      if (startNodeIndex !== null) {
        deepCopy[rowIndex][colIndex] = GridWalls.END;
        setGrid(deepCopy);
      } else {
        deepCopy[rowIndex][colIndex] = GridWalls.START;
        setGrid(deepCopy);
      }
    } else {
      setGrid((prevData) =>
        prevData.map((row, rIdx) =>
          rIdx !== rowIndex
            ? row
            : row.map((cell, cIdx) => {
                if (cIdx !== colIndex) return cell;

                return cell === GridWalls.EMPTY
                  ? GridWalls.WALLS
                  : GridWalls.EMPTY;
              })
        )
      );
    }
  }

  return {
    grid,
    resetGrid,
    updateGrid,
    handleNodeClick,
  };
}
