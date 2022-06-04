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

function createReminderHtml(reminder) {
    let reminderHtml = document.createElement("li");
    reminderHtml.textContent = reminder.text;
    reminderHtml.style.color = reminder.completed ? "green" : "red";
    
    const completeBtn = document.createElement("button");
    completeBtn.textContent = reminder.completed ? "complete" : "uncomplete";
    completeBtn.addEventListener("click", function() {
        reminder.toggleCompleted();
        completeBtn.textContent = reminder.completed ? "complete" : "uncomplete";
        reminderHtml.style.color = reminder.completed ? "green" : "red";
    });

    reminderHtml.appendChild(completeBtn);
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