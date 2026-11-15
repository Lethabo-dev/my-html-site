/**
 * PM-06 Native APIs Lab — complete each TODO, then screenshot each section.
 */

// --- 1. Geolocation ---
document.getElementById("btn-geolocation")?.addEventListener("click", () => {
  const out = document.getElementById("geo-out");

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;

      out.textContent = `Lat: ${lat}, Lng: ${lng}`;
    },
    (error) => {
      out.textContent = `Error: ${error.message}`;
    }
  );
});

// --- 2. Drag and drop ---
const dropZone = document.getElementById("drop-zone");
const dropOut = document.getElementById("drop-out");

if (dropZone) {
  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
  });

  dropZone.addEventListener("drop", (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      dropOut.textContent = `File dropped: ${file.name}`;
    } else {
      const text = e.dataTransfer.getData("text");
      dropOut.textContent = text || "Nothing was dropped.";
    }
  });
}

// --- 3. Event handling (click, input, keydown) ---
const eventInput = document.getElementById("event-input");
const eventOut = document.getElementById("event-out");
const events = [];
function logEvent(label) {
  events.unshift(label);
  if (eventOut) eventOut.textContent = events.slice(0, 5).join(" | ");
}
if (eventInput) {
  eventInput.addEventListener("input", () => {
    logEvent("Input event detected");
  });

  eventInput.addEventListener("keydown", (e) => {
    logEvent(`Key pressed: ${e.key}`);
  });
}

// --- 4. localStorage ---
document.getElementById("btn-save-name")?.addEventListener("click", () => {
  const name = document.getElementById("storage-name")?.value || "";
  const out = document.getElementById("storage-out");

  localStorage.setItem("labUserName", name);
  out.textContent = `Saved name: ${name}`;
});

// Read saved name when the page loads
const savedName = localStorage.getItem("labUserName");
const storageOut = document.getElementById("storage-out");

if (storageOut && savedName) {
  storageOut.textContent = `Saved name: ${savedName}`;
}


// --- 5. WebSocket (echo server) ---
let ws;

document.getElementById("btn-ws-send")?.addEventListener("click", () => {
  const msg = document.getElementById("ws-message")?.value || "hello";
  const out = document.getElementById("ws-out");

  out.textContent = "Connecting...";

  ws = new WebSocket("wss://ws.postman-echo.com/raw");

  ws.addEventListener("open", () => {
    ws.send(msg);
    out.textContent = "Message sent. Waiting for reply...";
  });

  ws.addEventListener("message", (event) => {
    out.textContent = `Server reply: ${event.data}`;
    ws.close();
  });

  ws.addEventListener("error", () => {
    out.textContent = "WebSocket connection error.";
  });
});

// --- 6. Web Worker ---
document.getElementById("btn-worker-run")?.addEventListener("click", () => {
  const out = document.getElementById("worker-out");

  out.textContent = "Worker: running…";

  const worker = new Worker("js/worker.js");

  worker.postMessage({ n: 10000000 });

  worker.onmessage = (event) => {
    out.textContent = `Sum from 1 to ${event.data.n}: ${event.data.sum}`;
    worker.terminate();
  };

  worker.onerror = () => {
    out.textContent = "Worker error occurred.";
    worker.terminate();
  };
});