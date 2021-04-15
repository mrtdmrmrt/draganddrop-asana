import { BASE_URL } from "./api-base";
import { responseHandler, isNil } from "./helper";

export const asanaService = {
  addSection,
  list,
  remove,
  update,
  updateCaption,
};

async function fetchData({ method = "GET", payload = {}, uri = "sections" }) {
  const options = {
    method: method,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(payload),
  };

  if (method === "GET" || method === "DELETE") {
    delete options.headers;
    delete options.body;
  }

  return responseHandler(await fetch(`${BASE_URL}/${uri}`, options));
}

async function list() {
  return await fetchData({ method: "GET" });
}

async function updateCaption(id, name) {
  if (isNil(name) || isNil(id))
    throw new Error("You should pass params id and name");

  return await fetchData({
    method: "PATCH",
    payload: { name: name },
    uri: `sections/${id}`,
  });
}

async function addSection(name) {
  if (isNil(name) || typeof name !== "string")
    throw new Error("You should pass the name");

  return await fetchData({
    method: "POST",
    payload: {
      name: name,
      tasks: [],
    },
  });
}

async function remove(id) {
  return await fetchData({
    method: "DELETE",
    uri: `sections/${id}`,
  });
}

async function update(id, tasks) {
  if (isNil(id) || isNil(tasks)) throw new Error("You should pass the params");

  return await fetchData({
    method: "PATCH",
    payload: {
      tasks: [...tasks],
    },
    uri: `sections/${id}`,
  });
}
