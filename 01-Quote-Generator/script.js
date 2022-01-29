const quoteContainer = document.getElementById("quote-container");

const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");

const NewQuoteBtn = document.getElementById("new-quote");
const twitterBtn = document.getElementById("twitter");
const loader = document.getElementById("loader");

let apiQuotes = [];

function showLoadingSpinner() {
  quoteContainer.hidden = true;
  loader.hidden = false;
}

function removeLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

// show Quote
function newQuote() {
  showLoadingSpinner();
  // pick a random quote from apiQuote array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  quote.author ? (authorText.textContent = quote.author) : "unknown";

  // check quote length to add different font size
  quote.text.length > 120
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  removeLoadingSpinner();
  quoteText.textContent = quote.text;
}

// get quotes from API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    console.log("something went wrong ", error);
  }
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;

  window.open(twitterUrl, "_blank");
}

twitterBtn.addEventListener("click", tweetQuote);
NewQuoteBtn.addEventListener("click", newQuote);

getQuotes();
