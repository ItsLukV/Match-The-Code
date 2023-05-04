// Size of a tab.
let tab = "&emsp;";
// The cards.
let cards = [];
// The info for the cards.
let codes = [
  {
    text: "Variabler",
    type: "variabler",
  },
  {
    text: "x = 10",
    type: "variabler",
  },
  {
    text: "Funktioner",
    type: "funktion",
  },
  {
    text: `function foo(){<br>${tab}return "Hej"<br>}`,
    type: "funktion",
  },
  {
    text: "Betinget Udførsel",
    type: "betingetUdførsel'",
  },
  {
    text: `x = 10<br> if (x == 10){<br> ${tab}console.log("hej")<br>}`,
    type: "betingetUdførsel'",
  },
  {
    text: "Operatører",
    type: "operatør",
  },
  {
    text: "10 < 5",
    type: "operatør",
  },
  {
    text: "Løkker",
    type: "løkker",
  },
  {
    text: `for(let i = 0; i < 10; i++){<br>${tab}print(i)<br>}`,
    type: "løkker",
  },
  {
    text: "Klasser",
    type: "klasser",
  },
  {
    text: `class boo{<br>${tab} constructor(name){<br>${
      tab + tab
    }this.name = name<br>
		${tab}}<br>
		}`,
    type: "klasser",
  },
  {
    text: "Lister",
    type: "list",
  },
  {
    text: "z = [10,11,12]",
    type: "list",
  },
];
let set = [];

// Shuffle the cards.
codes = shuffleArray(codes);

class Card {
  // html: any;
  // code: { text: string; type: string };
  constructor(html, code) {
    this.html = html;
    this.code = code;
    this.done = false;
  }

  // Getters
  /**
   * returns the html element of the card.
   * @returns {HTMLElement}
   */
  getHtml() {
    return this.html;
  }

  /**
   * returns the code object of the card.
   * @returns {object} The code object of the card.
   */
  getCode() {
    return this.code;
  }
}
/**
 * Creates the cards.
 */
for (let i = 0; i < 14; i++) {
  cards[i] = new Card(document.getElementById(`${i}`), codes[i]);
}

// counts the clicks.
let clicks = 0;
// locks the cards.
let locked = false;

function clicked(number) {
  // Check if the card is already done.
  if (cards[parseInt(number)].done) return;
  // Check if the cards are locked.
  if (locked) return;
  // Increment the clicks.
  clicks++;
  // Check if the card is already flipped.
  if (set.length == 1) {
    if (set[0] == number) return;
  }

  let card = cards[parseInt(number)];

  // Adds the card to the set.
  set.push(parseInt(number));

  // Flips the card.
  card.getHtml().className = "card aktive-card";
  card.getHtml().childNodes[1].innerHTML = card.code.text;

  // Check if the cards in set are the same type.
  if (set.length == 2) {
    let same = compare(cards[set[0]], cards[set[1]]);
    if (same) {
      cards[set[0]].done = true;
      cards[set[1]].done = true;
      set = [];
    }
  }
  // Check if the cards in set are not the same type.
  if (set.length >= 2) {
    locked = true;
    // Wait 2 seconds, if not the same type.
    setTimeout(function () {
      set.forEach((element) => {
        cards[element].getHtml().className = "card flipped";
        cards[element].getHtml().childNodes[1].innerHTML = "";
        locked = false;
      });
      set = [];
    }, 2000);
  }
  // Check if all cards are done.
  if (cards.map((obj) => obj.done).every((val) => val === true)) {
    switchPage();
  }
}

function switchPage() {
  // Save the clicks to local storage.
  localStorage.setItem("clicks", clicks);
  // Switch to the win page.
  window.location.href = "win.html";
}

function compare(card1, card2) {
  // Check if the cards are the same type.
  return card1.getCode().type === card2.getCode().type;
}

function shuffleArray(array) {
  let currentIndex = array.length;
  let randomIndex;
  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--; // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  // Return the shuffled array.
  return array;
}
