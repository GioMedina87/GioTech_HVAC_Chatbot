const messagesContainer = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

function addMessage(text, sender = "bot") {
    const div = document.createElement("div");
    div.classList.add("message", sender);
    div.innerHTML = text;
    messagesContainer.appendChild(div);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function getBotReply(text) {
    const lower = text.toLowerCase();

    if (lower.includes("no cooling") || lower.includes("not cooling")) {
        return "If there’s no cooling, check: 1) thermostat set to COOL & below room temp, 2) air filter not clogged, 3) outdoor unit running. If the outdoor unit is off or making a loud noise, that could be a bigger issue.";
    }

    if (lower.includes("no heat") || lower.includes("not heating")) {
        return "For no heat, check: 1) thermostat set to HEAT, 2) breaker not tripped, 3) furnace door closed fully. If you see any error code on the furnace, that helps a tech a lot.";
    }

    if (lower.includes("noise")) {
        return "Weird noises can be fans, motors, or loose panels. Is it more like grinding, squealing, rattling, or banging? Each one points to a different issue.";
    }

    if (lower.includes("thermostat")) {
        return "For thermostat problems, make sure: 1) it has power (batteries or C-wire), 2) mode and temperature are set correctly, and 3) the display doesn’t show an error. Sometimes just rebooting it helps.";
    }

    return "Got it. Thanks for the details. If you can share whether it’s cooling, heating, noise, or thermostat-related, I can narrow it down more.";
}

function handleSend() {
    const text = userInput.value.trim();
    if (!text) return;

    addMessage(text, "user");
    userInput.value = "";

    const reply = getBotReply(text);
    setTimeout(() => {
        addMessage(reply, "bot");
    }, 300);
}

sendBtn.addEventListener("click", handleSend);

userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        handleSend();
    }
});
