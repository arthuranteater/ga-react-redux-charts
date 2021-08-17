export const transformDate = (date) => date.split("/").reverse().join("");

export const sortByColumn = (arr, col = "Date", asc = true) =>
  [...arr].sort((row1, row2) => {
    let a = row1[col];
    let b = row2[col];
    if (col === "Date") {
      a = transformDate(a);
      b = transformDate(b);
    }
    return asc ? a - b : b - a;
  });

export const sumColumnByDate = (arr, cat) => {
  const map = new Map();
  [...arr].forEach((row) => {
    const rowNum = parseFloat(row[cat]);
    if (map.has(row.Date)) {
      map.set(row.Date, {
        total: map.get(row.Date).total + rowNum,
        count: map.get(row.Date).count + 1,
      });
    } else {
      map.set(row.Date, { total: rowNum, count: 1 });
    }
  });
  return map;
};
