

const url = import.meta.env.VITE_BASE_URL

const fetchAllMaps = async () => {
  return fetch(`${url}/maps`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const fetchSingleMap = async (mapId) => {
  return fetch(`${url}/maps/${mapId}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const checkCoordinates = async (mapId, char, x, y) => {
  return fetch(`${url}/maps/${mapId}/onClick?char=${char}&x=${x}&y=${y}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const startMapTimer = async (mapId) => {
  return fetch(`${url}/maps/${mapId}/start`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST'
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const finishMapTimer = async (mapId) => {
  return fetch(`${url}/maps/${mapId}/finish`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST'
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const postTimeToLeaderBoard = async (username, time, mapId) => {
  return fetch(`${url}/maps/${mapId}/post-time`, {
    headers: {
      "Content-Type": "application/json"
    },
    method: 'POST',
    body: JSON.stringify({
      username,
      time,
    })
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

const getLeaderboard = async (mapId, skip) => {
  return fetch(`${url}/maps/${mapId}/leaderboard?skip=${skip}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
}

export {
  fetchAllMaps,
  fetchSingleMap,
  checkCoordinates,
  startMapTimer,
  finishMapTimer,
  postTimeToLeaderBoard,
  getLeaderboard
}