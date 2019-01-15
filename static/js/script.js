var arrOfImages = ["clam.png","octopus.png","orange_fish.png","pink_fish.png","seahorse.png","seastar.png","seaweed.png","shrimp.png", "yellow_fish.png"];

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
        var idx1 = Math.floor(Math.random()*arr.length);
        var idx2 = Math.floor(Math.random()*arr.length);

        var temp = arr[idx1];
        arr[idx1] = arr[idx2];
        arr[idx2] = temp;
    }

    return arr;
}

shuffleCards(arrOfImages);
displayCards(arrOfImages);


function hideACard(idx) {
    var specificCard = document.getElementById(idx);

    specificCard.src = "static/images/questionmark.png";
}

for (var i = 0; i < arrOfImages.length; i++) {
    hideACard(i);
}

var cards = document.getElementsByClassName("card");
for (var i = 0; i < cards.length; i++) {
    cards[i].addEventListener("click", revealCard);
}

var cardsPicked = [];

function revealCard(event) {
    var clickedImageId = event.target.id;

    var clickedImage = document.getElementById(clickedImageId);
    clickedImage.src = "static/images/" + arrOfImages[clickedImageId];

    cardsPicked.push(clickedImageId);

    if (cardsPicked.length == 2) {
        if (arrOfImages[cardsPicked[0]] == arrOfImages[cardsPicked[1]]) {
            cardsPicked = [];
        } else {
            var hidePickedCards = function() {
                hideACard(cardsPicked[0])
                hideACard(cardsPicked[1])
                cardsPicked = []
            }
            window.setTimeout(hidePickedCards, 1000)
        }
    }
}

