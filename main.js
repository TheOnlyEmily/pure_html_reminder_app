const remCompleteEvent = new Event("remcomplete", {bubbles: true});
const remDeleteEvent = new Event("remdelete", {bubbles: true});

class RemButtonBuilder {
    constructor() {
        this.createNewButton();
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

class RemViewBuilder {
    constructor() {
        this.buildList = [];
    }

    createNode(tag) {
        this.buildList.push(document.createElement(tag));
        return this;
    }

    setNodeText(text) {
        this.buildList[this.buildList.length - 1].innerHTML = text;
        return this;
    }

    pushNode(node) {
        this.buildList.push(node);
        return this;
    }

    assemble() {
        const root = this.buildList.shift();
        this.buildList.forEach((node) => root.appendChild(node));
        this.buildList = [root];
        return this;
    }

    popNode() {
        return this.buildList.pop();
    }
}

function createReminderHtml({id, text, complete}) {
    const btnBuilder = new RemButtonBuilder();
    const viewBuilder = new RemViewBuilder();

    const completeBtn = btnBuilder
        .setButtonText(complete ? "uncheck" : "check")
        .setButtonRemData({id: id})
        .setDispatchOnClick((e) => e.target.dispatchEvent(remCompleteEvent))
        .getRemButton();
        
    const deleteBtn = btnBuilder
        .createNewButton()
        .setButtonText("delete")
        .setButtonRemData({id: id})
        .setDispatchOnClick((e) => e.target.dispatchEvent(remDeleteEvent))
        .getRemButton();

    const remContainer = viewBuilder
        .createNode("li")
        .createNode("p")
        .setNodeText(text)
        .pushNode(completeBtn)
        .pushNode(deleteBtn)
        .assemble()
        .popNode();

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