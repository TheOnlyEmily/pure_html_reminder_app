import {createReminderListNode} from "./utils/create_reminder_list.js"
import {ReminderList} from "./utils/rem_model.js"
import {ReminderListController} from "./utils/rem_controller.js"
import {FormRemTextGetter, RemListViewUpdater} from "./utils/list_view_managers.js"

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