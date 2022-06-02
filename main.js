function create_reminder(text) {
   let reminder = document.createElement("li");
   reminder.textContent = text;
   return reminder;
}

function place_reminder(reminder) {
    let parent = document.querySelector("#rem-list");
    parent.appendChild(reminder);
}

export {create_reminder, place_reminder};