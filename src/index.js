let tab = "&emsp;";
let cards = [];
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
		text: `function foo(){<br>${tab}return "Hej<br>}"`,
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
let aktive = [];

codes = shuffleArray(codes);

class Card {
	// html: any;
	// code: { text: string; type: string };
	constructor(html, code) {
		this.html = html;
		this.code = code;
		this.done = false;
	}

	getHtml() {
		return this.html;
	}
	getCode() {
		return this.code;
	}
}

for (let i = 0; i < 14; i++) {
	cards[i] = new Card(document.getElementById(`${i}`), codes[i]);
}

let clicks = 0;
let locked = false;
function clicked(number) {
	if (cards[parseInt(number)].done) return;
	if (locked) return;
	clicks++;
	if (aktive.length == 1) {
		if (aktive[0] == number) return;
	}
	let card = cards[parseInt(number)];
	aktive.push(parseInt(number));
	card.getHtml().className = "card aktive-card";
	card.getHtml().childNodes[1].innerHTML = card.code.text;
	if (aktive.length == 2) {
		let same = compare(cards[aktive[0]], cards[aktive[1]]);
		console.log(aktive, same);
		if (same) {
			cards[aktive[0]].done = true;
			cards[aktive[1]].done = true;
		}

		if (same) aktive = [];
	}
	if (aktive.length >= 2) {
		locked = true;
		setTimeout(function () {
			aktive.forEach((element) => {
				cards[element].getHtml().className = "card flipped";
				cards[element].getHtml().childNodes[1].innerHTML = "";
				locked = false;
			});
			aktive = [];
		}, 2000);
	}
	if (cards.map((obj) => obj.done).every((val) => val === true)) {
		switchPage();
	}
}

function switchPage() {
	localStorage.setItem("clicks", clicks);
	window.location.href = "win.html";
}

function compare(card1, card2) {
	return card1.getCode().type === card2.getCode().type;
}
// Souce: https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffleArray(array) {
	let currentIndex = array.length,
		randomIndex;

	// While there remain elements to shuffle.
	while (currentIndex != 0) {
		// Pick a remaining element.
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [
			array[randomIndex],
			array[currentIndex],
		];
	}

	return array;
}
