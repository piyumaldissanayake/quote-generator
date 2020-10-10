const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterButton = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

//loading started
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// loading finished
function hideLoadingSpinner() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

let quoteErrorCounter = 0;

// get quote from API
async function getQuote() {
  const proxyURL = "https://cors-anywhere.herokuapp.com/";
  const apiURL =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";
  try {
    showLoadingSpinner();

    const response = await fetch(proxyURL + apiURL);
    const data = await response.json();

    // if author is unknown
    (data.quoteAuthor === "")
      ? authorText.innerText = "Unknown"
      : authorText.innerText = data.quoteAuthor;

    //reduce font size for long quotes
    (data.quoteText.length > 120)
      ? quoteText.classList.add("long-quote")
      : quoteText.classList.remove("long-quote");

    quoteText.innerText = data.quoteText;
    quoteErrorCounter = 0;
  } catch (error) {
    quoteErrorCounter++;
    if (quoteErrorCounter < 10) {
      getQuote();
    }
  }
  hideLoadingSpinner();
}

// Tweet Quote
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;

  const twitterURL =
    `https://twitter.com/intent/tweet?text=${quote} - ${author}`;

  window.open(twitterURL, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", getQuote);
twitterButton.addEventListener("click", tweetQuote);

// On Load
getQuote();
