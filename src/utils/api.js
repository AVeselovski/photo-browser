const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// for mocking response when typicode.com has server issues
export async function mockData(url) {
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };

  let response;
  try {
    response = await fetch(`http://localhost:3000/data/${url}.json`, options);
  } catch (error) {
    console.error(error);

    return { meta: {}, data: {}, error: `${error} - 500` };
  }

  if (!response.ok) {
    const error = new Error(`API failed - ${response.status}`);
    console.error(error);

    return { meta: {}, data: {}, error: `API request failed - ${response.status}` };
  }

  const data = await response.json();

  return {
    meta: {
      count: 1
    },
    data
  };
}

export async function fetchData(url, method = "GET") {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    }
  };

  let response;
  try {
    response = await fetch(`${API_BASE_URL}/${url}`, options);
  } catch (error) {
    console.error(error);

    return { meta: {}, data: {}, error: `${error} - 500` };
  }

  if (!response.ok) {
    const error = new Error(`API failed - ${response.status}`);
    console.error(error);

    return { meta: {}, data: {}, error: `API request failed - ${response.status}` };
  }

  const count = response.headers.get("X-Total-Count") || 1;
  const data = await response.json();

  return {
    meta: {
      count
    },
    data
  };
}
