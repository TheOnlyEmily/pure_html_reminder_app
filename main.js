function create_reminder_element(text) {
   let reminder = document.createElement("li");
   reminder.textContent = text;
   return reminder;
}

function place_reminder_element(reminder) {
    let parent = document.querySelector("#rem-list");
    parent.appendChild(reminder);
}


export {place_reminder_element, create_reminder_element};