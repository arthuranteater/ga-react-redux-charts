import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectData } from "../../common/state/assetSlice";
import { sortByColumn, sumColumnByDate } from "../../common/scripts/helpers";
import CanvasJSReact from "./canvasjs.react";
const { CanvasJSChart } = CanvasJSReact;

export function LineChart() {
  const value = useSelector(selectData);
  const [sorted, setSorted] = useState(null);
  const [dataPoints, setDataPoints] = useState(null);
  const [cat, setCat] = useState("NetWin");
  const [cats, setCats] = useState(null);
  const [isPayback, setIsPayback] = useState(false);
  const [isDenom, setIsDenom] = useState(false);

  const formatDate = (date) => {
    const nArr = date.toString().match(/\d{2}/g).map(Number).reverse();
    nArr[0] = parseInt("20" + nArr[0]);
    return new Date(nArr);
  };

  const getCats = useCallback((value) => {
    const noCharts = ["Area", "Bank", "Zone", "Stand", "Asset", "Date"];
    const nArr = [];
    Object.keys(value[0]).forEach((k) => {
      if (!noCharts.includes(k)) {
        nArr.push(k);
      }
    });
    setCats(nArr);
  }, []);

  const sortByDate = useCallback((data) => {
    setSorted(sortByColumn(data));
  }, []);

  const sumColumn = useCallback((sorted, cat) => {
    cat.includes("Payback") ? setIsPayback(true) : setIsPayback(false);
    const nDataPoints = [];
    const map = sumColumnByDate(sorted, cat);
    for (const [k, v] of map) {
      let y = v.total / v.count;
      if (cat.includes("Payback")) {
        y = y * 0.01;
        setIsPayback(true);
      } else {
        setIsPayback(false);
        cat.includes("Denom") ? setIsDenom(true) : setIsDenom(false);
      }
      nDataPoints.push({ x: formatDate(k), y: y });
    }
    setDataPoints(nDataPoints);
  }, []);

  //updated value
  useEffect(() => {
    if (value) {
      getCats(value);
      sortByDate(value);
    }
  }, [value, getCats, sortByDate]);

  //updated sort, cat
  useEffect(() => {
    if (sorted) {
      sumColumn(sorted, cat);
    }
  }, [sorted, sumColumn, cat]);

  //chart settings
  const prefix = isPayback ? "" : isDenom ? "" : "$";
  const yFormat = isPayback ? "##.##%" : isDenom ? "#.##" : "$###,###.##";

  const chartOptions = {
    animationEnabled: true,
    exportEnabled: true,
    theme: "light2",
    title: {
      text: `${cat} daily averages`,
    },
    axisY: {
      title: `${cat}`,
      prefix: `${prefix}`,
    },
    data: [
      {
        type: "column",
        // xValueFormatString: "MM YYYY",
        indexLabel: "{y}",
        yValueFormatString: `${yFormat}`,
        dataPoints: dataPoints,
      },
    ],
  };

  return (
    <>
      {cats ? (
        <div style={{ marginBottom: "20px" }}>
          {cats.map((cat) => (
            <button key={cat} id={cat} onClick={(e) => setCat(e.target.id)}>
              {cat}
            </button>
          ))}
        </div>
      ) : null}
      <div>{dataPoints ? <CanvasJSChart options={chartOptions} /> : null}</div>
    </>
  );
}
