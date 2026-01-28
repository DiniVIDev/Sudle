function Four() {
  // 1️⃣ State
  const [cells, setCells] = React.useState(Array(16).fill(""));
  const [cellResults, setCellResults] = React.useState(Array(16).fill(null));
  const [selectedCell, setSelectedCell] = React.useState(null);
  const [selectedCellNum, setSelectedCellNum] = React.useState(null);
  const  [guessCount, setGuessCount] = React.useState(0);
  const  [gameWon, setGameWon] = React.useState(false);


function selectCell(index) {
  if (selectedCell !== index) {
    setSelectedCellNum(null); 
    setSelectedCell(index);
  }

}

function checkResult(cellIndex, cellValue) {

const solution = [2, 4, 1, 3,
                  3, 1, 4, 2,
                  4, 2, 3, 1,
                  1, 3, 2, 4];
  if (solution[cellIndex] === parseInt(cellValue)) {
    return "green"; // green
  }
  const regionIndices = [
    [0,1,4,5], [2,3,6,7],
    [8,9,12,13], [10,11,14,15]
  ];
  for (let region of regionIndices) {
    if (region.includes(cellIndex)) {
      for (let idx of region) {
        if (idx !== cellIndex && solution[idx] === parseInt(cellValue)) {
               if (region[0] === idx && region[3] === cellIndex) {
                return "grey"; 
                 }
                if (region[3] === idx && region[0] === cellIndex) {
                  return "grey"; 
                  }
                if (region[2] === idx && region[1] === cellIndex) {
                  return "grey"; 
                }
                if (region[1] === idx && region[2] === cellIndex) {
                  return "grey"; 
                }
            return "yellow"; // yellow
        }
      }
    }

  }
}



  // 3️⃣ Keyboard input
  React.useEffect(() => {
    function handleKey(event) {
      const key = event.key;
      if (selectedCell && key >= "1" && key <= "4") {
        setSelectedCellNum(prev => {
          return key
        });
      }
      //confirm charachrchter selction
      if (selectedCell && selectedCellNum && (key === "Enter")) {
        setCells(prevCells => {
          const newCells = [...prevCells];
          newCells[selectedCell - 1] = selectedCellNum;
          setCellResults(prevResults => {
          const newResults = [...prevResults];
          const result = checkResult(selectedCell - 1, selectedCellNum);
          newResults[selectedCell - 1] = result;
          if (newResults.every(res => res === "green")) {
            setGameWon(true);
          }
          setGuessCount(prevCount => prevCount + 1);

          return newResults;
        })
          
          
          return newCells;
        
        
        
      }
      )
      }

      if (selectedCell && (key === "Escape")) {
        setSelectedCell(null); // deselect
        setSelectedCellNum(null); // optional: clear typed number
      }
      
          if (!selectedCell && (key === "ArrowRight" || key === "ArrowDown" || key === "ArrowLeft" || key === "ArrowUp" || key === "ArrowUp")) 
        {
          selectCell(1);
          } 
      if (selectedCell && key === "ArrowRight") {
        selectCell((selectedCell % 16) + 1);
      }
      if (selectedCell && key === "ArrowLeft") {
        selectCell(((selectedCell - 2 + 16) % 16) + 1);
      }
      if (selectedCell && key === "ArrowDown") {
        selectCell((selectedCell + 3) % 16+1);
      }
        
      if (selectedCell && key === "ArrowUp") {
        selectCell((selectedCell -5) % 16+1);
      }
    
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedCell, selectedCellNum,cells]);

  React.useEffect(() => {
  function handleClickOutside(event) {
    // Check if the clicked element is NOT a button
    if (!event.target.classList.contains("cell")) {
      setSelectedCell(null); // deselect
      setSelectedCellNum(null); // optional: clear typed number
    }
  }

  document.addEventListener("click", handleClickOutside);
  return () => document.removeEventListener("click", handleClickOutside);
}, []);

  // 4️⃣ Generate all buttons dynamically
  const cellButtons = [];
  for (let i = 1; i <= 16; i++) {


    const resultClass = cellResults[i - 1] 

  const selectedClass = selectedCell === i ? "selected" : "";
    cellButtons.push(
      <button
  className={`cell ${selectedClass} ${resultClass}`}
  onClick={(e) => {
    e.stopPropagation();
    selectCell(i);
  }}
      >
        {(selectedCell === i && selectedCellNum !== null)? selectedCellNum : cells[i - 1]}
      </button>
    );
  }

  // 5️⃣ Return grid with slices
  return (
    <div>
      <h2>Sudle</h2>
      {gameWon && <h3>Congratulations! You solved the puzzle in {guessCount} guesses!</h3>}
      {!gameWon && <div>
      <p>Guesses: {guessCount}</p>
      <div className="gridContainer">

        <div className="rowdiv">
          {cellButtons.slice(0, 2)}
          <div className="v_line"></div>
          {cellButtons.slice(2, 4)}
        </div>

        <div className="rowdiv">
          {cellButtons.slice(4, 6)}
          <div className="v_line"></div>
          {cellButtons.slice(6, 8)}
        </div>

        <div className="rowdiv">
          <div className="h_line"></div>
          <div className="h_line"></div>
          <div className="h_line"></div>
          <div className="h_line"></div>
        </div>

        <div className="rowdiv">
          {cellButtons.slice(8, 10)}
          <div className="v_line"></div>
          {cellButtons.slice(10, 12)}
        </div>

        <div className="rowdiv">
          {cellButtons.slice(12, 14)}
          <div className="v_line"></div>
          {cellButtons.slice(14, 16)}
        </div>

      </div>
      </div>}
    </div>
  );
}
