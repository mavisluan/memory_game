var arrOfImages = ["clam.png", "octopus.png", "orange_fish.png"];
// , "pink_fish.png", "seahorse.png", "seastar.png", "seaweed.png", "shrimp.png", "yellow_fish.png", "triangle_fish.png", "round_fish.png", "squid.png"

function doubleImages(arr) {
    for (var i = arr.length - 1; i >= 0; i--) {
        arr.push(arr[i]);
    }

    return arr;
}

doubleImages(arrOfImages)

function displayCards(arr) {
    var container = document.getElementById("container");

    for (var i = 0; i < arr.length; i++) {
        var newImgElement = document.createElement("img");
        newImgElement.src = "static/images/" + arr[i];
        newImgElement.id = i;
        newImgElement.className = "card";

        container.appendChild(newImgElement);
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

shuffleCards(arrOfImages);
displayCards(arrOfImages);
setTimeout(hideAllCards, 2000);

function hideACard(idx) {
    var specificCard = document.getElementById(idx);
    specificCard.src = "static/images/questionmark.png";
}

var hiddenCardsIds = [];
function hideAllCards() {   
    for (var i = 0; i < arrOfImages.length; i++) {
        hideACard(i)
        hiddenCardsIds.push(i);
    }
}

var cards = document.getElementsByClassName("card");
var pickedCardsIds = [];
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", revealCard);
    cards[i].addEventListener("click", updateMoves);
}

function createAlert(text) {
    var message = document.createElement("h1")
    message.textContent = text
    message.id = "message"
    document.getElementById("container").appendChild(message)
}

function removeAlert() {
    document.getElementById("container").removeChild(message)
}

function revealCard(event) {
    var clickedImageId = event.target.id;
    var clickedImage = document.getElementById(clickedImageId);
    clickedImage.src = "static/images/" + arrOfImages[clickedImageId];

    pickedCardsIds.push(clickedImageId);

    if (pickedCardsIds.length == 2) {
        if (arrOfImages[pickedCardsIds[0]] == arrOfImages[pickedCardsIds[1]]) {
            hiddenCardsIds = hiddenCardsIds.filter(id => id!= pickedCardsIds[0] && id != pickedCardsIds[1])
            pickedCardsIds = [];

            createAlert("You made a match.");
            if (hiddenCardsIds.length != 0) {
                setTimeout(removeAlert, 600);
            } else {
                removeAlert()
                createAlert("You are a genius!");
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


var steps = 0;
function updateMoves() {
    steps += 1
    console.log(steps)
    var updatedMoves = document.createElement("span");
    updatedMoves.textContent = "Moves: " + steps;
    var counter = document.getElementById("counter")
    counter.replaceChild(updatedMoves, counter.childNodes[1])
}

