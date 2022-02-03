const button = document.getElementById("button");
const audioElement = document.getElementById("audio");

// button toggle event

function toggleDisable() {
  button.disabled = !button.disabled;
  console.log("i got triggerd ", button.disabled);
}

// function to trigger text to speech api functionality with dynamically passing joke from joke api
function tellMe(joke) {
  VoiceRSS.speech({
    key: "101e4a827fbd4118be8356fb89482a22",
    src: joke,
    hl: "en-us",
    v: "Linda",
    r: 0,
    c: "mp3",
    f: "44khz_16bit_stereo",
    ssml: false,
  });
}

// fetch jokes from api

async function fetchJokes() {
  const jokeApiUrl =
    "https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit&type=twopart";

  let joke = "";

  try {
    const response = await fetch(jokeApiUrl);
    const data = await response.json();
    if (data.setup) {
      joke = `${data.setup} ... ${data.delivery}`;
    } else {
      joke = data.joke;
    }
    tellMe(joke);
    toggleDisable();
  } catch (error) {
    console.log(`whoops..`, error);
  }
}

audioElement.addEventListener("ended", toggleDisable);

button.addEventListener("click", fetchJokes);
