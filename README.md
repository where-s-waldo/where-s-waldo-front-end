# Where’s Waldo — Photo Tagging App (React Frontend)
[backend](https://github.com/where-s-waldo/where-s-waldo-back-end)

This React.js app validates X Y coordinates through the backend and displays the result so users can tag Waldo.

## How It Works

1. The frontend uses the Fetch API to get X Y coordinates data from the backend.
2. Users can mark/tap where Waldo is.
3. the X Y are used to check it the chars in in the place the user clicks on.

## Example API Fetch

```js
fetch('https://<backendURL>/maps')
  .then(res => res.json())
  .then(data => {
    // data.maps is an array of map objects
    console.log(data.map);
  });
```

## Targeting Box
![Waldo targeting box](/public/readmeImgs/targetBox.png)
