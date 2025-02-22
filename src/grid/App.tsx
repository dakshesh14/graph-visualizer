import { useState } from "react";
import { GridWalls } from "./types";
import { findGridItem, getNodeColorFromWallType } from "./helper";

function App() {
  const [grid, setGrid] = useState(
    Array.from({ length: 10 }, () => Array(20).fill(GridWalls.EMPTY))
  );

  function handleClick(
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

  return (
    <div className="md:p-10 xl:p-20">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((value, colIndex) => (
            <div
              key={colIndex}
              onClick={(e) => handleClick(e, rowIndex, colIndex)}
              className={`w-10 h-10 border border-gray-400 m-1 ${getNodeColorFromWallType(
                value
              )}`}
            ></div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default App;
