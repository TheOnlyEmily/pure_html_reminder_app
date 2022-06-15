const remCompleteEvent = new Event("remcomplete", {bubbles: true});
const remDeleteEvent = new Event("remdelete", {bubbles: true});

class RemViewBuilder {
    constructor() {
        this.buildList = [];
    }

    createNode(tag) {
        this.pushNode(document.createElement(tag));
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

    setNodeRemData(data) {
        this.buildList[this.buildList.length - 1].remData = data;
        return this;
    }

    setDispatchOnClick(funct) {
        this.buildList[this.buildList.length - 1].addEventListener("click", funct);
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
    const viewBuilder = new RemViewBuilder();

    const completeBtn = viewBuilder
        .createNode("button")
        .setNodeText(complete ? "uncheck" : "check")
        .setNodeRemData({id: id})
        .setDispatchOnClick((e) => e.target.dispatchEvent(remCompleteEvent))
        .popNode();

    const deleteBtn = viewBuilder
        .createNode("button")
        .setNodeText("delete")
        .setNodeRemData({id: id})
        .setDispatchOnClick((e) => e.target.dispatchEvent(remDeleteEvent))
        .popNode();

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
    const viewBuilder = new RemViewBuilder();
    viewBuilder.createNode("ul");
    reminderData.forEach(remObj => {
        viewBuilder.pushNode(createReminderHtml(remObj));
    });
    
    return viewBuilder.assemble().popNode();
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