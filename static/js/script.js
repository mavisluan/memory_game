// IMAGES
var arrOfImages = ["clam.png", "octopus.png", "orange_fish.png"];
// , "pink_fish.png", "seahorse.png", "seastar.png", "seaweed.png", "shrimp.png", "yellow_fish.png", "triangle_fish.png", "round_fish.png", "squid.png"

function doubleImages(arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        arr.push(arr[i]);
    }

    return arr;
}

// doubleImages(arrOfImages)

// CARDS
function displayCards(arr) {
    var board = document.getElementById("board");

    for (var i = 0; i < arr.length; i++) {
        var card = document.createElement("img");
        card.src = "static/images/" + arr[i];
        card.id = i;
        card.className = "card";
        // Add eventListener
        card.addEventListener("click", revealCard);
        card.addEventListener("click", updateMoves);
        board.appendChild(card);
    }
}

function shuffleCards(arr) {
    for (var i = 0; i < arr.length; i++) {
        var idx1 = Math.floor(Math.random() * arr.length);
        var idx2 = Math.floor(Math.random() * arr.length);

        var temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }

    return arr;
}

// shuffleCards(arrOfImages);
// displayCards(arrOfImages);
// setTimeout(hideAllCards, 2000);

function hideACard(idx) {
    var specificCard = document.getElementById(idx);
    specificCard.src = "static/images/questionmark.png";
}

function hideAllCards() {   
    for (var i = 0; i < arrOfImages.length; i++) {
        hideACard(i)
    }
}

var pickedCardsIds = [];

function revealCard(event) {
    var clickedImageId = event.target.id;
    var clickedImage = document.getElementById(clickedImageId);
    clickedImage.src = "static/images/" + arrOfImages[clickedImageId];

    pickedCardsIds.push(clickedImageId);

    if (pickedCardsIds.length == 2) {
        if (arrOfImages[pickedCardsIds[0]] == arrOfImages[pickedCardsIds[1]]) {
            removeCard(pickedCardsIds[0])
            removeCard(pickedCardsIds[1])
            pickedCardsIds = [];

            createAlert("You made a match.");
            if (!isComplete()) {
                setTimeout(removeAlert, 600);
            } else {
                removeAlert();
                createAlert("You are a genius!");
                
                choiceAlert();
            }
        } else {
            var hidePickedCards = function () {
                hideACard(pickedCardsIds[0])
                hideACard(pickedCardsIds[1])
                pickedCardsIds = []
            }
            window.setTimeout(hidePickedCards, 600)
        }
    }
}

var removedCardsIds = []
function removeCard(id) {
    var card = document.getElementById(id)
    card.src = "static/images/blank.png"
    card.className = "blank"
    removedCardsIds.push(id)
}

function isComplete() {
   return removedCardsIds.length == arrOfImages.length
}

// ALERT
function createAlert(text) {
    var message = document.createElement("h1")
    message.textContent = text
    message.className = "message"
    document.getElementById("board").appendChild(message)
}

function removeAlert() {
    var messages = document.getElementsByClassName("message")
    while(messages.length != 0) {
        document.getElementById("board").removeChild(messages[0])
    }
}

function choiceAlert() {
    createAlert("Replay or Challenge?")
    var replayButton = createButton("Replay");

    replayButton.addEventListener("click", replayGame)
    var challengeButton = createButton("Challenge")
    challengeButton.addEventListener("click", challengeGame)
}

function createButton(text) {
    var button = document.createElement("button");
    button.className= "button";
    button.textContent = text;
    document.getElementById("board").appendChild(button);
    return button
}

function removeButtons() {
    var buttons = document.getElementsByClassName("button")
    while(buttons.length != 0) {
        document.getElementById("board").removeChild(buttons[0])
    }
}
// COUNTER
var steps = 0;
function updateMoves() {
    steps += 1
    var updatedMoves = document.createElement("span");
    updatedMoves.textContent = "Moves: " + steps;
    var counter = document.getElementById("counter")
    counter.replaceChild(updatedMoves, counter.childNodes[1])
}

function clearboard() {
    var blanks = document.getElementsByClassName("blank");
    var board = document.getElementById("board");

    while (blanks.length != 0) {
        board.removeChild(blanks[0])
    }
    removeAlert()
    removeButtons() 
}

function startGame() {
    doubleImages(arrOfImages)
    shuffleCards(arrOfImages);
    displayCards(arrOfImages);
    setTimeout(hideAllCards, 2000);
}

function replayGame() {
    clearboard()
    removeAlert()
    shuffleCards(arrOfImages);
    displayCards(arrOfImages);
    setTimeout(hideAllCards, 2000);
}

function challengeGame() {
    removeAlert()
    startGame()
}
startGame()
