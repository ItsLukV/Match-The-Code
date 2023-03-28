let cards = [];
let codes = [
	{
		text: 'console.log("1")',
		type: "hehe",
	},
	{
		text: 'console.log("2")',
		type: "hehe",
	},
	{
		text: 'console.log("3")',
		type: "hehe1",
	},
	{
		text: 'console.log("4")',
		type: "hehe1",
	},
	{
		text: 'console.log("5")',
		type: "hehe2",
	},
	{
		text: 'console.log("6")',
		type: "hehe2",
	},
	{
		text: 'console.log("7")',
		type: "hehe3",
	},
	{
		text: 'console.log("8")',
		type: "hehe3",
	},
	{
		text: 'console.log("9")',
		type: "hehe4",
	},
	{
		text: 'console.log("10")',
		type: "hehe4",
	},
	{
		text: 'console.log("11")',
		type: "hehe5",
	},
	{
		text: 'console.log("12")',
		type: "hehe5",
	},
	{
		text: 'console.log("13")',
		type: "hehe6",
	},
	{
		text: 'console.log("14")',
		type: "hehe6",
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
