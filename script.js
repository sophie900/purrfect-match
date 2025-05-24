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

// Hides an element
function toggle(element_id) {
    card = document.getElementById(element_id);
    // card.style.opacity = "0";
    card.style.display = "none";
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
