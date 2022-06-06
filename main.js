// $ means this function is not a pure function, use with caution

function createReminderHtml$({text, complete}) {
    const remContainer = document.createElement("li");
    const textContainer = document.createElement("p");
    const completeBtn = document.createElement("button");

    textContainer.innerHTML = text;
    completeBtn.innerHTML = complete ? "check" : "uncheck";

    remContainer.appendChild(textContainer);
    remContainer.appendChild(completeBtn);

    return remContainer;
}

export {createReminderHtml$};