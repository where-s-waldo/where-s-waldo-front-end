const Authorization = {
  "Authorization": `Bearer ${localStorage.getItem("token")}`,
  "Content-Type": "application/json",
}

const url = import.meta.env.VITE_BASE_URL

const fetchAllMaps = async () => {
  return fetch(`${url}/maps`, {
    headers: Authorization
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const fetchSingleMap = async (mapId) => {
  return fetch(`${url}/maps/${mapId}`, {
    headers: Authorization
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const checkCoordinates = async (mapId, char, x, y) => {
  return fetch(`${url}/maps/${mapId}/onClick?char=${char}&x=${x}&y=${y}`, {
    headers: Authorization
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const startMapTimer = async (mapId) => {
  return fetch(`${url}/maps/${mapId}/start`, {
    headers: Authorization,
    method: 'POST'
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const finishMapTimer = async (mapId) => {
  return fetch(`${url}/maps/${mapId}/finish`, {
    headers: Authorization,
    method: 'POST'
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export {
  fetchAllMaps,
  fetchSingleMap,
  checkCoordinates,
  startMapTimer,
  finishMapTimer
}