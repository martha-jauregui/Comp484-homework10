// --- Message Logging Examples (Global/Initial) ---
console.info("Giga Pet App initialized successfully."); // Log Info
console.log("%c MOCHI STATUS UPDATED ", "color: white; background: #4CAF50; font-weight: bold;"); // Log Custom
window.addEventListener('touchstart', function() {}, {passive: false});

$(function() { 
    // Requirement: Initialize the pet's information in the HTML
    checkAndUpdatePetInfoInHtml("Welcome! I'm ready to hang out!");
  
    // Log Group: Cluster your initial setup logs
    console.group("Initial Setup");
    console.log("Checking buttons...");
    console.log("Checking audio...");
    console.groupEnd(); // Log Group

    
    $('.treat-button').click(clickedTreatButton);
    $('.play-button').click(clickedPlayButton);
    $('.exercise-button').click(clickedExerciseButton);
    $('.nap-button').click(clickedNapButton);

    // Cause 404 Network Error (For assignment screenshot)
    let errorImg = new Image();
    errorImg.src = "images/missing-asset.png";

});

// Requirement: Create pet_info object with name, weight, and happiness
var pet_info = {name: "Mochi", weight: 15, happiness: 10};

function clickedTreatButton() {
    $('.pet-image').fadeOut(100).fadeIn(100);
    $('#munch-sound').get(0).play();

    // Requirement: Add to happiness and weight 
    pet_info.happiness += 5;
    pet_info.weight += 2;

    // Log Table: Show pet stats in a grid every time they get a treat
    console.table(pet_info);

    checkAndUpdatePetInfoInHtml("Yum! That treat was delicious!");
}

function clickedPlayButton() {
    // Requirement: Add to happiness and reduce weight 
     $('.pet-image').fadeOut(100).fadeIn(100);
    pet_info.happiness += 10;
    pet_info.weight -= 5;
    checkAndUpdatePetInfoInHtml("I love playing with you!");
}

function clickedExerciseButton() {
    // Requirement: Reduce happiness and weight 
    $('.pet-image').fadeOut(100).fadeIn(100);
    pet_info.happiness -= 5;
    pet_info.weight -= 5;
    checkAndUpdatePetInfoInHtml("Whew! That was a ruff workout.");
}

function clickedNapButton() { 
    // Requirement: Add a new action and behavior 
     $('.pet-image').fadeOut(100).fadeIn(100);
    pet_info.happiness += 2;
    checkAndUpdatePetInfoInHtml("Zzz... I feel refreshed.");
}

function checkAndUpdatePetInfoInHtml(comment) {
    checkWeightAndHappinessBeforeUpdating();  
    updatePetInfoInHtml(comment);
}

function checkWeightAndHappinessBeforeUpdating() {
    // Requirement: Fix bugs so values can't go below zero 
   // Log Warning: If weight gets too low
    if (pet_info.weight < 5) {
        console.warn("Warning: Mochi's weight is very low!"); // Log Warning
    }
   
    if (pet_info.weight < 0) {
        pet_info.weight = 0;
        console.error("Error: Weight attempted to go below zero!"); // Log Error
    }

    if (pet_info.happiness < 0) {
        pet_info.happiness = 0;
    }

    // Cause TypeError: Trying to call a non-existent function
    try {
        if (pet_info.happiness > 100) {
            pet_info.doMagicDance(); // This will cause a TypeError
        }
    } catch (e) {
        console.error("Caught a expected TypeError as required:", e);
    }
}

function updatePetInfoInHtml(comment) {
    $('.name').text(pet_info['name']);
    $('.weight').text(pet_info['weight']);
    $('.happiness').text(pet_info['happiness']);
    
    /* UNIQUE METHOD 1: .slideToggle()
       This animates the element's height. We hide the text first
       then slide it in so the visual notification appears without an alert
    */
    $('#pet-comment').hide().text(comment).slideToggle(300);

    /* UNIQUE METHOD 2: .width()
       This sets the width of the element. We use it to make the 
       image size change based on the pet's weight property.
    */
    var dynamicWidth = 150 + (pet_info.weight * 2);
    $('.pet-image').width(dynamicWidth);
}