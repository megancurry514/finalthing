import React from "react";
import BarChart from "./BarChart";

const data = [
  { value: 10 },
  { value: 20 },
  { value: 30 },
  { value: 40 },
  { value: 50 },
];

const App = () => {
  return (
    <div>
      <h1>Interactive Bar Chart</h1>
      <div style={{ width: 500, height: 300 }}>
        <BarChart data={data} width={500} height={300} />
      </div>
    </div>
  );
};

export default App;
