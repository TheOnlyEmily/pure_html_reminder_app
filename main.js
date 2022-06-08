// $ means this function is not a pure function, use with caution

const remCompleteEvent = new Event("remcomplete", {bubbles: true});
const remDeleteEvent = new Event("remdelete", {bubbles: true});

function createCompleteButton(id, complete) {
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = complete ? "check" : "uncheck";
    completeBtn.remData = {id: id, complete: complete};
    completeBtn.addEventListener("click", function(e) {
        e.target.dispatchEvent(remCompleteEvent);
    });
    return completeBtn;
}

function createDeleteButton(id) {
    const deleteBtn = document.createElement("button");
    deleteBtn.innerHTML = "delete";
    deleteBtn.remData = {id: id};
    deleteBtn.addEventListener("click", function(e) {
        e.target.dispatchEvent(remDeleteEvent);
    });
    return deleteBtn;
}

function createReminderHtml({id, text, complete}) {
    const remContainer = document.createElement("li");
    const textContainer = document.createElement("p");
    const completeBtn = createCompleteButton(id, complete);
    const deleteBtn = createDeleteButton(id);

    textContainer.innerHTML = text;
    
    remContainer.appendChild(textContainer);
    remContainer.appendChild(completeBtn);
    remContainer.appendChild(deleteBtn);

    return remContainer;
}

function createReminderListHtml(reminderData) {
    const remList = document.createElement("ul");
    reminderData.forEach(remObj => {
        const remHtml = createReminderHtml(remObj);
        remList.appendChild(remHtml);
    });
    return remList;
}

function updateComplete(reminders, {id, complete}) {
    const targetIndex = reminders.findIndex((rem) => rem.id === id);
    reminders[targetIndex]["complete"] = !complete;
    return reminders;
}

function deleteReminder(reminders, id) {
    return reminders.filter((rem) => rem.id !== id);
}

export {createReminderListHtml, updateComplete, deleteReminder};