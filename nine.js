function Nine() {
  // 1️⃣ State
  const [cells, setCells] = React.useState(Array(81).fill(""));
  const [cellResults, setCellResults] = React.useState(Array(81).fill(null));
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

const solution = [5,3,4,6,7,8,9,1,2,
                  6,7,2,1,9,5,3,4,8,
                  1,9,8,3,4,2,5,6,7,
                  8,5,9,7,6,1,4,2,3,
                  4,2,6,8,5,3,7,9,1,
                  7,1,3,9,2,4,8,5,6,
                  9,6,1,5,3,7,2,8,4,
                  2,8,7,4,1,9,6,3,5,
                  3,4,5,2,8,6,1,7,9];
  if (solution[cellIndex] === parseInt(cellValue)) {
    return "green"; // green
  }
  const regionIndices = [
    [0,1,2,9,10,11,18,19,20], [3,4,5,12,13,14,21,22,23], [6,7,8,15,16,17,24,25,26],
    [27,28,29,36,37,38,45,46,47], [30,31,32,39,40,41,48,49,50], [33,34,35,42,43,44,51,52,53],
    [54,55,56,63,64,65,72,73,74], [57,58,59,66,67,68,75,76,77], [60,61,62,69,70,71,78,79,80]
  ];
  for (let region of regionIndices) {
    if (region.includes(cellIndex)) {
      for (let idx of region) {
        if (idx !== cellIndex && solution[idx] === parseInt(cellValue)) {
            const idx_loc = region.indexOf(idx);
            const cell_loc = region.indexOf(parseInt(cellIndex));

            if (Math.floor(idx_loc / 3) === Math.floor(cell_loc / 3) || (idx_loc % 3) === (cell_loc % 3)) {
                return "yellow"; // yellow
            }
            
            else {
                return "grey"; // grey
            }
      }
    }

  }
}
}



  // 3️⃣ Keyboard input
  React.useEffect(() => {
    function handleKey(event) {
      const key = event.key;
      if (selectedCell && key >= "1" && key <= "9") {
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
        selectCell((selectedCell % 81) + 1);
      }
      if (selectedCell && key === "ArrowLeft") {
        selectCell(((selectedCell - 2 ) % 81) + 1);
      }
      if (selectedCell && key === "ArrowDown") {
        selectCell((selectedCell + 9 -1) % 81 +1);
      }
        
      if (selectedCell && key === "ArrowUp") {
        selectCell((selectedCell - 9 -1 +81) % 81 +1);
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
  for (let i = 1; i <= 81; i++) {


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
          {cellButtons.slice(0, 3)}
          <div className="v_line"></div>
          {cellButtons.slice(3, 6)}
            <div className="v_line"></div>
            {cellButtons.slice(6, 9)}
        </div>

        <div className="rowdiv">
          {cellButtons.slice(9, 12)}
          <div className="v_line"></div>
            {cellButtons.slice(12, 15)}
            <div className="v_line"></div>
            {cellButtons.slice(15, 18)}
        </div>


           <div className="rowdiv">
            {cellButtons.slice(18, 21)}
          <div className="v_line"></div>
            {cellButtons.slice(21, 24)}
            <div className="v_line"></div>
            {cellButtons.slice(24, 27)}
        </div>

        <div className="rowdiv">
          <div className="h_line"></div>
          <div className="h_line"></div>
          <div className="h_line"></div>
          <div className="h_line"></div>
          <div className="h_line"></div>
          <div className="h_line"></div>
          <div className="h_line"></div>
          <div className="h_line"></div>
          <div className="h_line"></div>
        </div>

     

        <div className="rowdiv">
            {cellButtons.slice(27, 30)}
          <div className="v_line"></div>
          {cellButtons.slice(30, 33)}
            <div className="v_line"></div>
            {cellButtons.slice(33, 36)}
        </div>

             <div className="rowdiv">
            {cellButtons.slice(36, 39)}
            <div className="v_line"></div>
            {cellButtons.slice(39, 42)}
            <div className="v_line"></div>
            {cellButtons.slice(42, 45)}
        </div>

        <div className="rowdiv">
            {cellButtons.slice(45, 48)}
            <div className="v_line"></div>
            {cellButtons.slice(48, 51)}
            <div className="v_line"></div>
            {cellButtons.slice(51, 54)}
        </div>


           <div className="rowdiv">
          <div className="h_line"></div>
          <div className="h_line"></div>
          <div className="h_line"></div>
          <div className="h_line"></div>
          <div className="h_line"></div>
          <div className="h_line"></div>
          <div className="h_line"></div>
          <div className="h_line"></div>
          <div className="h_line"></div>
        </div>

       <div className="rowdiv">
            {cellButtons.slice(54, 57)}
          <div className="v_line"></div>
            {cellButtons.slice(57, 60)}
            <div className="v_line"></div>
            {cellButtons.slice(60, 63)}
        </div>

             <div className="rowdiv"> 
            {cellButtons.slice(63, 66)}
            <div className="v_line"></div>
            {cellButtons.slice(66, 69)}
            <div className="v_line"></div>
            {cellButtons.slice(69, 72)}
        </div>
        <div className="rowdiv">
            {cellButtons.slice(72, 75)}
            <div className="v_line"></div>
            {cellButtons.slice(75, 78)}
            <div className="v_line"></div>
            {cellButtons.slice(78, 81)}
            </div>

      </div>
      </div>}
    </div>
  );
}
