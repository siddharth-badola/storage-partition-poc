import "./style.css";
const channel = new BroadcastChannel("casino-channel");
const openedTabs = [];
const STORAGE_KEY = "messages";

const log = (msg) => {
  const li = document.createElement("li");
  li.textContent = msg;
  document.getElementById("log").appendChild(li);
};

const logLs = (msg) => {
  const li = document.createElement("li");
  li.textContent = msg;
  document.getElementById("log-ls").appendChild(li);
};

// Handle incoming messages from game tabs
channel.onmessage = (event) => {
  const { type, clientId } = event.data;

  if (type === "register") {
    log(`Registered game tab: ${clientId}`);
    openedTabs.push({ clientId });
  } else if (type === "unregister") {
    log(`Unregistered game tab: ${clientId}`);
  }
};

window.addEventListener("storage", (event) => {
  if (!event.newValue) return;
  const { type, clientId } = JSON.parse(event.newValue) ?? {};
  if (type === "register") {
    logLs(`Registered game tab: ${clientId}`);
  } else if (type === "unregister") {
    logLs(`Unregistered game tab: ${clientId}`);
  }
});

// Open new tab
document.getElementById("open-tab").onclick = () => {
  const win = window.open("/casinoGame/", "_blank", "width=800,height=600");
};

// Broadcast message to all game tabs
document.getElementById("broadcast-msg").onclick = () => {
  channel.postMessage({
    type: "broadcast",
    payload: `🎲 Game update at ${new Date().toLocaleTimeString()}`,
  });
};

document.getElementById("ls-msg").onclick = () => {
  localStorage.setItem(STORAGE_KEY, null);
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ type: "ls", payload: `🎲 Game update at ${new Date().toLocaleTimeString()}` }));
};
