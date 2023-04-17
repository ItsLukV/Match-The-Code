let tab = " | ";
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
		text: `def foo():<br>${tab}return "Hej"`,
		type: "funktion",
	},
	{
		text: "Betinget Udførsel",
		type: "betingetUdførsel'",
	},
	{
		text: `x = 10<br> if x == 10:<br> ${tab}print("hej")`,
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
		text: `for i in range(10):<br>${tab}print(i)`,
		type: "løkker",
	},
	{
		text: "Klasser",
		type: "klasser",
	},
	{
		text: `class boo:<br>${tab}def __init__(self, name)<br>${
			2 * tab
		}self.name = name`,
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

// for (let i = 0; i < cards.length; i++) {
// 	cards[i].getHtml().innerHTML = cards[i].code.text;
// }
let locked = false;
function clicked(number) {
	if (locked) return;
	if (aktive.length == 1) {
		if (aktive[0] == number) return;
	}
	let card = cards[parseInt(number)];
	aktive.push(parseInt(number));
	card.getHtml().className = "card aktive-card";
	card.getHtml().innerHTML = card.code.text;
	if (aktive.length == 2) {
		let same = compare(cards[aktive[0]], cards[aktive[1]]);
		console.log(aktive, same);
		if (same) aktive = [];
	}
	if (aktive.length >= 2) {
		locked = true;
		setTimeout(function () {
			aktive.forEach((element) => {
				cards[element].getHtml().className = "card flipped";
				cards[element].getHtml().innerHTML = "";
				locked = false;
			});
			aktive = [];
		}, 2000);
	}
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
