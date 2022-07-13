const remCompleteEvent = new Event("remcomplete", {bubbles: true});
const remDeleteEvent = new Event("remdelete", {bubbles: true});

class RemViewBuilder {
    constructor(buildList=[]) {
        this.buildList = buildList;
    }

    getBuildList() {
        return this.buildList.length > 0 ? this.buildList.map((x) => x) : [];
    }

    createNode(tag) {
        return this.pushNode(document.createElement(tag));
    }

    setNodeText(text) {
        const currentIndex = this.getCurrentNodeIndex();
        const newBuildList = this.getBuildList();
        newBuildList[currentIndex].innerHTML = text;
        return new RemViewBuilder(newBuildList);
    }

    pushNode(node) {
        const newBuildList = this.getBuildList();
        newBuildList.push(node);
        return new RemViewBuilder(newBuildList);
    }

    pushNodes(nodes) {
        const newBuildList = this.getBuildList();
        nodes.forEach((n) => newBuildList.push(n));
        return new RemViewBuilder(newBuildList);
    }

    setNodeRemData(data) {
        const currentIndex = this.getCurrentNodeIndex();
        const newBuildList = this.getBuildList();
        newBuildList[currentIndex].remData = data;
        return new RemViewBuilder(newBuildList);
    }

    setDispatchOnClick(event) {
        const currentIndex = this.getCurrentNodeIndex();
        const newBuildList = this.getBuildList();
        newBuildList[currentIndex].addEventListener("click", (e) => e.target.dispatchEvent(event));
        return new RemViewBuilder(newBuildList);
    }

    getCurrentNodeIndex() {
        return this.buildList.length - 1;
    }

    assemble() {
        const newBuildList = this.getBuildList();
        const root = newBuildList.shift();
        newBuildList.forEach((node) => root.appendChild(node));
        return new RemViewBuilder([root]);
    }

    popNode() {
        return this.getBuildList().pop();
    }
}

function createReminderNode({id, text, complete}) {
    const viewBuilder = new RemViewBuilder();

    const completeBtn = viewBuilder
        .createNode("button")
        .setNodeText(complete ? "uncheck" : "check")
        .setNodeRemData({id: id})
        .setDispatchOnClick(remCompleteEvent)
        .popNode();

    const deleteBtn = viewBuilder
        .createNode("button")
        .setNodeText("delete")
        .setNodeRemData({id: id})
        .setDispatchOnClick(remDeleteEvent)
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

function createReminderListNode(reminderData) {
    const viewBuilder = new RemViewBuilder();
    const remNodes = reminderData.map(createReminderNode);
    return viewBuilder.createNode("ul").pushNodes(remNodes).assemble().popNode();
}

class ReminderList {
    constructor() {
        this.reminders = [];
    }

    getReminders() {
        return this.reminders.map((x) => x);
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
    constructor(nodeUpdater, newRemTextGetter, reminderModel) {
        this.nodeUpdater = nodeUpdater;
        this.reminderModel = reminderModel;
        this.newRemTextGetter = newRemTextGetter;
    }

    handleCompleteToggle(event) {
        this.reminderModel.toggleComplete(event.target.remData.id);
        this.nodeUpdater.update(this.reminderModel.getReminders());
    }

    handleReminderDelete(event) {
        this.reminderModel.deleteReminder(event.target.remData.id);
        this.nodeUpdater.update(this.reminderModel.getReminders());
    }

    handleReminderCreate() {
        const newRemText = this.newRemTextGetter.getRemText();
        if (newRemText.length > 0) {
            this.reminderModel.createReminder(newRemText);
            this.nodeUpdater.update(this.reminderModel.getReminders());
        }
    }
}

class FormRemTextGetter {
    constructor(textInput) {
        this.remTextInput = textInput;
    }

    getRemText() {
        const remText = this.remTextInput.value;
        this.remTextInput.value = '';
        return remText;
    }
}

class RemListViewUpdater {
    constructor(remListSlot, nodeListCreatFn) {
        this.remListSlot = remListSlot;
        this.nodeListCreate = nodeListCreatFn;
    }

    update(reminders) {
        const reminderListNode = this.nodeListCreate(reminders);
        this.remListSlot.replaceChildren(reminderListNode);
    }
}

export {
    RemListViewUpdater, 
    ReminderList,
    ReminderListController,
    FormRemTextGetter,
    createReminderListNode
};