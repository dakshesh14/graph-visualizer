import { GridWalls } from "./types";
import { findGridItem, getNodeColorFromWallType } from "./helper";
import { findPathUsingDfs } from "./algorithms";
import { useGrid } from "./useGrid";

function App() {
  const { grid, resetGrid, handleNodeClick, updateGrid } = useGrid();

  const handleButtonClick = async () => {
    const startNodeIndex = findGridItem(grid, GridWalls.START);
    const endNodeIndex = findGridItem(grid, GridWalls.END);

    if (startNodeIndex === null || endNodeIndex === null) {
      alert("You must define start & end node before finding path.");
      return;
    }

    const deepCopy = grid.map((row) => [...row]);
    const visited = new Set<string>();
    const path: { rIdx: number; cIdx: number }[] = [];

    const pathFound = await findPathUsingDfs(
      deepCopy,
      startNodeIndex.rIdx,
      startNodeIndex.cIdx,
      visited,
      path,
      updateGrid
    );

    if (!pathFound) {
      alert("No path found!");
    }
  };

  return (
    <div className="md:p-10 xl:p-20">
      {grid.map((row, rowIndex) => (
        <div key={rowIndex} className="flex">
          {row.map((value, colIndex) => (
            <div
              key={colIndex}
              onClick={(e) => handleNodeClick(e, rowIndex, colIndex)}
              // FIXME: perhaps tailwind won't be able to compile colors
              // from getNodeColorFromWallType so move function logic directly to jsx
              className={`w-10 h-10 border border-gray-400 m-1 ${getNodeColorFromWallType(
                value
              )}`}
            ></div>
          ))}
        </div>
      ))}

      <div className="flex gap-2">
        <button
          onClick={handleButtonClick}
          className="mt-5 p-2 px-4 rounded border border-gray-900 bg-gray-800 text-white"
        >
          Find Path
        </button>
        <button
          onClick={resetGrid}
          className="mt-5 p-2 px-4 rounded border border-gray-200 bg-gray-100 text-gray-800"
        >
          Reset Grid
        </button>
      </div>

      <div className="mt-4">
        <p className="text-gray-500">
          Ctrl/Cmd click to create starting & ending node.
        </p>
        <p className="text-gray-500">Click for creating walls</p>
      </div>
    </div>
  );
}

export default App;
