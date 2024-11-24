import React, { useEffect, useRef, useState } from "react";
import { checkWinner, generateGameColumns } from "../utils/utils";
import GridInput from "./GridInput";

const TicTacToe = () => {
  const winningMessage = "🎉 Congrats! user {{user}} win";
  const [gridSize, setGridSize] = useState(3);
  const [cols, setCols] = useState(generateGameColumns(gridSize));
  const [isUserXTurn, setIsUserXTurn] = useState("X");
  const [userWin, setUserWin] = useState(null);
  const [error, setError] = useState(null);
  const colsStyleRef = useRef([]);
  const ticTacToeStyleRef = useRef();

  const handleMark = (index) => {
    const newCols = [...cols];
    newCols[index] = isUserXTurn;
    setCols(newCols);
    const isUserWin = checkWinner(newCols, gridSize);
    if (isUserWin) {
      setUserWin(winningMessage.replace("{{user}}", isUserXTurn));
      setIsUserXTurn(null);
    } else {
      setIsUserXTurn(isUserXTurn === "X" ? "O" : "X");
    }
  };

  const resetGame = () => {
    setCols(generateGameColumns(gridSize));
    setIsUserXTurn("X");
    setError(null);
    setUserWin(null);
  };

  useEffect(() => {
    resetGame();
    setCols(generateGameColumns(gridSize));
    ticTacToeStyleRef.current.style.width = `${gridSize * 50}px`;
  }, [gridSize]);

  return (
    <div className="main">
      <h1>Tic Tac Toe</h1>
      <GridInput setGridSize={setGridSize} error={error} setError={setError} />
      {isUserXTurn && <p className="turn">User {isUserXTurn} is playing</p>}
      {userWin && <p className="win">{userWin}</p>}
      <button
        className="tic-tac-toe"
        ref={ticTacToeStyleRef}
        disabled={userWin}
      >
        {cols?.map((col, index) => {
          return (
            <div
              key={index}
              ref={(element) => (colsStyleRef.current[index] = element)}
              className="col"
              onClick={() => (!col ? handleMark(index) : null)}
            >
              {col}
            </div>
          );
        })}
      </button>
      <button className="play-again" onClick={resetGame}>
        Play Again
      </button>
    </div>
  );
};

export default TicTacToe;
