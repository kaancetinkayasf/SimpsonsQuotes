//ITEMS FROM HTML
const quoteText = document.getElementById("quote-text");
const authorText = document.getElementById("author-text");
const twitterButton = document.getElementById("twitter");
const newQuoteButton = document.getElementById("newQuote-button");
const loader = document.getElementById("loader");
const quoteContainer = document.getElementById("quote-container");
const proxyUrl = "https://cors-anywhere.herokuapp.com/";

//API REQUEST
function showLoaderAnimation() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoaderAnimation() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

async function getQuoteFromAPI() {
  showLoaderAnimation();
  const url = "https://thesimpsonsquoteapi.glitch.me/quotes";
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data[0].quote.length > 120) {
      quoteText.classList.add("long-qoute");
    } else {
      quoteText.classList.remove("long-quote");
    }
    console.log(data);
    quoteText.innerText = data[0].quote;
    authorText.innerText = "- " + data[0].character;
    hideLoaderAnimation();
  } catch (e) {
    getQuoteFromAPI();
  }
}

function tweeter() {
  const url = `https://twitter.com/intent/tweet?text=${quoteText.innerText} -${authorText.innerText}`;
  window.open(url);
}

getQuoteFromAPI();

twitterButton.addEventListener("click", tweeter);
newQuoteButton.addEventListener("click", getQuoteFromAPI);
