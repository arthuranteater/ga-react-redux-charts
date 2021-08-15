// A mock function to mimic making an async request for data
export function getData(limit = "") {
  return fetch(`http://localhost:3001/assets?_start=0&_limit=${limit}`)
    .then((response) => response.json())
    .then((data) => data);
}
