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

export {ReminderListController};