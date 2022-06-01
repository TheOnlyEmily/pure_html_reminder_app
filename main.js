function create_reminder(text) {
   let reminder = document.createElement("li");
   reminder.textContent = text;
   return reminder;
}

function place_reminder(reminder, parent_id) {
    let parent = document.querySelector(`#${parent_id}`);
    parent.appendChild(reminder);
}

function on_reminder_submit(input_id, reminder_parent_id) {
    let text = document.querySelector(`#${input_id}`).value
    let reminder = create_reminder(text)
    place_reminder(reminder, reminder_parent_id)
}

