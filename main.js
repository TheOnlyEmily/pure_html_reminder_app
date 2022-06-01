function create_reminder(text) {
   let reminder = document.createElement("li");
   reminder.textContent = text;
   return reminder;
}

function place_reminder(reminder, parent_id) {
    let parent = document.querySelector(`#${parent_id}`);
    parent.appendChild(reminder);
}

let reminder = create_reminder("Add more code");
place_reminder(reminder, "reminder-list");