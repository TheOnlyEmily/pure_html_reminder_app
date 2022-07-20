import {createReminderListNode} from "./utils/create_reminder_list.js"

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

const remListSlot = document.querySelector("#rem-list");
const remSubmit = document.querySelector("#add-rem");
const remText = document.querySelector("#new-rem-text");

const reminders = new ReminderList();

const formTextGet = new FormRemTextGetter(remText);

const updateRemListView = new RemListViewUpdater(remListSlot, createReminderListNode);

const remController = new ReminderListController(updateRemListView, formTextGet, reminders);

remListSlot.addEventListener("remcomplete", (e) => remController.handleCompleteToggle(e));

remListSlot.addEventListener("remdelete", (e) => remController.handleReminderDelete(e));

remSubmit.addEventListener("click", (e) => {
    e.preventDefault();
    remController.handleReminderCreate();
});