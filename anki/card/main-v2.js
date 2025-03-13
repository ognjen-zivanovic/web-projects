var notes = [
	{ id: 1339252520768, content: "Card1", back: "(A1) | B1", is_suspended: -1 },
	{ id: 1339252520769, content: "Card2", back: "(C1) | D1", is_suspended: 0 },
	{ id: 1339252520770, content: "Card3", back: "(E1) | F1", is_suspended: 0 },
	{ id: 1339252520771, content: "Card4", back: "(G1) | H1", is_suspended: 0 },
	{ id: 1339252520772, content: "Card5", back: "(I1) | J1", is_suspended: -1 },
];

let topId = -1;
let cardIndex = 0;
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");

card1.style.zIndex = 1;
card2.style.zIndex = -1;

const setNextCard = () => {
	if (topId == -1) {
		topId = 1;
	} else if (topId == 1) {
		topId = 2;
	} else if (topId == 2) {
		topId = 1;
	}

	let card;
	if (topId == 1) {
		card = card1;
	} else if (topId == 2) {
		card = card2;
	}
	let headerText = card.getElementsByClassName("card-header");
	let bodyTexts = card.getElementsByClassName("body-text");

	//headerText[0].innerHTML = notes[cardIndex].content;

	const splitText = notes[cardIndex].back.split("|");
	let pronunciation = splitText[0].trim();

	pronunciation = pronunciation.replace("(", "");
	pronunciation = pronunciation.replace(")", "");

	const meaning = splitText[1].trim();
	// bodyTexts[0].innerHTML = meaning;
	// bodyTexts[1].innerHTML = pronunciation;

	//cardIndex++;
};

setNextCard();

const testButton = document.getElementById("test-button");
testButton.onclick = setNextCard;

const notKnownButton1 = document.getElementById("not-known-button-1");
notKnownButton1.addEventListener("touchstart", () => {
	setNextCard();
	card2.style.zIndex = 1;
	card2.classList.remove("animateLeft");
	card2.classList.remove("animateRight");
	body2.style.display = "none";

	card1.style.zIndex = -1;
	card1.classList.add("animateLeft");
});

const knownButton1 = document.getElementById("known-button-1");
knownButton1.addEventListener("touchstart", () => {
	setNextCard();
	card2.style.zIndex = 1;
	card2.classList.remove("animateLeft");
	card2.classList.remove("animateRight");
	body2.style.display = "none";

	card1.style.zIndex = -1;
	card1.classList.add("animateRight");
});

const body1 = document.getElementById("body1");
card1.addEventListener("touchstart", () => {
	body1.style.display = "flex";
});

const notKnownButton2 = document.getElementById("not-known-button-2");
notKnownButton2.addEventListener("touchstart", () => {
	setNextCard();
	card1.style.zIndex = 1;
	card1.classList.remove("animateLeft");
	card1.classList.remove("animateRight");
	body1.style.display = "none";

	card2.style.zIndex = -1;
	card2.classList.add("animateLeft");
});

const knownButton2 = document.getElementById("known-button-2");
knownButton2.addEventListener("touchstart", () => {
	setNextCard();
	card1.style.zIndex = 1;
	card1.classList.remove("animateLeft");
	card1.classList.remove("animateRight");
	body1.style.display = "none";

	card2.style.zIndex = -1;
	card2.classList.add("animateRight");
});

const body2 = document.getElementById("body2");
card2.addEventListener("touchstart", () => {
	body2.style.display = "flex";
});

card1.addEventListener("animationend", () => {
	card1.classList.remove("animateLeft");
	card1.classList.remove("animateRight");
});

card2.addEventListener("animationend", () => {
	card2.classList.remove("animateLeft");
	card2.classList.remove("animateRight");
});
