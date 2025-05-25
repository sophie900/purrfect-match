var current_id = 1;
var max_id = 10;
var cards = [];
var liked = [];

function rotate(element_id, direction) {
    card = document.getElementById(element_id);
    if (direction == "left") {
        card.style.rotate(-10);
    } else {
        card.style.rotate(10);
    }
}

// Rotates an element left, with a slight leftward translation
function rotateLeft(element_id) {
    card = document.getElementById(element_id);
    card.style.transform = "rotate(-5deg) translate(-20px)";
}

// Rotates an element right, with a slight rightward translation
function rotateRight(element_id) {
    card = document.getElementById(element_id);
    card.style.transform = "rotate(5deg) translate(20px)";
}

// Resets an element's rotation to its initial position
function resetRotation(element_id) {
    card = document.getElementById(element_id);
    card.style.transform = "rotate(0deg)";
}

// Updates and makes card reappear after it fades out
function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
async function executeAfterTimer(card) {
    await delay(1000);
    updateCard(); // Update card
    card.style.opacity = "1"; // Make card reappear
}

// Fades current card element
function toggle(element_id) {
    card = document.getElementById(element_id);
    card.style.opacity = "0"; // Make card disappear

    executeAfterTimer(card);
}

// Update information on card to the next cat's data
function updateCard() {
    fetch(`http://127.0.0.1:5000/data/${current_id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data["name"]);
            if (current_id <= max_id) {
                generateCard(
                    data["name"],
                    data["age"],
                    data["breed"],
                    data["gender"],
                    data["photo"]
                );
            } else {
                generateCard(
                    "No more cats to display!",
                    "None",
                    "None",
                    "None",
                    ""
                );
            }
            current_id++;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}

// Generates the information on the card
function generateCard(name, age, breed, gender, photo) {
    const card = document.getElementById("current-card");
    const likes = document.getElementById("liked-cards");

    html_string = `
    <h1>${name}</h1>
    <h2><img src="${photo}" alt="No image available" width="250"/></a></li></h2>
    <h3>Breed: ${breed}</h3>
    <h4>Gender: ${gender}</h4>
    <h5>Age: ${age}</h5>
    <div id="data-container"></div>
    `;

    card.innerHTML = html_string;
    cards.push(html_string);

    if (liked[current_id - 2]) {
        likes.innerHTML += cards[current_id - 2];
    }
}

// When buttons are hovered, the card should rotate
function configureButtons(element_id) {
    const leftSwipeButton = document.getElementById("left-swipe-button");

    leftSwipeButton.addEventListener("mouseover", () => rotateLeft(element_id));
    leftSwipeButton.addEventListener("mouseout", () =>
        resetRotation(element_id)
    );
    leftSwipeButton.addEventListener("click", () => 
        liked.push(false)
    );

    const rightSwipeButton = document.getElementById("right-swipe-button");

    rightSwipeButton.addEventListener("mouseover", () =>
        rotateRight(element_id)
    );
    rightSwipeButton.addEventListener("mouseout", () =>
        resetRotation(element_id)
    );
    rightSwipeButton.addEventListener("click", () => 
        liked.push(true)
    );
}
configureButtons("current-card");

// Update card to first card on page load
updateCard();
