// A mock function to mimic making an async request for data
// To limit with json-server http://localhost:3001/assets?_start=0&_limit=${limit}

export function getData(limit = "") {
  return fetch(`http://localhost:3001/assets`)
    .then((response) => response.json())
    .then((data) => data);
}
