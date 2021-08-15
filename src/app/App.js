import React, { useEffect } from "react";
import { Table } from "../features/table/Table";
import "./App.css";
import { runFetch, selectLimit } from "../features/table/tableSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const limit = useSelector(selectLimit);
  const dispatch = useDispatch();

  useEffect(() => dispatch(runFetch(limit)));

  return (
    <div className="App">
      <header className="App-header">
        <h2>Asset Management 1.0</h2>
        <h4>{limit ? limit : "No Limit"}</h4>
      </header>
      <main style={{ maxWidth: "960px", margin: "auto" }}>
        <Table />
      </main>
    </div>
  );
}

export default App;
