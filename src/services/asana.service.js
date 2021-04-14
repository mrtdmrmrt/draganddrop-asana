import { BASE_URL } from './api-base';
import { responseHandler } from './helper';
export const asanaService = {
  fetchSectionList,
  fetchSectionNameUpdate,
  fetchSectionTaskUpdate,
  fetchSectionAdd,
  fetchSectionDelete,
  fetchSectionTaskAdd,
  fetchTaskNameUpdate,
  fetchSectionTaskColorUpdate,
  fetchTaskDelete,
};

async function fetchSectionList() {
  const requestOptions = {
    method: 'GET',
  };

  const request = await fetch(`${BASE_URL}/sections`, requestOptions);
  return responseHandler(request);
}
async function fetchSectionNameUpdate(id, name) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ name: name }),
  };

  const request = await fetch(`${BASE_URL}/sections/${id}`, requestOptions);
  return responseHandler(request);
}
async function fetchSectionTaskUpdate(id, tasks) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      tasks: [...tasks],
    }),
  };

  const request = await fetch(`${BASE_URL}/sections/${id}`, requestOptions);
  return responseHandler(request);
}
async function fetchSectionAdd(name) {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      name: name,
      tasks: [],
    }),
  };
  const request = await fetch(`${BASE_URL}/sections`, requestOptions);
  return responseHandler(request);
}
async function fetchSectionDelete(id) {
  const requestOptions = {
    method: 'DELETE',
  };
  const request = await fetch(`${BASE_URL}/sections/${id}`, requestOptions);
  return responseHandler(request);
}
async function fetchSectionTaskAdd(id, tasks) {
  console.log(tasks);
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      tasks: [...tasks],
    }),
  };
  const request = await fetch(`${BASE_URL}/sections/${id}`, requestOptions);
  return responseHandler(request);
}
async function fetchTaskNameUpdate(id, tasks) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ tasks: [...tasks] }),
  };

  const request = await fetch(`${BASE_URL}/sections/${id}`, requestOptions);
  return responseHandler(request);
}
async function fetchSectionTaskColorUpdate(id, tasks) {
  console.log(tasks);
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({
      tasks: [...tasks],
    }),
  };
  const request = await fetch(`${BASE_URL}/sections/${id}`, requestOptions);
  return responseHandler(request);
}
async function fetchTaskDelete(id, tasks) {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
    body: JSON.stringify({ tasks: [...tasks] }),
  };

  const request = await fetch(`${BASE_URL}/sections/${id}`, requestOptions);
  return responseHandler(request);
}
