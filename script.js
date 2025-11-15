const messagesContainer = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const micBtn = document.getElementById("mic-btn");
const micFab = document.getElementById("mic-fab");
const typingIndicator = document.getElementById("typing-indicator");
const chips = document.querySelectorAll(".chip");
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle ? themeToggle.querySelector(".theme-icon") : null;

// ===== helper to add messages =====
function addMessage(text, sender = "bot") {
    const wrapper = document.createElement("div");
    wrapper.classList.add("message", sender);

    const meta = document.createElement("div");
    meta.classList.add("meta");

    const avatar = document.createElement("span");
    avatar.classList.add("avatar-circle");
    avatar.textContent = sender === "bot" ? "🤖" : "🧑";

    const name = document.createElement("span");
    name.classList.add("name");
    name.textContent = sender === "bot" ? "GioTech Bot" : "You";

    meta.appendChild(avatar);
    meta.appendChild(name);

    const bubble = document.createElement("div");
    bubble.classList.add("bubble");
    bubble.innerHTML = text;

    wrapper.appendChild(meta);
    wrapper.appendChild(bubble);

    messagesContainer.appendChild(wrapper);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// ===== bot logic =====
function getBotReply(text) {
    const lower = text.toLowerCase();

    const cooling =
        lower.includes("no cooling") ||
        lower.includes("not cooling") ||
        lower.includes("warm air");

    const heat =
        lower.includes("no heat") ||
        lower.includes("not heating") ||
        lower.includes("cold air");

    const noise =
        lower.includes("noise") ||
        lower.includes("loud") ||
        lower.includes("bang") ||
        lower.includes("rattle") ||
        lower.includes("squeal");

    const thermostat =
        lower.includes("thermostat") ||
        lower.includes("stat");

    if (cooling) {
        return `
<b>No cooling checklist 🧊</b><br>
1. Make sure the thermostat is set to <b>COOL</b> and the setpoint is <b>below</b> room temperature.<br>
2. Check the <b>air filter</b> — if it’s really dirty, the system can freeze up or lose cooling.<br>
3. Go outside and see if the <b>condenser fan</b> is running and blowing warm air out the top.<br>
4. Look for <b>ice on the copper lines or indoor coil</b>. If you see ice, turn system <b>OFF</b> and leave the fan ON to thaw.<br><br>
If you tell me if the outdoor unit is running or if you see ice, I can narrow it down more.
        `;
    }

    if (heat) {
        return `
<b>No heat checklist 🔥</b><br>
1. Set the thermostat to <b>HEAT</b> and raise the temperature 3–5°F above room temp.<br>
2. Check the <b>furnace switch</b> (looks like a light switch near the unit) and the <b>breaker</b> in the panel.<br>
3. Make sure the <b>furnace door/panel</b> is fully closed – many furnaces have a door switch.<br>
4. Look through the small window for a <b>blinking light or error code</b> on the control board.<br><br>
If you can tell me whether the blower turns on or if you see an error light, I can help you further.
        `;
    }

