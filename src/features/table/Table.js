import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectData, selectStatus } from "./tableSlice";
import GridLoader from "react-spinners/GridLoader";
import { css } from "@emotion/react";
import "./table.css";
import {
  AiOutlineSortAscending,
  AiOutlineSortDescending,
} from "react-icons/ai";

export function Table() {
  const value = useSelector(selectData);
  const status = useSelector(selectStatus);

  const [sorted, setSorted] = useState(null);
  const [activeColumn, setActiveColumn] = useState({ name: "", asc: false });

  useEffect(() => setSorted(value), [value]);

  const transformDate = (date) => date.split("/").reverse().join("");

  const sort = (col, asc) => {
    const date = col === "Date";
    const nArr = [...sorted].sort((row1, row2) => {
      let a = row1[col];
      let b = row2[col];
      if (date) {
        a = transformDate(a);
        b = transformDate(b);
      }
      return asc ? a - b : b - a;
    });
    setSorted(nArr);
  };

  const override = css`
    display: block;
    margin: 0 auto;
  `;

  return (
    <>
      <button
        style={{ margin: "20px" }}
        onClick={() => {
          setSorted(value.map((x) => x));
          setActiveColumn({ name: "", asc: false });
        }}
      >
        Clear sorted
      </button>
      {sorted ? (
        <table>
          <tbody>
            <tr>
              {Object.keys(sorted[0]).map((k) => (
                <th
                  id={k}
                  onClick={(e) => {
                    setActiveColumn({
                      name: e.target.id,
                      asc: !activeColumn.asc,
                    });
                    sort(e.target.id, !activeColumn.asc);
                  }}
                  key={k}
                >
                  {k}
                  {k === activeColumn.name ? (
                    activeColumn.asc ? (
                      <AiOutlineSortAscending />
                    ) : (
                      <AiOutlineSortDescending />
                    )
                  ) : null}
                </th>
              ))}
            </tr>
            {sorted.map((a, i) => (
              <tr key={i}>
                {Object.values(a).map((v, i) => (
                  <td key={i}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <GridLoader color={"blue"} loading={status} css={override} size={15} />
      )}
    </>
  );
}
