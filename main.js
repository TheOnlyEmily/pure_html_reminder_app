// $ means this function is not a pure function, use with caution

function createReminderHtml$({text, complete}) {
    const rem_container = document.createElement("li");
    const text_container = document.createElement("p");
    const complete_btn = document.createElement("button");

    text_container.childText = text;
    complete_btn.childText = complete ? "check" : "uncheck";

    rem_container.appendChild(text_container);
    rem_container.appendChild(complete_btn);

    return rem_container;
}

export {createReminderHtml$};