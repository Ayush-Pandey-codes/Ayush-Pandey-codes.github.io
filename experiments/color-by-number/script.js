const PUZZLES = {
  easy: [
    {
      id: "easy-heart",
      name: "Sweet Heart",
      difficulty: "easy",
      icon: "💖",
      cols: 10,
      rows: 10,
      palette: [
        { name: "White", hex: "#ffffff" },
        { name: "Red", hex: "#e63950" },
        { name: "Pink", hex: "#ffb3c1" },
        { name: "Dark Red", hex: "#a5233a" }
      ],
      cells: [
        "..11..11..",
        ".11111111.",
        "1122222211",
        "1122222211",
        "1122222211",
        ".11222211.",
        "..112211..",
        "...1111...",
        "....11....",
        ".........."
      ]
    },
    {
      id: "easy-star",
      name: "Little Star",
      difficulty: "easy",
      icon: "⭐",
      cols: 10,
      rows: 10,
      palette: [
        { name: "White", hex: "#ffffff" },
        { name: "Yellow", hex: "#ffd23f" },
        { name: "Orange", hex: "#ff9f1c" },
        { name: "Blue", hex: "#4361ee" }
      ],
      cells: [
        "....22....",
        "....22....",
        "...2222...",
        "2222222222",
        ".22222222.",
        "..222222..",
        "..222222..",
        ".22.22.22.",
        "22..22..22",
        ".........."
      ]
    }
  ],

  advanced: [
    {
      id: "advanced-mandala",
      name: "Neon Mandala",
      difficulty: "advanced",
      icon: "🌀",
      cols: 16,
      rows: 16,
      palette: [
        { name: "White", hex: "#ffffff" },
        { name: "Indigo", hex: "#3a0ca3" },
        { name: "Purple", hex: "#7209b7" },
        { name: "Magenta", hex: "#f72585" },
        { name: "Cyan", hex: "#4cc9f0" },
        { name: "Yellow", hex: "#ffd60a" }
      ],
      cells: [
        "......55......",
        ".....5555.....",
        "....522225....",
        "...52222225...",
        "..5223333225..",
        ".522344443225.",
        "52234444443225",
        "52234444443225",
        "52234444443225",
        "52234444443225",
        ".522344443225.",
        "..5223333225..",
        "...52222225...",
        "....522225....",
        ".....5555.....",
        "......55......"
      ]
    },
    {
      id: "advanced-fox",
      name: "Pixel Fox",
      difficulty: "advanced",
      icon: "🦊",
      cols: 16,
      rows: 16,
      palette: [
        { name: "White", hex: "#ffffff" },
        { name: "Orange", hex: "#f77f00" },
        { name: "Dark Orange", hex: "#d16000" },
        { name: "Cream", hex: "#fff3d6" },
        { name: "Black", hex: "#22223b" },
        { name: "Pink", hex: "#ff8fa3" }
      ],
      cells: [
        "22..........22.",
        "2222........2222",
        "2222222222222222",
        "2222222222222222",
        "2233222222223322",
        "2233322222233322",
        "2233322222233322",
        "2222222222222222",
        "2222444444442222",
        "2222444444442222",
        "2222445555442222",
        "2222444444442222",
        ".22244444444222.",
        "..222444444222..",
        "...2222222222...",
        "....22222222...."
      ]
    }
  ],

  classic: [
    {
      id: "classic-flower",
      name: "Garden Flower",
      difficulty: "classic",
      icon: "🌷",
      cols: 14,
      rows: 14,
      palette: [
        { name: "White", hex: "#ffffff" },
        { name: "Green", hex: "#2d6a4f" },
        { name: "Light Green", hex: "#74c69d" },
        { name: "Pink", hex: "#ff85a1" },
        { name: "Rose", hex: "#e05780" },
        { name: "Yellow", hex: "#ffd60a" }
      ],
      cells: [
      "....4444......",
      "...444444.....",
      "..44444444....",
      "..44455444....",
      ".4445555444...",
      ".4445555444...",
      "..44455444....",
      "..44444444....",
      "...444444.....",
      "....4444......",
      ".....22.......",
      "..2..22..2....",
      "..22222222....",
      ".....22......."
      ]
    },
    {
      id: "classic-house",
      name: "Cozy House",
      difficulty: "classic",
      icon: "🏡",
      cols: 14,
      rows: 14,
      palette: [
        { name: "White", hex: "#ffffff" },
        { name: "Roof Red", hex: "#c1443c" },
        { name: "Wall Cream", hex: "#fff1d0" },
        { name: "Wood Brown", hex: "#8d5b3c" },
        { name: "Window Blue", hex: "#7ec8e3" },
        { name: "Grass Green", hex: "#57a773" }
      ],
      cells: [
      "......22......",
      ".....2222.....",
      "....222222....",
      "...22222222...",
      "..2222222222..",
      ".222222222222.",
      "33333333333333",
      "33334444333333",
      "33334444333333",
      "33334444333333",
      "33334444333333",
      "33334444333333",
      "33333333333333",
      "55555555555555"
      ]
    }
  ]
};

const canvas = document.getElementById("pixelCanvas");
const gallery = document.getElementById("gallery");
const palette = document.getElementById("palette");
const studio = document.getElementById("studio");
const artworkTitle = document.getElementById("artworkTitle");
const progressFill = document.getElementById("progressFill");
const progressText = document.getElementById("progressText");
const toast = document.getElementById("toast");
const savedList = document.getElementById("savedList");

let currentMode = "easy";
let currentPuzzle = null;
let userGrid = [];
let selectedColor = 1;
let selectedTool = "brush";
let zoom = 100;
let history = [];
let redoHistory = [];
let showNumbers = true;
let showGrid = true;
let highlightColor = true;

function getAllPuzzles() {
  return [...PUZZLES.easy, ...PUZZLES.advanced, ...PUZZLES.classic];
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1800);
}

function saveKey(puzzleId) {
  return `colorStudio_${puzzleId}`;
}

function loadSavedGrid(puzzle) {
  const saved = localStorage.getItem(saveKey(puzzle.id));
  if (!saved) return null;

  try {
    const data = JSON.parse(saved);
    if (Array.isArray(data.grid) && data.grid.length === puzzle.rows * puzzle.cols) {
      return data.grid;
    }
  } catch (error) {
    return null;
  }

  return null;
}

function saveCurrentArtwork() {
  if (!currentPuzzle) return;

  localStorage.setItem(saveKey(currentPuzzle.id), JSON.stringify({
    grid: userGrid,
    updated: Date.now()
  }));

  renderSavedArtwork();
}

function renderGallery(filter = "all") {
  gallery.innerHTML = "";

  const puzzles = getAllPuzzles().filter(puzzle => {
    return filter === "all" || puzzle.difficulty === filter;
  });

  if (puzzles.length === 0) {
    gallery.innerHTML = `<p class="empty-note">No artwork found for this filter.</p>`;
    return;
  }

  puzzles.forEach(puzzle => {
    const card = document.createElement("article");
    card.className = "art-card";
    card.innerHTML = `
      <div class="art-preview" style="background:${puzzle.palette[1].hex}22">
        ${puzzle.icon}
      </div>
      <h3>${puzzle.name}</h3>
      <p>${puzzle.cols} × ${puzzle.rows} pixels</p>
      <div class="art-meta">
        <span class="badge ${puzzle.difficulty}">${puzzle.difficulty}</span>
        <button class="open-btn">Open</button>
      </div>
    `;

    card.querySelector(".open-btn").addEventListener("click", () => openPuzzle(puzzle));
    gallery.appendChild(card);
  });
}

function openPuzzle(puzzle) {
  currentPuzzle = puzzle;
  currentMode = puzzle.difficulty;

  const saved = loadSavedGrid(puzzle);
  userGrid = saved ? [...saved] : new Array(puzzle.rows * puzzle.cols).fill(0);

  history = [];
  redoHistory = [];
  selectedColor = 1;
  selectedTool = "brush";
  zoom = 100;

  document.querySelectorAll(".tool-btn[data-tool]").forEach(button => {
    button.classList.toggle("active", button.dataset.tool === "brush");
  });

  artworkTitle.textContent = puzzle.name;
  studio.classList.remove("hidden");
  gallery.closest(".gallery-section").classList.add("hidden");

  renderPalette();
  renderCanvas();
  updateProgress();
  updateZoomLabel();
  renderSavedArtwork();
  showToast(`Opened ${puzzle.name}`);
}

function backToGallery() {
  studio.classList.add("hidden");
  gallery.closest(".gallery-section").classList.remove("hidden");
  currentPuzzle = null;
}

function renderPalette() {
  palette.innerHTML = "";

  currentPuzzle.palette.forEach((color, index) => {
    if (index === 0) return;

    const button = document.createElement("button");
    button.className = "color-swatch";
    button.dataset.color = index;

    if (index === selectedColor) {
      button.classList.add("active");
    }

    button.innerHTML = `
      <div class="color-dot" style="background:${color.hex}"></div>
      <div class="color-name">${color.name}</div>
      <div class="color-number">Color ${index}</div>
    `;

    button.addEventListener("click", () => {
      selectedColor = index;
      renderPalette();
      renderCanvas();
    });

    palette.appendChild(button);
  });
}

function createCell(index) {
  const cell = document.createElement("div");
  cell.className = "pixel";
  cell.dataset.index = index;

  cell.addEventListener("click", () => applyTool(index));
  return cell;
}

function renderCanvas() {
  canvas.innerHTML = "";
  canvas.style.gridTemplateColumns = `repeat(${currentPuzzle.cols}, 1fr)`;

  const baseSize = 30;
  const cellSize = Math.max(12, Math.round(baseSize * zoom / 100));

  canvas.style.width = `${currentPuzzle.cols * cellSize}px`;
  canvas.style.height = `${currentPuzzle.rows * cellSize}px`;

  currentPuzzle.cells.forEach((row, rowIndex) => {
    row.split("").forEach((character, colIndex) => {
      const index = rowIndex * currentPuzzle.cols + colIndex;
      const cell = createCell(index);

      const target = character === "." ? 0 : Number(character);
      const userColor = userGrid[index];

      cell.style.width = `${cellSize}px`;
      cell.style.height = `${cellSize}px`;
      cell.style.backgroundColor = currentPuzzle.palette[userColor].hex;

      if (!showGrid) {
        cell.classList.add("no-grid");
      }

      if (showNumbers && target !== 0 && userColor !== target) {
        cell.textContent = target;
      }

      if (highlightColor && selectedColor === target && target !== 0) {
        cell.classList.add("highlight");
      }

      canvas.appendChild(cell);
    });
  });
}

function pushHistory() {
  history.push([...userGrid]);

  if (history.length > 60) {
    history.shift();
  }

  redoHistory = [];
}

function applyTool(index) {
  if (!currentPuzzle) return;

  const target = currentPuzzle.cells[Math.floor(index / currentPuzzle.cols)]
    .split("")[index % currentPuzzle.cols];

  const targetColor = target === "." ? 0 : Number(target);

  if (selectedTool === "brush") {
    if (userGrid[index] === selectedColor) return;

    pushHistory();
    userGrid[index] = selectedColor;
  }

  if (selectedTool === "eraser") {
    if (userGrid[index] === 0) return;

    pushHistory();
    userGrid[index] = 0;
  }

  if (selectedTool === "fill") {
    const originalColor = userGrid[index];

    if (originalColor === selectedColor) return;

    pushHistory();
    floodFill(index, originalColor, selectedColor);
  }

  renderCanvas();
  updateProgress();
  saveCurrentArtwork();
}

function floodFill(startIndex, fromColor, toColor) {
  if (fromColor === toColor) return;

  const stack = [startIndex];
  const visited = new Set();

  while (stack.length > 0) {
    const index = stack.pop();

    if (visited.has(index)) continue;
    visited.add(index);

    if (userGrid[index] !== fromColor) continue;

    userGrid[index] = toColor;

    const row = Math.floor(index / currentPuzzle.cols);
    const col = index % currentPuzzle.cols;

    if (row > 0) stack.push(index - currentPuzzle.cols);
    if (row < currentPuzzle.rows - 1) stack.push(index + currentPuzzle.cols);
    if (col > 0) stack.push(index - 1);
    if (col < currentPuzzle.cols - 1) stack.push(index + 1);
  }
}

function updateProgress() {
  let correct = 0;
  let total = 0;

  currentPuzzle.cells.forEach((row, rowIndex) => {
    row.split("").forEach((character, colIndex) => {
      const index = rowIndex * currentPuzzle.cols + colIndex;
      const target = character === "." ? 0 : Number(character);

      if (target !== 0) {
        total++;

        if (userGrid[index] === target) {
          correct++;
        }
      }
    });
  });

  const percent = total === 0 ? 0 : Math.round(correct / total * 100);

  progressFill.style.width = `${percent}%`;
  progressText.textContent = `${percent}% complete`;

  if (percent === 100) {
    saveCompletedArtwork();
    showToast("Artwork completed! 🎉");
  }
}

function saveCompletedArtwork() {
  const key = `colorStudioCompleted_${currentPuzzle.id}`;
  const existing = localStorage.getItem(key);

  if (existing) return;

  const dataUrl = exportCanvas(true);
  localStorage.setItem(key, JSON.stringify({
    name: currentPuzzle.name,
    difficulty: currentPuzzle.difficulty,
    image: dataUrl,
    date: Date.now()
  }));

  renderSavedArtwork();
}

function renderSavedArtwork() {
  savedList.innerHTML = "";

  const completed = getAllPuzzles()
    .map(puzzle => {
      const saved = localStorage.getItem(`colorStudioCompleted_${puzzle.id}`);
      return saved ? JSON.parse(saved) : null;
    })
    .filter(Boolean);

  if (completed.length === 0) {
    savedList.innerHTML = `<p class="empty-note">Complete an artwork to save it here.</p>`;
    return;
  }

  completed.forEach(item => {
    const div = document.createElement("div");
    div.className = "saved-item";
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <div class="saved-info">
        <strong>${item.name}</strong>
        <span>${item.difficulty}</span>
      </div>
    `;
    savedList.appendChild(div);
  });
}

function undo() {
  if (history.length === 0) {
    showToast("Nothing to undo");
    return;
  }

  redoHistory.push([...userGrid]);
  userGrid = history.pop();

  renderCanvas();
  updateProgress();
  saveCurrentArtwork();
}

function redo() {
  if (redoHistory.length === 0) {
    showToast("Nothing to redo");
    return;
  }

  history.push([...userGrid]);
  userGrid = redoHistory.pop();

  renderCanvas();
  updateProgress();
  saveCurrentArtwork();
}

function useHint() {
  const unfinished = [];

  currentPuzzle.cells.forEach((row, rowIndex) => {
    row.split("").forEach((character, colIndex) => {
      const index = rowIndex * currentPuzzle.cols + colIndex;
      const target = character === "." ? 0 : Number(character);

      if (target !== 0 && userGrid[index] !== target) {
        unfinished.push({ index, target });
      }
    });
  });

  if (unfinished.length === 0) {
    showToast("No hints needed!");
    return;
  }

  const hint = unfinished[Math.floor(Math.random() * unfinished.length)];

  pushHistory();
  userGrid[hint.index] = hint.target;
  selectedColor = hint.target;

  renderPalette();
  renderCanvas();
  updateProgress();
  saveCurrentArtwork();
  showToast("Hint used: one cell revealed");
}

function findNextUnfinished(autoSelect = false) {
  const unfinishedColors = [];

  currentPuzzle.cells.forEach((row, rowIndex) => {
    row.split("").forEach((character, colIndex) => {
      const index = rowIndex * currentPuzzle.cols + colIndex;
      const target = character === "." ? 0 : Number(character);

      if (target !== 0 && userGrid[index] !== target && !unfinishedColors.includes(target)) {
        unfinishedColors.push(target);
      }
    });
  });

  if (unfinishedColors.length === 0) {
    showToast("All colors are complete!");
    return;
  }

  const nextColor = unfinishedColors[0];

  if (autoSelect) {
    selectedColor = nextColor;
    renderPalette();
    renderCanvas();
    showToast(`Auto-selected Color ${nextColor}`);
  } else {
    showToast(`Next unfinished color: ${nextColor}`);
  }
}

function resetArtwork() {
  if (!confirm("Reset this artwork? Your current progress will be cleared.")) return;

  pushHistory();
  userGrid = new Array(currentPuzzle.rows * currentPuzzle.cols).fill(0);

  renderCanvas();
  updateProgress();
  saveCurrentArtwork();
  showToast("Artwork reset");
}

function exportCanvas(returnDataUrl = false) {
  const exportCanvasElement = document.createElement("canvas");
  const scale = 25;

  exportCanvasElement.width = currentPuzzle.cols * scale;
  exportCanvasElement.height = currentPuzzle.rows * scale;

  const context = exportCanvasElement.getContext("2d");

  currentPuzzle.cells.forEach((row, rowIndex) => {
    row.split("").forEach((character, colIndex) => {
      const index = rowIndex * currentPuzzle.cols + colIndex;
      const userColor = userGrid[index];

      context.fillStyle = currentPuzzle.palette[userColor].hex;
      context.fillRect(colIndex * scale, rowIndex * scale, scale, scale);
    });
  });

  const dataUrl = exportCanvasElement.toDataURL("image/png");

  if (returnDataUrl) {
    return dataUrl;
  }

  const link = document.createElement("a");
  link.href = dataUrl;
  link.download = `${currentPuzzle.id}-color-studio.png`;
  link.click();

  showToast("PNG exported");
}

function updateZoomLabel() {
  document.getElementById("zoomLabel").textContent = `${zoom}%`;
}

document.querySelectorAll(".mode-tab").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".mode-tab").forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    currentMode = button.dataset.mode;
    renderGallery(currentMode);

    document.querySelectorAll(".filter-btn").forEach(filterButton => {
      filterButton.classList.toggle("active", filterButton.dataset.filter === currentMode);
    });
  });
});

document.querySelectorAll(".filter-btn").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-btn").forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    renderGallery(button.dataset.filter);
  });
});

document.querySelectorAll(".tool-btn[data-tool]").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".tool-btn[data-tool]").forEach(item => item.classList.remove("active"));
    button.classList.add("active");

    selectedTool = button.dataset.tool;
  });
});

document.getElementById("backBtn").addEventListener("click", backToGallery);
document.getElementById("undoBtn").addEventListener("click", undo);
document.getElementById("redoBtn").addEventListener("click", redo);
document.getElementById("hintBtn").addEventListener("click", useHint);
document.getElementById("resetBtn").addEventListener("click", resetArtwork);
document.getElementById("exportBtn").addEventListener("click", () => exportCanvas(false));
document.getElementById("printBtn").addEventListener("click", () => window.print());

document.getElementById("zoomInBtn").addEventListener("click", () => {
  zoom = Math.min(200, zoom + 10);
  updateZoomLabel();
  renderCanvas();
});

document.getElementById("zoomOutBtn").addEventListener("click", () => {
  zoom = Math.max(50, zoom - 10);
  updateZoomLabel();
  renderCanvas();
});

document.getElementById("showNumbers").addEventListener("change", event => {
  showNumbers = event.target.checked;
  renderCanvas();
});

document.getElementById("showGrid").addEventListener("change", event => {
  showGrid = event.target.checked;
  renderCanvas();
});

document.getElementById("highlightColor").addEventListener("change", event => {
  highlightColor = event.target.checked;
  renderCanvas();
});

document.getElementById("autoNextBtn").addEventListener("click", () => {
  findNextUnfinished(true);
});

document.getElementById("nextUnfinishedBtn").addEventListener("click", () => {
  findNextUnfinished(false);
});

document.getElementById("clearSelectionBtn").addEventListener("click", () => {
  selectedColor = 1;
  renderPalette();
  renderCanvas();
  showToast("Selection cleared");
});

renderGallery("all");
renderSavedArtwork();
