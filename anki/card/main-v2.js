var notes = [
	{ id: 1339252520768, content: "Card1", back: "(A1) | B1", is_suspended: -1 },
	{ id: 1339252520769, content: "Card2", back: "(C1) | D1", is_suspended: 0 },
	{ id: 1339252520770, content: "Card3", back: "(E1) | F1", is_suspended: 0 },
	{ id: 1339252520771, content: "Card4", back: "(G1) | H1", is_suspended: 0 },
	{ id: 1339252520772, content: "Card5", back: "(I1) | J1", is_suspended: -1 },
];

const testButton = document.getElementById("test-button");
const card1 = document.getElementById("card1");
testButton.onclick = function () {
	// pick random card
	let randomCard = Math.floor(Math.random() * notes.length);
	console.log(randomCard);

	// find child of card with tag "body-text"
	let headerText = card1.getElementsByClassName("card-header");
	let bodyTexts = card1.getElementsByClassName("body-text");

	headerText[0].innerHTML = notes[randomCard].content;
	// split the back text into two parts
	const splitText = notes[randomCard].back.split("|");
	let pronunciation = splitText[0].trim();
	// remove brackets from pronunciation
	pronunciation = pronunciation.replace("(", "");
	pronunciation = pronunciation.replace(")", "");

	const meaning = splitText[1].trim();
	bodyTexts[0].innerHTML = meaning;
	bodyTexts[1].innerHTML = pronunciation;
};

const notKnownButton1 = document.getElementById("not-known-button-1");
notKnownButton1.addEventListener("touchstart", () => {
	card1.classList.add("animateLeft");

	card1.addEventListener("animationend", () => {
		card1.classList.remove("animateLeft");
	});
});

const knownButton1 = document.getElementById("known-button-1");
knownButton1.addEventListener("touchstart", () => {
	card1.classList.add("animateRight");

	card1.addEventListener("animationend", () => {
		card1.classList.remove("animateRight");
	});
});
