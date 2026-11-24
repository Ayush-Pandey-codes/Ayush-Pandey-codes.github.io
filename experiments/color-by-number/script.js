
const PALETTE = {
  A: { name: "Lavender", color: "#b99be8" },
  B: { name: "Pink", color: "#e99bb7" },
  C: { name: "Yellow", color: "#f2ca70" },
  D: { name: "Green", color: "#8ebd98" },
  E: { name: "Blue", color: "#83b5dc" },
  F: { name: "Orange", color: "#e9a16e" },
  G: { name: "Cream", color: "#f1e4c5" },
  H: { name: "Red", color: "#df777c" }
};

// Each character represents one color.
// Mystery pictures are intentionally shown only as numbered squares.
const PUZZLES = [
  {
    id: "mystery-cat",
    mode: "mystery",
    title: "Little Cat",
    description: "A tiny friend is waiting to be discovered.",
    difficulty: "easy",
    size: "10 × 10",
    rows: [
      "....AA....",
      "...ABBA...",
      "..ABBBBA..",
      "..ABBBBA..",
      ".ABBBBBBA.",
      ".ABABABBA.",
      ".ABBBBBBA.",
      "..ABBBBA..",
      "...ABBA...",
      "....AA...."
    ],
    colors: ["A", "B"]
  },
  {
    id: "mystery-flower",
    mode: "mystery",
    title: "Secret Flower",
    description: "A little bloom hidden in the grid.",
    difficulty: "easy",
    size: "10 × 10",
    rows: [
      "...BBB....",
      "..BBBBB...",
      ".BBBCBBB..",
      "..BBBBB...",
      "...BBB....",
      "....D.....",
      "....D.....",
      "...DDD....",
      "..D...D...",
      "........."
    ],
    colors: ["B", "C", "D"]
  },
  {
    id: "mystery-rocket",
    mode: "mystery",
    title: "Space Explorer",
    description: "Color your way to a cosmic surprise.",
    difficulty: "medium",
    size: "10 × 10",
    rows: [
      "....A.....",
      "...AAA....",
      "..AAAAA...",
      "..ABAAA...",
      "..AAAAA...",
      "..AAAAA...",
      "..AAAAA...",
      ".AA.A.AA..",
      "AA...A..AA",
      "....B....."
    ],
    colors: ["A", "B"]
  },
  {
    id: "mystery-heart",
    mode: "mystery",
    title: "Secret Heart",
    description: "A sweet surprise, one square at a time.",
    difficulty: "medium",
    size: "10 × 10",
    rows: [
      ".BB...BB..",
      "BBBB.BBBB.",
      "BBBBBBBBB.",
      ".BBBBBBB..",
      "..BBBBB...",
      "...BBB....",
      "....B.....",
      "..........",
      "..........",
      ".........."
    ],
    colors: ["B"]
  },
  {
    id: "classic-flower",
    mode: "classic",
    title: "Garden Flower",
    description: "A cheerful flower with a colorful center.",
    difficulty: "easy",
    size: "12 × 12",
    rows: [
      "....BBB.....",
      "...BBBBB....",
      "..BBBBBBB...",
      "...BBBBB....",
      "....BBB.....",
      ".....C......",
      ".....D......",
      ".....D......",
      "...DDDDD....",
      "..D..D..D...",
      ".....D......",
      ".....D......"
    ],
    colors: ["B", "C", "D"]
  },
  {
    id: "classic-butterfly",
    mode: "classic",
    title: "Pretty Butterfly",
    description: "Color the wings of this little butterfly.",
    difficulty: "medium",
    size: "12 × 12",
    rows: [
      "BB....AA....",
      "BBB...AAA...",
      "BBBB.AAAA...",
      ".BBBB.AAA...",
      "..BBB.AA....",
      "...BB.A.....",
      "....DD......",
      "...DDDD.....",
      "..D..DD.....",
      ".D...DD.....",
      "D....D......",
      ".....D......"
    ],
    colors: ["A", "B", "D"]
  },
  {
    id: "classic-house",
    mode: "classic",
    title: "Little House",
    description: "A cozy little home waiting for color.",
    difficulty: "easy",
    size: "12 × 12",
    rows: [
      ".....HH.....",
      "....HHHH....",
      "...HHHHHH...",
      "..HHHHHHHH..",
      ".HHHHHHHHHH.",
      "GGGGGGGGGGGG",
      "GGGFFFFFGGGG",
      "GGGFFFFFGGGG",
      "GGGGGFGGGGGG",
      "GGGGGFGGGGGG",
      "GGGGGGGGGGGG",
      "GGGGGGGGGGGG"
    ],
    colors: ["F", "G", "H"]
  }
];

const elements = {
  modeCards: document.querySelectorAll(".mode-card"),
  gallery: document.querySelector("#puzzle-gallery"),
  galleryTitle: document.querySelector("#gallery-title"),
  galleryEyebrow: document.querySelector("#gallery-eyebrow"),
  puzzleGrid: document.querySelector("#puzzle-grid"),
  filters: document.querySelector("#difficulty-filters"),
  playSection: document.querySelector("#play-section"),
  playTitle: document.querySelector("#play-title"),
  playModeLabel: document.querySelector("#play-mode-label"),
  artwork: document.querySelector("#artwork"),
  palette: document.querySelector("#palette-list"),
  selectedNumber: document.querySelector("#selected-number"),
  progressText: document.querySelector("#progress-text"),
  progressBar: document.querySelector("#progress-bar"),
  progressCaption: document.querySelector("#progress-caption"),
  remainingLabel: document.querySelector("#remaining-label"),
  canvasInstruction: document.querySelector("#canvas-instruction"),
  canvasSize: document.querySelector("#canvas-size-label"),
  completion: document.querySelector("#completion-overlay"),
  completionTitle: document.querySelector("#completion-title"),
  completionMessage: document.querySelector("#completion-message"),
  toast: document.querySelector("#toast")
};

let currentMode = "mystery";
let currentPuzzle = null;
let selectedColor = null;
let coloredCells = new Map();
let numbersVisible = true;
let activeFilter = "all";
let toastTimeout = null;

function showToast(message) {
  elements.toast.textContent = message;
  elements.toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    elements.toast.classList.remove("show");
  }, 2400);
}

function getPuzzleColors(puzzle) {
  return puzzle.colors.map((key, index) => ({
    key,
    number: index + 1,
    ...PALETTE[key]
  }));
}

function getRows(puzzle) {
  return puzzle.rows.map(row => row.split(""));
}

function getAllCells(puzzle) {
  return getRows(puzzle).flat();
}

function countColor(puzzle, key) {
  return getAllCells(puzzle).filter(cell => cell === key).length;
}

function showGallery(mode) {
  currentMode = mode;
  activeFilter = "all";

  elements.playSection.classList.add("hidden");
  elements.gallery.classList.remove("hidden");
  document.querySelector(".mode-section").classList.add("hidden");

  if (mode === "mystery") {
    elements.galleryEyebrow.textContent = "THE SURPRISE COLLECTION";
    elements.galleryTitle.textContent = "Mystery puzzles";
  } else {
    elements.galleryEyebrow.textContent = "THE CLASSIC COLLECTION";
    elements.galleryTitle.textContent = "Coloring pages";
  }

  document.querySelectorAll(".filter").forEach(button => {
    button.classList.toggle("active", button.dataset.difficulty === "all");
  });

  renderGallery();
  elements.gallery.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderGallery() {
  const puzzles = PUZZLES.filter(puzzle => {
    const correctMode = puzzle.mode === currentMode;
    const correctDifficulty =
      activeFilter === "all" || puzzle.difficulty === activeFilter;
    return correctMode && correctDifficulty;
  });

  elements.puzzleGrid.innerHTML = "";

  puzzles.forEach(puzzle => {
    const card = document.createElement("button");
    card.className = "puzzle-card";
    card.type = "button";

    const preview = document.createElement("div");
    preview.className = "puzzle-preview";

    if (puzzle.mode === "mystery") {
      const grid = document.createElement("div");
      grid.className = "preview-grid";
      grid.style.gridTemplateColumns = `repeat(${puzzle.rows[0].length}, 1fr)`;

      getAllCells(puzzle).forEach((key, index) => {
        const cell = document.createElement("span");
        cell.className = "preview-cell";
        cell.textContent = key === "." ? "" : "?";
        grid.appendChild(cell);
      });

      preview.appendChild(grid);
    } else {
      const flower = document.createElement("span");
      flower.className = "preview-flower";
      flower.textContent = puzzle.id.includes("flower") ? "✿" :
        puzzle.id.includes("butterfly") ? "🦋" : "⌂";
      preview.appendChild(flower);
    }

    const info = document.createElement("div");
    info.className = "puzzle-info";

    const heading = document.createElement("h3");
    heading.textContent = puzzle.title;

    const description = document.createElement("p");
    description.textContent = puzzle.description;

    const meta = document.createElement("div");
    meta.className = "puzzle-meta";

    const difficulty = document.createElement("span");
    difficulty.textContent =
      puzzle.difficulty.charAt(0).toUpperCase() + puzzle.difficulty.slice(1);

    const size = document.createElement("span");
    size.textContent = puzzle.size;

    meta.append(difficulty, size);
    info.append(heading, description, meta);
    card.append(preview, info);

    card.addEventListener("click", () => startPuzzle(puzzle.id));
    elements.puzzleGrid.appendChild(card);
  });

  if (!puzzles.length) {
    elements.puzzleGrid.textContent = "No puzzles found for this difficulty.";
  }
}

function startPuzzle(id) {
  const puzzle = PUZZLES.find(item => item.id === id);
  if (!puzzle) return;

  currentPuzzle = puzzle;
  coloredCells = new Map();
  selectedColor = puzzle.colors[0];
  numbersVisible = true;

  elements.gallery.classList.add("hidden");
  elements.playSection.classList.remove("hidden");
  elements.playTitle.textContent = puzzle.title;
  elements.playModeLabel.textContent =
    puzzle.mode === "mystery" ? "MYSTERY COLOR" : "CLASSIC COLOR";
  elements.canvasSize.textContent = puzzle.size.toUpperCase() + " GRID";
  elements.completion.classList.add("hidden");

  renderPalette();
  renderArtwork();
  updateProgress();

  elements.playSection.scrollIntoView({ behavior: "smooth", block: "start" });
}

function renderPalette() {
  elements.palette.innerHTML = "";
  const colors = getPuzzleColors(currentPuzzle);

  colors.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "palette-choice";
    button.dataset.color = item.key;

    const dot = document.createElement("span");
    dot.className = "color-dot";
    dot.style.backgroundColor = item.color;

    const name = document.createElement("span");
    name.textContent = item.name;

    const number = document.createElement("strong");
    number.textContent = item.number;

    button.append(dot, name, number);
    button.addEventListener("click", () => selectColor(item.key));
    elements.palette.appendChild(button);
  });

  updatePaletteSelection();
}

function selectColor(key) {
  selectedColor = key;
  updatePaletteSelection();

  const number = currentPuzzle.colors.indexOf(key) + 1;
  elements.canvasInstruction.textContent = `Select the squares marked ${number}`;
  elements.selectedNumber.textContent = number;
}

function updatePaletteSelection() {
  if (!currentPuzzle) return;

  const colors = getPuzzleColors(currentPuzzle);
  elements.selectedNumber.textContent =
    currentPuzzle.colors.indexOf(selectedColor) + 1;

  elements.palette.querySelectorAll(".palette-choice").forEach(button => {
    const key = button.dataset.color;
    const total = countColor(currentPuzzle, key);
    const completed = [...coloredCells.values()].filter(value => value === key).length;

    button.classList.toggle("selected", key === selectedColor);
    button.classList.toggle("completed", completed === total);
  });
}

function renderArtwork() {
  const rows = getRows(currentPuzzle);
  const columns = rows[0].length;

  elements.artwork.innerHTML = "";
  elements.artwork.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

  rows.forEach((row, rowIndex) => {
    row.forEach((key, columnIndex) => {
      const index = rowIndex * columns + columnIndex;
      const button = document.createElement("button");
      button.type = "button";
      button.className = "art-cell";
      button.dataset.index = index;
      button.setAttribute("aria-label", `Puzzle square ${index + 1}`);

      if (key === ".") {
        button.style.background = "#fffdf8";
        button.disabled = true;
        button.setAttribute("aria-label", "Blank square");
      } else {
        const number = currentPuzzle.colors.indexOf(key) + 1;
        button.dataset.answer = key;
        button.textContent = numbersVisible ? number : "";

        if (coloredCells.has(index)) {
          button.style.backgroundColor = PALETTE[key].color;
          button.classList.add("colored");
          button.textContent = "";
        }

        button.addEventListener("click", () => colorCell(index, key, button));
      }

      elements.artwork.appendChild(button);
    });
  });
}

function colorCell(index, answer, button) {
  if (coloredCells.has(index)) return;

  if (!selectedColor) {
    showToast("Choose a color first.");
    return;
  }

  if (selectedColor !== answer) {
    button.classList.remove("correct-flash");
    void button.offsetWidth;
    button.classList.add("correct-flash");
    showToast("Not quite! Try another color.");
    return;
  }

  coloredCells.set(index, answer);
  button.style.backgroundColor = PALETTE[answer].color;
  button.classList.add("colored");
  button.textContent = "";

  updateProgress();
  updatePaletteSelection();

  if (coloredCells.size === getAllCells(currentPuzzle).filter(key => key !== ".").length) {
    finishPuzzle();
  }
}

function updateProgress() {
  const total = getAllCells(currentPuzzle).filter(key => key !== ".").length;
  const completed = coloredCells.size;
  const percentage = total ? Math.round(completed / total * 100) : 0;

  elements.progressText.textContent = percentage + "%";
  elements.progressBar.style.width = percentage + "%";
  elements.remainingLabel.textContent = `${completed} / ${total} squares colored`;

  if (percentage === 0) {
    elements.progressCaption.textContent = "Let's get coloring!";
  } else if (percentage < 50) {
    elements.progressCaption.textContent = "You're making progress!";
  } else if (percentage < 100) {
    elements.progressCaption.textContent = "Looking good. Keep going!";
  } else {
    elements.progressCaption.textContent = "Every square is complete!";
  }
}

function finishPuzzle() {
  elements.completion.classList.remove("hidden");

  if (currentPuzzle.mode === "mystery") {
    elements.completionTitle.textContent = "The mystery is solved!";
    elements.completionMessage.textContent =
      `You discovered: ${currentPuzzle.title}. What a lovely surprise!`;
  } else {
    elements.completionTitle.textContent = "Beautifully colored!";
    elements.completionMessage.textContent =
      `You completed ${currentPuzzle.title}. Your artwork is ready!`;
  }

  showToast("Puzzle completed! ✦");
}

function resetPuzzle() {
  if (!currentPuzzle) return;

  coloredCells.clear();
  elements.completion.classList.add("hidden");
  renderArtwork();
  updateProgress();
  updatePaletteSelection();
  showToast("Puzzle reset. Have another go!");
}

function toggleNumbers(visible) {
  numbersVisible = visible;

  elements.artwork.querySelectorAll(".art-cell:not(:disabled)").forEach(button => {
    const index = Number(button.dataset.index);
    if (coloredCells.has(index)) return;

    const key = button.dataset.answer;
    button.textContent = visible
      ? currentPuzzle.colors.indexOf(key) + 1
      : "";
  });

  showToast(visible ? "Numbers are visible." : "Numbers are hidden.");
}

function giveHint() {
  if (!currentPuzzle) return;

  const cells = [...elements.artwork.querySelectorAll(".art-cell:not(:disabled)")];
  const next = cells.find(button => !coloredCells.has(Number(button.dataset.index)));

  if (!next) {
    showToast("Everything is already colored!");
    return;
  }

  const answer = next.dataset.answer;
  selectColor(answer);

  next.classList.add("correct-flash");
  setTimeout(() => next.classList.remove("correct-flash"), 1200);
  showToast(`Hint: try color ${currentPuzzle.colors.indexOf(answer) + 1}.`);
}

function createPrintSheet() {
  if (!currentPuzzle) return;

  const oldSheet = document.querySelector(".print-sheet");
  if (oldSheet) oldSheet.remove();

  const sheet = document.createElement("section");
  sheet.className = "print-sheet";

  const title = document.createElement("h1");
  title.textContent = "Color Studio — " + currentPuzzle.title;

  const instructions = document.createElement("p");
  instructions.textContent =
    "Color each numbered square using the matching color in the key. Have fun!";

  const grid = document.createElement("div");
  grid.className = "print-grid";

  const rows = getRows(currentPuzzle);
  const columns = rows[0].length;
  grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;

  rows.forEach(row => {
    row.forEach(key => {
      const cell = document.createElement("div");
      cell.className = "print-cell";

      if (key === ".") {
        cell.textContent = "";
      } else {
        cell.textContent = currentPuzzle.colors.indexOf(key) + 1;
      }

      grid.appendChild(cell);
    });
  });

  const keyHeading = document.createElement("h2");
  keyHeading.textContent = "Color key";

  const key = document.createElement("div");
  key.className = "print-key";

  getPuzzleColors(currentPuzzle).forEach(item => {
    const entry = document.createElement("div");
    entry.className = "print-key-item";

    const swatch = document.createElement("span");
    swatch.className = "print-swatch";
    swatch.style.backgroundColor = item.color;

    const label = document.createElement("span");
    label.textContent = `${item.number} — ${item.name}`;

    entry.append(swatch, label);
    key.appendChild(entry);
  });

  const note = document.createElement("p");
  note.className = "print-note";
  note.textContent = "Tip: Use colored pencils, crayons or markers. Keep the color key nearby while coloring.";

  sheet.append(title, instructions, grid, keyHeading, key, note);
  document.body.appendChild(sheet);

  window.print();

  setTimeout(() => sheet.remove(), 1500);
}

function downloadArtwork() {
  if (!currentPuzzle) return;

  const rows = getRows(currentPuzzle);
  const columns = rows[0].length;
  const cellSize = 50;
  const canvas = document.createElement("canvas");

  canvas.width = columns * cellSize;
  canvas.height = rows.length * cellSize;

  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fffdf8";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  rows.forEach((row, rowIndex) => {
    row.forEach((key, columnIndex) => {
      if (key === ".") return;

      const index = rowIndex * columns + columnIndex;
      const x = columnIndex * cellSize;
      const y = rowIndex * cellSize;

      ctx.fillStyle = coloredCells.has(index)
        ? PALETTE[key].color
        : "#fffdf8";

      ctx.fillRect(x, y, cellSize, cellSize);
      ctx.strokeStyle = "#777";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, cellSize, cellSize);

      if (!coloredCells.has(index)) {
        ctx.fillStyle = "#29232e";
        ctx.font = "bold 16px Arial";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(
          currentPuzzle.colors.indexOf(key) + 1,
          x + cellSize / 2,
          y + cellSize / 2
        );
      }
    });
  });

  const link = document.createElement("a");
  link.download = currentPuzzle.id + "-coloring.png";
  link.href = canvas.toDataURL("image/png");
  link.click();

  showToast("PNG downloaded!");
}

// Main navigation
elements.modeCards.forEach(card => {
  card.addEventListener("click", () => showGallery(card.dataset.mode));
});

document.querySelector("#back-to-modes").addEventListener("click", () => {
  elements.gallery.classList.add("hidden");
  document.querySelector(".mode-section").classList.remove("hidden");
  document.querySelector(".mode-section").scrollIntoView({ behavior: "smooth" });
});

document.querySelector("#back-to-gallery").addEventListener("click", () => {
  elements.playSection.classList.add("hidden");
  elements.gallery.classList.remove("hidden");
  elements.gallery.scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll(".filter").forEach(button => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.difficulty;

    document.querySelectorAll(".filter").forEach(item => {
      item.classList.toggle("active", item === button);
    });

    renderGallery();
  });
});

document.querySelector("#reset-puzzle").addEventListener("click", resetPuzzle);
document.querySelector("#print-puzzle").addEventListener("click", createPrintSheet);
document.querySelector("#download-puzzle").addEventListener("click", downloadArtwork);
document.querySelector("#hint-button").addEventListener("click", giveHint);
document.querySelector("#show-numbers").addEventListener("click", () => toggleNumbers(true));
document.querySelector("#hide-numbers").addEventListener("click", () => toggleNumbers(false));

document.querySelector("#play-again").addEventListener("click", () => {
  elements.completion.classList.add("hidden");
  elements.playSection.classList.add("hidden");
  elements.gallery.classList.remove("hidden");
  elements.gallery.scrollIntoView({ behavior: "smooth" });
});

// Start on the home page.
console.log("Color Studio is ready!");
