const channel = new BroadcastChannel("casino-channel");
const clientId = `client-${Math.random().toString(36).slice(2, 9)}`;
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

// Register this tab with the lobby
channel.postMessage({ type: "register", clientId });
window.localStorage.setItem(STORAGE_KEY, null);
window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ type: "register", clientId }));

// Listen for broadcast messages
channel.onmessage = (event) => {
  const { type, payload } = event.data;
  if (type === "broadcast") {
    log(`📢 Received: ${payload}`);
  }
};

// Unregister on close
window.addEventListener("beforeunload", () => {
  channel.postMessage({ type: "unregister", clientId });
  localStorage.setItem(STORAGE_KEY, null);
  localStorage.setItem(STORAGE_KEY, JSON.stringify({ type: "unregister", clientId }));
});

window.addEventListener("storage", (event) => {
  console.log(event);
  if (!event.newValue) return;
  const { type, payload } = JSON.parse(event.newValue) ?? {};
  if (type === "ls") {
    logLs(`📦 Local Storage Update: ${payload}`);
  }
});
