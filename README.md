# Where’s Waldo — Photo Tagging App (React Frontend)

This React.js app fetches images from the backend and displays them so users can tag Waldo.

## How It Works

1. The frontend uses the Fetch API to get image data (URLs) from the backend.
2. Images are displayed in a gallery.
3. Users can mark/tap where Waldo is.

## Example API Fetch

```js
fetch('https://<backendURL>/maps')
  .then(res => res.json())
  .then(data => {
    // data.maps is an array of map objects
    console.log(data.map);
  });
```

![Waldo targeting box](/readmeImgs/targetBox.png)
![Waldo video](/readmeImgs/readmeVid.mp4)
![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://myoctocat.com/assets/images/base-octocat.svg)
