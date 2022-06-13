const remCompleteEvent = new Event("remcomplete", {bubbles: true});
const remDeleteEvent = new Event("remdelete", {bubbles: true});

class RemButtonBuilder {
    constructor(btnNode=null) {
        this.btnNode = btnNode;
    }

    createNewButton() {
        this.btnNode = document.createElement("button");
        return this;
    }

    setButtonText(text) {
        this.btnNode.innerHTML = text;
        return this;
    }

    setButtonRemData(remData) {
        this.btnNode.remData = remData;
        return this;
    }

    setDispatchOnClick(funct) {
        this.btnNode.addEventListener("click", funct);
        return this;
    }

    getRemButton() {
        return this.btnNode;
    }
}

function createCompleteButton(id, complete) {
    const completeBtn = document.createElement("button");
    completeBtn.innerHTML = complete ? "uncheck" : "check";
    completeBtn.remData = {id: id};
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

    toggleComplete(id) {
        const targetIndex = this.reminders.findIndex((rem) => rem.id === id);
        this.reminders[targetIndex]["complete"] = !this.reminders[targetIndex]["complete"];
    }

    deleteReminder(id) {
        this.reminders = this.reminders.filter((rem) => rem.id !== id);
    }

    createReminder(text, complete=false) {
        const newRem = {id: this.reminders.length, text: text, complete: complete};
        this.reminders.push(newRem);
    }
}

class ReminderListController {
    constructor(htmlUpdate, reminderModel){
        this.htmlUpdate = htmlUpdate;
        this.reminderModel = reminderModel;
    }

    handleCompleteToggle(event) {
        this.reminderModel.toggleComplete(event.target.remData.id);
        this.htmlUpdate(this.reminderModel.reminders);
    }

    handleReminderDelete(event) {
        this.reminderModel.deleteReminder(event.target.remData.id);
        this.htmlUpdate(this.reminderModel.reminders);
    }

    handleReminderCreate(event) {
        event.preventDefault();
        const newRemText = document.querySelector("input[type='text']").value;
        document.querySelector("input[type='text']").value = '';
         if (newRemText.length > 0) {
            this.reminderModel.createReminder(newRemText);
            this.htmlUpdate(this.reminderModel.reminders);
        }
    }
}

function updateReminderListView(reminders) {
    const reminderListHtml = createReminderListHtml(reminders);
    if (document.querySelector("ul") === null) {
        const remList = document.createElement("ul");
        document.querySelector("div").appendChild(remList);
    }
    document.querySelector("ul").replaceWith(reminderListHtml);
}

export {
    updateReminderListView, 
    ReminderList,
    ReminderListController
};