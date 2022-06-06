class Reminder {
    constructor(text, completed=false) {
        this.text = text;
        this.completed = completed
    }
    
    updateText(newText) {
        this.text = newText;
    }

    toggleCompleted() {
        this.completed = !this.completed;
    }
}

class CompleteBtn {
    constructor(reminder){
        this.reminder = reminder;
        this.html = document.createElement("button");
        this.html.textContent = this.getTextContent(this.reminder.completed);
        this.html.addEventListener("click", this.onClick);
    }

    getTextContent(reminderComplete) {
        return reminderComplete ? "complete" : "not complete";
    }

    onClick() {
        this.reminder.toggleCompleted();
        this.html.textContent = this.getTextContent(this.reminder.completed);
    }
}



function createReminderHtml(reminder) {
    let reminderHtml = document.createElement("li");
    reminderHtml.textContent = reminder.text;
    reminderHtml.style.color = reminder.completed ? "green" : "red";

    const completeBtn = new CompleteBtn(reminder);
    reminderHtml.appendChild(completeBtn.html);
    return reminderHtml;
}

function createReminderListHtml(reminders) {
    const reminderListHtml = document.createElement("ul");
    reminders.forEach(element => {
        let reminderHtml = createReminderHtml(element);
        reminderListHtml.appendChild(reminderHtml);
    });
    return reminderListHtml;
}

export {Reminder, createReminderHtml, createReminderListHtml};