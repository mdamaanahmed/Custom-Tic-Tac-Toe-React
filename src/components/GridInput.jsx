import React, { useState } from "react";

const GridInput = ({ setGridSize, error, setError }) => {
  const [input, setInput] = useState(3);

  const getGridValue = (e) => {
    if (e.target.value < 3) setError("Grid will not be less than 3");
    else if (e.target.value > 10) setError("Grid will not be grater than 10");
    else setError(null);
    setInput(e.target.value);
  };

  const setGridValue = () => {
    setGridSize(input);
  };

  return (
    <div className="grid-input">
      <input type="number" value={input} onChange={(e) => getGridValue(e)} />
      <button onClick={setGridValue} disabled={!input || error}>
        Change
      </button>
      <p className="error">{error}</p>
    </div>
  );
};

export default GridInput;
