const query = new URLSearchParams(window.location.search);
const iframeUrl = import.meta.env.VITE_IFRAME_URL + `${query.get("nested") === "1" ? "casinogame/" : ""}`;
document.getElementById("iframe").src = iframeUrl;
