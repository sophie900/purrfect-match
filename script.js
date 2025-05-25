var current_id = 5;

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

// Fades current card element
function toggle(element_id) {
    card = document.getElementById(element_id);
    // card.style.opacity = "0";
    // card.style.display = "none";
    let op = 1; // initial opacity
    var timer = setInterval(function () {
        if (op <= 0.005) {
            clearInterval(timer);
            // card.style.display = "none";
            card.style.opacity = 1;
        }
        card.style.opacity = op;
        card.style.filter = "alpha(opacity=" + op * 100 + ")";
        op -= op * 0.25;
    }, 50);

    // generate new card information and then make it reappear
    var timer1 = setInterval(function () {
        if (op >= 1) {
            clearInterval(timer1);
        }
        card.style.opacity = op;
        card.style.filter = "alpha(opacity=" + op * 100 + ")";
        op += op * 0.25;
    }, 50);
}

function fetchData() {
    fetch(`http://127.0.0.1:5000/data/${current_id}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            generateCard(data);
            current_id++;
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
        });
}
fetchData();

// Generates card information
function generateCard(data) {
    const dataContainer = document.getElementById("data-container");
    dataContainer.innerHTML = "";
    data.forEach((item) => {
        const dataItem = document.createElement("div");
        dataItem.classList.add("data-item");
        dataItem.textContent = `${item.id}\n${item.photo}\nBreed: ${item.breed}\nGender: ${item.gender}\nAge: ${item.age}`;
        dataContainer.appendChild(dataItem);
    });
}

// When buttons are hovered, the card should rotate
function configureButtons(element_id) {
    const leftSwipeButton = document.getElementById("left-swipe-button");

    leftSwipeButton.addEventListener("mouseover", () => rotateLeft(element_id));
    leftSwipeButton.addEventListener("mouseout", () =>
        resetRotation(element_id)
    );

    const rightSwipeButton = document.getElementById("right-swipe-button");

    rightSwipeButton.addEventListener("mouseover", () =>
        rotateRight(element_id)
    );
    rightSwipeButton.addEventListener("mouseout", () =>
        resetRotation(element_id)
    );
}
configureButtons("current-card");
