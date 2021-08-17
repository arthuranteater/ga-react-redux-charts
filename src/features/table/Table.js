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
import { sortByColumn } from "../../common/helpers";

export function Table() {
  const value = useSelector(selectData);
  const status = useSelector(selectStatus);

  const [sorted, setSorted] = useState(null);
  const [activeColumn, setActiveColumn] = useState({ name: "", asc: false });

  useEffect(() => setSorted(value), [value]);

  const sort = (col, asc) => {
    setSorted(sortByColumn(sorted, col, asc));
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
