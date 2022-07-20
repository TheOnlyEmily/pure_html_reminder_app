import {remCompleteEvent, remDeleteEvent} from "./rem_events.js"
import {RemViewBuilder} from "./rem_view_builder.js"

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

export {createReminderListNode};