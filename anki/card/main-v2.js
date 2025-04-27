import { notes, wkLevel, wkKanji } from "./data.js";

let topId = -1;
let cardIndex = -1;
let numSuspended = 0;
let showing = "all";
let shuffle = false;
let indexOfLastSuspended = -1;
const card1 = document.getElementById("card1");
const card2 = document.getElementById("card2");

card1.style.zIndex = 1;
card2.style.zIndex = -1;

const infoText1 = document.getElementById("info-text-1");
const infoText2 = document.getElementById("info-text-2");
const infoText3 = document.getElementById("info-text-3");

function loadSaved() {
	let saved_notes = localStorage.getItem("notes-v3");
	if (saved_notes) {
		let saved_notes_json = JSON.parse(saved_notes);
		for (let i = 0; i < saved_notes_json.length; i++) {
			notes[i].is_suspended = saved_notes_json[i].is_suspended;
		}
	}
}
loadSaved();

function countSuspended() {
	for (let i = 0; i < notes.length; i++) {
		if (notes[i].is_suspended == -1) {
			numSuspended++;
			indexOfLastSuspended = i;
		}
	}
}
countSuspended();

function getIndexOfNextCard() {
	if (!shuffle) {
		return cardIndex + 1;
	} else {
		return Math.floor(Math.random() * notes.length);
	}
}

function updateTopId() {
	if (topId == -1) {
		topId = 1;
	} else if (topId == 1) {
		topId = 2;
	} else if (topId == 2) {
		topId = 1;
	}
}

function getCardDiv() {
	if (topId == 1) {
		return card1;
	} else if (topId == 2) {
		return card2;
	}
}

function updateCardIndex() {
	cardIndex = getIndexOfNextCard();
	if (showing == "new") {
		while (notes[cardIndex].is_suspended == -1) {
			cardIndex = getIndexOfNextCard();
		}
	} else if (showing == "suspended") {
		while (notes[cardIndex].is_suspended != -1) {
			cardIndex = getIndexOfNextCard();
		}
	}
}

function updateCardInfo(card) {
	infoText1.innerHTML = numSuspended + "/" + (indexOfLastSuspended + 1);
	infoText2.innerHTML = cardIndex + 1 + "/" + notes.length;
	if (notes[cardIndex].is_suspended == -1) {
		infoText3.innerHTML = "known";
	} else {
		infoText3.innerHTML = "";
	}

	let headerText = card.getElementsByClassName("card-header");
	let bodyTexts = card.getElementsByClassName("body-text");
	let wkText = card.getElementsByClassName("wanikani")[0];

	let headerString = notes[cardIndex].content;
	headerText[0].innerHTML = headerString;

	const splitText = notes[cardIndex].back.split("|");
	let pronunciation = splitText[0].trim();

	pronunciation = pronunciation.replace("(", "");
	pronunciation = pronunciation.replace(")", "");

	const meaning = splitText[1].trim();
	bodyTexts[0].innerHTML = meaning;
	bodyTexts[1].innerHTML = pronunciation;

	const wkLvl = wkLevel[cardIndex];
	if (wkLvl != null) {
		wkText.innerHTML = "WK " + wkLvl;
		wkText.style.display = "block";
		if (wkLvl < 10) {
			wkText.style.backgroundColor = "#aeeeee";
		} else if (wkLvl < 20) {
			wkText.style.backgroundColor = "#F9E16E";
		} else if (wkLvl < 30) {
			wkText.style.backgroundColor = "#FFCC99";
		} else if (wkLvl < 40) {
			wkText.style.backgroundColor = "#F7C763";
		} else {
			wkText.style.backgroundColor = "#FF6F61";
		}
	} else {
		wkText.style.display = "none";
	}

	const kanjiTexts = card.getElementsByClassName("kanji-text-containter")[0];
	kanjiTexts.innerHTML = "";

	for (let i = 0; i < headerString.length; i++) {
		let kanjiString = wkKanji[headerString[i]];
		if (kanjiString != null) {
			let kanjiText = document.createElement("div");
			kanjiText.classList.add("body-text", "kanji");

			let nameDiv = document.createElement("div");
			let meaningDiv = document.createElement("div");
			let pronunciationDiv = document.createElement("div");

			nameDiv.innerHTML = kanjiString[0];
			meaningDiv.innerHTML = kanjiString[1];
			pronunciationDiv.innerHTML = kanjiString[2];
			kanjiText.appendChild(nameDiv);
			kanjiText.appendChild(meaningDiv);
			kanjiText.appendChild(pronunciationDiv);
			kanjiTexts.appendChild(kanjiText);
		}
	}
}

const setNextCard = () => {
	updateCardIndex();
	updateTopId();
	let card = getCardDiv();
	updateCardInfo(card);
};

setNextCard();

const notKnownButton1 = document.getElementById("not-known-button-1");
notKnownButton1.addEventListener("touchstart", () => {
	if (notes[cardIndex].is_suspended == -1) {
		numSuspended--;
	}
	notes[cardIndex].is_suspended = 0;
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
	if (notes[cardIndex].is_suspended != -1) {
		numSuspended++;
		indexOfLastSuspended = Math.max(indexOfLastSuspended, cardIndex);
	}
	notes[cardIndex].is_suspended = -1;
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
	if (notes[cardIndex].is_suspended == -1) {
		numSuspended--;
	}
	notes[cardIndex].is_suspended = 0;
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
	if (notes[cardIndex].is_suspended != -1) {
		numSuspended++;
		indexOfLastSuspended = Math.max(indexOfLastSuspended, cardIndex);
	}
	notes[cardIndex].is_suspended = -1;
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
	body1.style.display = "none";
});

card2.addEventListener("animationend", () => {
	card2.classList.remove("animateLeft");
	card2.classList.remove("animateRight");
	body2.style.display = "none";
});

window.addEventListener(
	"dblclick",
	function (event) {
		event.preventDefault();
	},
	{
		passive: false,
	}
);

const skipSuspendedButton = document.getElementById("skip-suspended");
skipSuspendedButton.onclick = () => {
	if (showing == "all") {
		skipSuspendedButton.innerHTML = "showing suspended";
	} else if (showing == "suspended") {
		skipSuspendedButton.innerHTML = "showing new";
	} else if (showing == "new") {
		skipSuspendedButton.innerHTML = "showing all";
	}
	showing = showing == "all" ? "suspended" : showing == "suspended" ? "new" : "all";
};

function saveToFile() {
	let blob = new Blob([JSON.stringify(notes)], { type: "application/json" });
	let url = window.URL.createObjectURL(blob);
	let a = window.document.createElement("a");
	a.href = url;
	a.download = "notes-" + new Date().toISOString() + ".json";
	a.click();
}

function loadFromFile() {
	let input = document.createElement("input");
	input.type = "file";
	input.accept = ".json";
	input.onchange = (event) => {
		let file = event.target.files[0];
		let reader = new FileReader();
		reader.onload = (event) => {
			let data = JSON.parse(event.target.result);
			for (let i = 0; i < data.length; i++) {
				notes[i].is_suspended = data[i].is_suspended;
			}
		};
		reader.readAsText(file);
	};
	input.click();
}

function saveToLocalStorage() {
	localStorage.setItem("notes-v3", JSON.stringify(notes, null, 2));
}

const saveProgressButton = document.getElementById("save-progress");
const loadProgressButton = document.getElementById("load-progress");

saveProgressButton.onclick = () => {
	saveToFile();
	saveToLocalStorage();
};

loadProgressButton.onclick = () => {
	loadFromFile();
	saveToLocalStorage();
};

const toggleShuffleButton = document.getElementById("toggle-shuffle");
toggleShuffleButton.onclick = () => {
	if (shuffle) {
		toggleShuffleButton.innerHTML = "not shuffling";
	} else {
		toggleShuffleButton.innerHTML = "shuffling";
	}
	shuffle = !shuffle;
};

infoText1.onclick = () => {
	cardIndex = indexOfLastSuspended + 1;
	let card = getCardDiv();
	updateCardInfo(card);
};
