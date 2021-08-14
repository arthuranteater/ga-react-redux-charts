import React, { useEffect } from "react";
import { Table } from "./features/table/Table";
import "./App.css";
import { runFetch, selectLimit } from "./features/table/tableSlice";
import { useSelector, useDispatch } from "react-redux";

function App() {
  const limit = useSelector(selectLimit);
  const dispatch = useDispatch();

  useEffect(() => dispatch(runFetch(limit)));

  return (
    <div className="App">
      <header className="App-header">
        <h2>Data</h2>
        <h2>{limit ? limit : "No Limit"}</h2>
        <Table />
      </header>
    </div>
  );
}

export default App;
