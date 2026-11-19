// ==========================================
// QR STUDIO - MAIN APPLICATION
// ==========================================

const $ = (id) => document.getElementById(id);

const qrType = $("qrType");
const dynamicFields = $("dynamicFields");
const qrCanvas = $("qrCanvas");
const emptyState = $("emptyState");
const statusMessage = $("statusMessage");
const logoInput = $("logoInput");
const logoLabel = $("logoLabel");
const removeLogo = $("removeLogo");
const foreground = $("foreground");
const background = $("background");
const qrSize = $("qrSize");
const errorLevel = $("errorLevel");
const historyList = $("historyList");
const toast = $("toast");

let logoData = null;
let generatedPayload = "";
let generated = false;
let generationVersion = 0;
let toastTimer = null;

// ==========================================
// DYNAMIC INPUT FIELDS
// ==========================================

const fieldTemplates = {
  url: `
    <label class="field-label" for="content">WEBSITE URL</label>
    <input class="text-control" id="content"
      placeholder="https://example.com"
      type="url" autocomplete="url">
  `,

  text: `
    <label class="field-label" for="content">YOUR TEXT</label>
    <textarea class="text-control textarea" id="content"
      placeholder="Enter your message..."></textarea>
  `,

  phone: `
    <label class="field-label" for="content">PHONE NUMBER</label>
    <input class="text-control" id="content"
      placeholder="+358 40 123 4567" type="tel">
  `,

  email: `
    <label class="field-label" for="emailTo">EMAIL ADDRESS</label>
    <input class="text-control" id="emailTo"
      type="email" placeholder="hello@example.com">

    <label class="field-label" for="emailSubject">SUBJECT</label>
    <input class="text-control" id="emailSubject"
      placeholder="Hello!">

    <label class="field-label" for="emailBody">MESSAGE</label>
    <textarea class="text-control textarea" id="emailBody"
      placeholder="Write your message..."></textarea>
  `,

  sms: `
    <label class="field-label" for="smsNumber">PHONE NUMBER</label>
    <input class="text-control" id="smsNumber"
      type="tel" placeholder="+358 40 123 4567">

    <label class="field-label" for="smsMessage">MESSAGE</label>
    <textarea class="text-control textarea" id="smsMessage"
      placeholder="Your message..."></textarea>
  `,

  wifi: `
    <label class="field-label" for="wifiName">NETWORK NAME (SSID)</label>
    <input class="text-control" id="wifiName"
      placeholder="My Wi-Fi Network">

    <label class="field-label" for="wifiPassword">PASSWORD</label>
    <input class="text-control" id="wifiPassword"
      type="password" placeholder="Wi-Fi password">

    <label class="field-label" for="wifiSecurity">SECURITY</label>
    <select class="select-control" id="wifiSecurity">
      <option value="WPA">WPA / WPA2 / WPA3</option>
      <option value="WEP">WEP</option>
      <option value="nopass">No password</option>
    </select>

    <label style="display:flex;align-items:center;gap:9px;margin-top:15px;color:#aaa8b8;font-size:12px;">
      <input type="checkbox" id="wifiHidden">
      Hidden network
    </label>
  `
};

function renderFields() {
  dynamicFields.innerHTML = fieldTemplates[qrType.value];
  updateQR();
}

function readFields() {
  const type = qrType.value;
  const get = (id) => $(id)?.value.trim() || "";

  switch (type) {
    case "url": {
      let url = get("content");

      if (!url) return null;

      if (!/^[a-z][a-z0-9+.-]*:/i.test(url)) {
        url = "https://" + url;
      }

      return {
        payload: url,
        label: url,
        fields: { content: get("content") }
      };
    }

    case "text": {
      const content = get("content");
      if (!content) return null;

      return {
        payload: content,
        label: content,
        fields: { content }
      };
    }

    case "phone": {
      const phone = get("content");
      if (!phone) return null;

      return {
        payload: "tel:" + phone,
        label: phone,
        fields: { content: phone }
      };
    }

    case "email": {
      const to = get("emailTo");
      const subject = get("emailSubject");
      const body = get("emailBody");

      if (!to) return null;

      const payload =
        "mailto:" + to +
        "?subject=" + encodeURIComponent(subject) +
        "&body=" + encodeURIComponent(body);

      return {
        payload,
        label: to,
        fields: {
          emailTo: to,
          emailSubject: subject,
          emailBody: body
        }
      };
    }

    case "sms": {
      const number = get("smsNumber");
      const message = get("smsMessage");

      if (!number) return null;

      const payload = "SMSTO:" + number + ":" + message;

      return {
        payload,
        label: number,
        fields: {
          smsNumber: number,
          smsMessage: message
        }
      };
    }

    case "wifi": {
      const ssid = get("wifiName");
      const password = get("wifiPassword");
      const security = get("wifiSecurity");
      const hidden = $("wifiHidden")?.checked || false;

      if (!ssid) return null;

      if (security !== "nopass" && !password) {
        return null;
      }

      const escapeWifi = (value) =>
        value.replace(/([\\;,:"])/g, "\\$1");

      const payload =
        "WIFI:T:" + security +
        ";S:" + escapeWifi(ssid) +
        ";P:" + escapeWifi(password) +
        ";H:" + hidden +
        ";;";

      return {
        payload,
        label: ssid,
        fields: {
          wifiName: ssid,
          wifiPassword: password,
          wifiSecurity: security,
          wifiHidden: hidden
        }
      };
    }

    default:
      return null;
  }
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2500);
}

// ==========================================
// QR GENERATION
// ==========================================

function drawRoundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.roundRect(x, y, width, height, radius);
  ctx.fill();
}

function loadImage(source) {
  return new Promise((resolve, reject) => {
    const image = new Image();

    image.onload = () => resolve(image);
    image.onerror = reject;
    image.src = source;
  });
}

async function drawLogo(canvas, source, size) {
  const image = await loadImage(source);
  const ctx = canvas.getContext("2d");

  const logoSize = size * 0.19;
  const padding = size * 0.035;
  const totalSize = logoSize + padding * 2;

  const x = (size - totalSize) / 2;
  const y = (size - totalSize) / 2;

  ctx.fillStyle = "#ffffff";
  drawRoundedRect(ctx, x, y, totalSize, totalSize, size * 0.035);

  ctx.save();

  ctx.beginPath();
  ctx.roundRect(
    x + padding,
    y + padding,
    logoSize,
    logoSize,
    size * 0.025
  );

  ctx.clip();

  const scale = Math.min(
    logoSize / image.width,
    logoSize / image.height
  );

  const width = image.width * scale;
  const height = image.height * scale;

  ctx.drawImage(
    image,
    x + padding + (logoSize - width) / 2,
    y + padding + (logoSize - height) / 2,
    width,
    height
  );

  ctx.restore();
}

async function updateQR() {
  const version = ++generationVersion;
  const data = readFields();

  if (!data) {
    generated = false;
    generatedPayload = "";

    qrCanvas.style.display = "none";
    emptyState.style.display = "flex";

    statusMessage.textContent =
      qrType.value === "wifi" && $("wifiName")?.value.trim()
        ? "Enter a password or choose an open network."
        : "Enter content to generate your QR code.";

    return;
  }

  const size = Number(qrSize.value);
  const correction = logoData ? "H" : errorLevel.value;

  try {
    await QRCode.toCanvas(qrCanvas, data.payload, {
      width: size,
      margin: 2,
      errorCorrectionLevel: correction,
      color: {
        dark: foreground.value,
        light: background.value
      }
    });

    if (logoData) {
      await drawLogo(qrCanvas, logoData, size);
    }

    if (version !== generationVersion) return;

    generated = true;
    generatedPayload = data.payload;

    qrCanvas.style.display = "block";
    emptyState.style.display = "none";

    statusMessage.textContent = "✓ Your QR code is ready!";

    $("previewSize").textContent = `${size} × ${size}`;
    $("previewError").textContent = correction;

    $("downloadPng").disabled = false;
    $("downloadSvg").disabled = false;

    if (qrType.value !== "wifi") {   saveHistory(data); }

  } catch (error) {
    if (version !== generationVersion) return;

    generated = false;
    qrCanvas.style.display = "none";
    emptyState.style.display = "flex";

    statusMessage.textContent =
      "Unable to generate QR code. Check your input.";

    $("downloadPng").disabled = true;
    $("downloadSvg").disabled = true;

    console.error("QR generation error:", error);
  }
}

// ==========================================
// QR HISTORY
// ==========================================

const HISTORY_KEY = "qr-studio-history";

function getHistory() {
  try {
    const history = JSON.parse(
      localStorage.getItem(HISTORY_KEY) || "[]"
    );

    return Array.isArray(history) ? history : [];
  } catch {
    return [];
  }
}

function saveHistory(data) {
  const entry = {
    id: Date.now(),
    type: qrType.value,
    label: data.label,
    payload: data.payload,
    fields: data.fields,
    foreground: foreground.value,
    background: background.value,
    size: Number(qrSize.value),
    correction: errorLevel.value
  };

  let history = getHistory();

  // Avoid duplicate entries for the same QR type and content.
  history = history.filter(
    item =>
      !(item.type === entry.type &&
        item.payload === entry.payload)
  );

  history.unshift(entry);

  // Keep only the latest 12 creations.
  history = history.slice(0, 12);

  try {
    localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
    renderHistory();
  } catch {
    showToast("Browser storage is full. Clear some history.");
  }
}

async function renderHistory() {
  const history = getHistory();

  if (!history.length) {
    historyList.innerHTML =
      '<div class="history-empty">Your saved QR codes will appear here.</div>';
    return;
  }

  historyList.innerHTML = history.map(item => `
    <article class="history-card">
      <canvas id="history-${item.id}"></canvas>
      <h4>${escapeHTML(item.label)}</h4>
      <p>${escapeHTML(item.type.toUpperCase())}</p>
      <div class="history-actions">
        <button data-action="load" data-id="${item.id}">
          Load
        </button>
        <button data-action="download" data-id="${item.id}">
          PNG ↓
        </button>
      </div>
    </article>
  `).join("");

  for (const item of history) {
    const canvas = $(`history-${item.id}`);
    if (!canvas) continue;

    try {
      await QRCode.toCanvas(canvas, item.payload, {
        width: 100,
        margin: 1,
        errorCorrectionLevel: item.correction || "H",
        color: {
          dark: item.foreground || "#111111",
          light: item.background || "#ffffff"
        }
      });
    } catch (error) {
      console.warn("History preview failed:", error);
    }
  }
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

// ==========================================
// LOAD HISTORY ENTRY
// ==========================================

function loadHistoryEntry(item) {
  qrType.value = item.type;
  renderFields();

  for (const [key, value] of Object.entries(item.fields || {})) {
    const field = $(key);
    if (!field) continue;

    if (field.type === "checkbox") {
      field.checked = Boolean(value);
    } else {
      field.value = value;
    }
  }

  foreground.value = item.foreground;
  background.value = item.background;
  qrSize.value = item.size;
  errorLevel.value = item.correction || "H";

  updateColorLabels();
  updateSizeLabel();

  // Logo uploads are deliberately not persisted.
  logoData = null;
  logoInput.value = "";
  logoLabel.textContent = "Upload your logo";
  removeLogo.classList.add("hidden");

  updateQR();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  showToast("QR code loaded!");
}

// ==========================================
// DOWNLOAD PNG
// ==========================================

function downloadPNG() {
  if (!generated) {
    showToast("Generate a QR code first.");
    return;
  }

  const link = document.createElement("a");
  link.download = "qr-studio-code.png";
  link.href = qrCanvas.toDataURL("image/png");
  link.click();

  showToast("PNG downloaded!");
}

// ==========================================
// DOWNLOAD SVG
// ==========================================

async function downloadSVG() {
  if (!generated) {
    showToast("Generate a QR code first.");
    return;
  }

  try {
    const size = Number(qrSize.value);
    const correction = logoData ? "H" : errorLevel.value;

    let svg = await QRCode.toString(generatedPayload, {
      type: "svg",
      width: size,
      margin: 2,
      errorCorrectionLevel: correction,
      color: {
        dark: foreground.value,
        light: background.value
      }
    });

    if (logoData) {
      const totalSize = size * 0.26;
      const logoSize = size * 0.19;
      const x = (size - logoSize) / 2;
      const y = (size - logoSize) / 2;
      const padding = (totalSize - logoSize) / 2;

      const logo = `
        <rect
          x="${x - padding}"
          y="${y - padding}"
          width="${totalSize}"
          height="${totalSize}"
          rx="${size * 0.035}"
          fill="#ffffff"
        />
        <image
          href="${logoData}"
          x="${x}"
          y="${y}"
          width="${logoSize}"
          height="${logoSize}"
          preserveAspectRatio="xMidYMid meet"
        />
      `;

      svg = svg.replace("</svg>", `${logo}</svg>`);
    }

    const blob = new Blob([svg], {
      type: "image/svg+xml;charset=utf-8"
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "qr-studio-code.svg";
    link.click();

    setTimeout(() => URL.revokeObjectURL(url), 1000);

    showToast("SVG downloaded!");

  } catch (error) {
    console.error(error);
    showToast("Unable to export SVG.");
  }
}

// ==========================================
// COPY CONTENT
// ==========================================

async function copyContent() {
  if (!generated) {
    showToast("Generate a QR code first.");
    return;
  }

  try {
    await navigator.clipboard.writeText(generatedPayload);
    showToast("QR content copied!");
  } catch {
    showToast("Clipboard unavailable. Please copy manually.");
  }
}

// ==========================================
// COLOR AND SIZE LABELS
// ==========================================

function updateColorLabels() {
  $("foregroundValue").textContent =
    foreground.value.toUpperCase();

  $("backgroundValue").textContent =
    background.value.toUpperCase();
}

function updateSizeLabel() {
  $("sizeValue").textContent = qrSize.value + " px";
}

// ==========================================
// LOGO UPLOAD
// ==========================================

logoInput.addEventListener("change", event => {
  const file = event.target.files[0];

  if (!file) return;

  const allowedTypes = [
    "image/png",
    "image/jpeg",
    "image/webp"
  ];

  if (!allowedTypes.includes(file.type)) {
    showToast("Please select PNG, JPG or WEBP.");
    logoInput.value = "";
    return;
  }

  if (file.size > 2 * 1024 * 1024) {
    showToast("Logo must be smaller than 2 MB.");
    logoInput.value = "";
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    logoData = reader.result;
    logoLabel.textContent = file.name;
    removeLogo.classList.remove("hidden");
    errorLevel.value = "H";
    updateQR();
    showToast("Logo uploaded!");
  };

  reader.onerror = () => {
    showToast("Could not read the selected image.");
  };

  reader.readAsDataURL(file);
});

removeLogo.addEventListener("click", () => {
  logoData = null;
  logoInput.value = "";
  logoLabel.textContent = "Upload your logo";
  removeLogo.classList.add("hidden");
  updateQR();
  showToast("Logo removed.");
});

// ==========================================
// RESET CUSTOMIZATION
// ==========================================

$("resetButton").addEventListener("click", () => {
  foreground.value = "#111111";
  background.value = "#ffffff";
  qrSize.value = 320;
  errorLevel.value = "H";

  logoData = null;
  logoInput.value = "";
  logoLabel.textContent = "Upload your logo";
  removeLogo.classList.add("hidden");

  updateColorLabels();
  updateSizeLabel();
  updateQR();

  showToast("Customization reset.");
});

// ==========================================
// EVENT LISTENERS
// ==========================================

qrType.addEventListener("change", renderFields);

dynamicFields.addEventListener("input", updateQR);
dynamicFields.addEventListener("change", updateQR);

foreground.addEventListener("input", () => {
  updateColorLabels();
  updateQR();
});

background.addEventListener("input", () => {
  updateColorLabels();
  updateQR();
});

qrSize.addEventListener("input", () => {
  updateSizeLabel();
  updateQR();
});

errorLevel.addEventListener("change", updateQR);

$("downloadPng").addEventListener("click", downloadPNG);
$("downloadSvg").addEventListener("click", downloadSVG);
$("copyContent").addEventListener("click", copyContent);

// ==========================================
// HISTORY BUTTONS
// ==========================================

historyList.addEventListener("click", event => {
  const button = event.target.closest("button[data-action]");

  if (!button) return;

  const id = Number(button.dataset.id);
  const item = getHistory().find(entry => entry.id === id);

  if (!item) return;

  if (button.dataset.action === "load") {
    loadHistoryEntry(item);
  }

  if (button.dataset.action === "download") {
    QRCode.toDataURL(item.payload, {
      width: item.size,
      margin: 2,
      errorCorrectionLevel: item.correction || "H",
      color: {
        dark: item.foreground,
        light: item.background
      }
    }).then(url => {
      const link = document.createElement("a");
      link.href = url;
      link.download = "qr-studio-history.png";
      link.click();
      showToast("History QR downloaded!");
    }).catch(() => {
      showToast("Download failed.");
    });
  }
});

// ==========================================
// CLEAR HISTORY
// ==========================================

$("clearHistory").addEventListener("click", () => {
  if (!getHistory().length) {
    showToast("History is already empty.");
    return;
  }

  if (!confirm("Delete all saved QR codes?")) return;

  localStorage.removeItem(HISTORY_KEY);
  renderHistory();

  showToast("History cleared.");
});

// ==========================================
// INITIALIZATION
// ==========================================

$("downloadPng").disabled = true;
$("downloadSvg").disabled = true;

updateColorLabels();
updateSizeLabel();
renderFields();
renderHistory();

console.log("QR Studio initialized successfully!");  
console.log("QRCode library:", typeof QRCode); 
console.log("QR type element:", qrType); 
console.log("Dynamic fields element:", dynamicFields); 
console.log("Selected type:", qrType.value); 
console.log("Field templates:", Object.keys(fieldTemplates));  renderFields();
