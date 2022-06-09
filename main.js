const remCompleteEvent = new Event("remcomplete", {bubbles: true});
const remDeleteEvent = new Event("remdelete", {bubbles: true});

function createCompleteButton(id, complete) {
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = complete ? "uncheck" : "check";
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

class ReminderList {
    constructor() {
        this.reminders = [];
    }

    toggleComplete({id, complete}) {
        const targetIndex = this.reminders.findIndex((rem) => rem.id === id);
        this.reminders[targetIndex]["complete"] = !complete;
    }

    deleteReminder(id) {
        this.reminders = this.reminders.filter((rem) => rem.id !== id);
    }

    createReminder(text, complete=false) {
        const newRem = {id: this.reminders.length, text: text, complete: complete};
        this.reminders.push(newRem);
    }
}

export {
    createReminderListHtml, 
    ReminderList
};