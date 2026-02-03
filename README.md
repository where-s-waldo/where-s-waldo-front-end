# Where’s Waldo — Photo Tagging App (React Frontend)
[Backend](https://github.com/where-s-waldo/where-s-waldo-back-end)

This React.js app validates X Y coordinates through the backend and displays the result so users can tag Waldo.

## How It Works

1. The user clicks the sceen and gets the X Y coordinates and the selected character.
2. The frontend uses the Fetch API to get send the users X Y and selected character and validate them against the backend X Y coordinates data.
3. The backend sends true/false and the frontend displays the result.

## Example API Fetch

```js
const checkCoordinates = async (mapId, char, x, y) => {
  return fetch(`${url}/maps/${mapId}/onClick?char=${char}&x=${x}&y=${y}`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
} // sends back true/false and the char it is checking
```

```js
const fetchAllMaps = async () => {
  return fetch(`${url}/maps`, {
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then((response) => response.json())
    .catch((error) => console.error(error))
} // response.maps is an array of map objects
```

## Targeting Box
![Waldo targeting box](/public/readmeImgs/targetBox.png)
