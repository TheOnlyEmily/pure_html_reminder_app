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

export {FormRemTextGetter, RemListViewUpdater};