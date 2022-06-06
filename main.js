reminders = [
    {id: 0, text: "Write more code", complete: false},
    {id: 1, text: "Start project", complete:true},
    {id: 2, text: "Feed Rusty", complete: false}
];

// $ means this function is not a pure function, use with caution

function createReminderHtml$({text, complete}) {
    rem_container = document.createElement("li");
    text_container = document.createElement("p");
    complete_btn = document.createElement("button");

    text_container.childText = text;
    complete_btn.childText = complete ? "check" : "uncheck";

    rem_container.appendChild(text_container);
    rem_container.appendChild(complete_btn);

    return rem_container;
}