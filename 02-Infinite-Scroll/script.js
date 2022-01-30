const imageContainer = document.getElementById("image-container");
const loader = document.getElementById("loader");

let count = 5;
const apiKey = "e4R92nYwU4jJRFWbSR3RAoPyrx0M0X-J54cbDgvK-UE";

// unsplash api
const unsplashApi = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}
`;

let apiPhotos = [];
let totalImages = 0;
let ready = false;
let imagesLoaded = 0;

function imageLoaded() {
  imagesLoaded++;

  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    // reseting images loaded to match the length of the array
    imagesLoaded = 0;

    // after initial load changing count from 5 to 30
    count = 30;
  }
}

// setAttributes method to set attributes on element  (DRY)
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// display photo,link,title(on hover) from an api
function displayPhoto() {
  apiPhotos.forEach((photo) => {
    // creating <a> for the link to unsplash
    const item = document.createElement("a");
    setAttributes(item, {
      href: photo.links.html,
      target: "_blank",
    });

    // creating img element to display unsplash img with description on hover
    const img = document.createElement("img");

    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.description,
      title: photo.description ? photo.description : "image from unsplash.com",
    });

    // create event to check if image finished loading
    img.addEventListener("load", imageLoaded);
    // put <img> inside <a>, then put both inside imageContainer element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}
// get photos from unsplash api

async function getPhotosFromApi() {
  try {
    const response = await fetch(unsplashApi);
    apiPhotos = await response.json();
    totalImages = apiPhotos.length;
    displayPhoto();
  } catch (error) {
    console.log("something went wrong,", error.message);
  }
}

// using an event to look for an mouse scroll at the end of the window and then trigger getPhotos method to fetch photos from api

window.addEventListener("scroll", (e) => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    // reseting ready flag for avoiding multiple api request on scroll and make fetch req only when ready boolean in true
    ready = false;
    getPhotosFromApi();
  }
});

// on load
getPhotosFromApi();
