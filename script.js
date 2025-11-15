const messagesContainer = document.getElementById("chat-messages");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const micBtn = document.getElementById("mic-btn");
const typingIndicator = document.getElementById("typing-indicator");
const chips = document.querySelectorAll(".chip");

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

    // simple category flags
    const cooling = lower.includes("no cooling") || lower.includes("not cooling") || lower.includes("warm air");
    const heat = lower.includes("no heat") || lower.includes("not heating") || lower.includes("cold air");
    const noise = lower.includes("noise") || lower.includes("loud") || lower.includes("bang") || lower.includes("rattle") || lower.includes("squeal");
    const thermostat = lower.includes("thermostat") || lower.includes("stat");

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

    if (noise) {
        return `
<b>Noise checklist 🎧</b><br>
What does it sound like?<br>
• <b>Rattling</b> – loose panels, screws, or something in the blower housing.<br>
• <b>Squealing</b> – older belt drive blower or motor bearings starting to fail.<br>
• <b>Banging/Thumping</b> – something stuck in the blower or a serious mechanical issue.<br>
• <b>Hissing</b> – possible refrigerant leak or air leak at duct/connection.<br><br>
If you tell me which one it sounds like and whether it’s at the indoor or outdoor unit, I can give more specific advice.
        `;
    }

    if (thermostat) {
        return `
<b>Thermostat checklist 📟</b><br>
1. If it uses batteries, replace them with fresh ones just to rule that out.<br>
2. Verify the <b>mode</b> (COOL/HEAT) and setpoint are correct.<br>
3. If it’s a smart thermostat, try a quick <b>reboot</b> from the menu or by pulling it off the base (if the model allows it).<br>
4. Check if other parts of the system are working – fan only, heat vs cool – that helps narrow down if it’s the stat or the equipment.<br><br>
Tell me what brand/model you have (Nest, Ecobee, Honeywell, etc.) and what’s shown on the screen.
        `;
    }

    if (lower.includes("filter")) {
        return `
Good call checking the filter. 👌<br>
If the filter is really dirty, change it and run the system again. A clogged filter can cause:<br>
• Weak airflow<br>
• Coils freezing up<br>
• High temperature or pressure trips<br><br>
After you change it, let the system run 15–20 minutes and tell me if airflow improves.
        `;
    }

    if (lower.includes("frozen") || lower.includes("ice")) {
        return `
<b>Frozen coil / ice detected 🧊</b><br>
1. Turn the thermostat to <b>OFF</b> for cooling and set the <b>fan to ON</b> – let it thaw completely (can take 2–4 hours).<br>
2. Check the <b>filter</b> and supply/return vents to make sure nothing is blocked.<br>
3. If it freezes again quickly, that usually points to <b>low airflow</b> or <b>low refrigerant charge</b> – that’s when you call a tech.<br>
        `;
    }

    if (lower.includes("short cycle") || lower.includes("turns on and off")) {
        return `
<b>Short cycling (turns on and off a lot) 🔁</b><br>
Common causes:<br>
• <b>Dirty filter</b> or restricted airflow<br>
• Thermostat in a bad location (over a supply vent, near a heat source)<br>
• Oversized equipment<br>
• Safety switches tripping<br><br>
Try changing the filter and make sure the thermostat isn’t right over a vent. If it still short cycles, that’s usually a job for a tech to diagnose.
        `;
    }

    return `
I got your message. 👍<br>
Right now I focus on common HVAC issues like:<br>
• No cooling / warm air<br>
• No heat<br>
• Weird noises<br>
• Thermostat problems<br>
• Frozen coil / ice<br><br>
If you tell me which of those fits your situation best (or describe it again with a bit more detail), I’ll walk you through a checklist.
    `;
}

// ===== typing indicator helpers =====
function showTyping() {
    typingIndicator.classList.remove("hidden");
}

function hideTyping() {
    typingIndicator.classList.add("hidden");
}

// ===== main flow =====
function handleUserMessage(text) {
    if (!text.trim()) return;

    // user message
    addMessage(text.trim(), "user");
    userInput.value = "";

    // bot typing + delayed response
    showTyping();
    const reply = getBotReply(text);

    setTimeout(() => {
        hideTyping();
        addMessage(reply, "bot");
    }, 550); // feels like a real pause
}

function handleSend() {
    const text = userInput.value;
    handleUserMessage(text);
}

// ===== event listeners =====
sendBtn.addEventListener("click", handleSend);

userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        handleSend();
    }
});

// quick-action chips
chips.forEach(chip => {
    chip.addEventListener("click", () => {
        const preset = chip.getAttribute("data-text");
        handleUserMessage(preset);
    });
});

// ===== Voice input (Web Speech API) =====
let recognition;
if ("webkitSpeechRecognition" in window || "SpeechRecognition" in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.addEventListener("result", (event) => {
        const transcript = event.results[0][0].transcript;
        userInput.value = transcript;
        handleSend();
    });

    recognition.addEventListener("error", () => {
        // You can show a small message if you ever want.
    });
} else {
    // If not supported, visually soften mic button
    micBtn.style.opacity = "0.4";
    micBtn.style.cursor = "not-allowed";
}

micBtn.addEventListener("click", () => {
    if (!recognition) return;
    recognition.start();
});
