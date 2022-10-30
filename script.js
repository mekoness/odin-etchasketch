// Generate grid

const canvas = document.querySelector("#canvas");

function makeGrid(size) {
  canvas.style.setProperty("--grid-rows", size);
  canvas.style.setProperty("--grid-cols", size);
  for (c = 0; c < (size * size); c++) {
    let cell = document.createElement("div");
    canvas.appendChild(cell).className = "grid-item";
  };
  refreshGrid()
};

makeGrid(16);

// Grid size slider

const sizeEl = document.querySelector("#size-el");
const sizeLabel = document.querySelector("#size-label");

sizeEl.addEventListener("input", () => {
  let size = sizeEl.value;
  sizeLabel.textContent = `${size}x${size}`;
  canvas.innerHTML = "";
  makeGrid(sizeEl.value);
  refreshGrid();
});

// Color picker

const colorPicker = document.querySelector("#color")
let color = document.querySelector("#color").value;

colorPicker.addEventListener("input", () => {
  color = document.getElementById("color").value;
})

// Toggles

const eraserToggle = document.querySelector("#eraser-toggle");
let eraserBtn = false

eraserToggle.addEventListener("click", () => {
  if (!eraserBtn) {
    eraserBtn = true;
    eraserToggle.classList.add("toggle");
  } else if (eraserBtn) {
    eraserBtn = false;
    eraserToggle.classList.remove("toggle");
  };
});

const grayToggle = document.querySelector("#gray-toggle");
let grayBtn = false

grayToggle.addEventListener("click", () => {
  if (!grayBtn) {
    grayBtn = true;
    grayToggle.classList.add("toggle");
  } else if (grayBtn) {
    grayBtn = false;
    grayToggle.classList.remove("toggle");
  };
});

const rainbowToggle = document.querySelector("#rainbow-toggle");
let rainbowBtn = false

rainbowToggle.addEventListener("click", () => {
  if (!rainbowBtn) {
    rainbowBtn = true;
    rainbowToggle.classList.add("toggle");
  } else if (rainbowBtn) {
    rainbowBtn = false;
    rainbowToggle.classList.remove("toggle");
  };
});

const gridToggle = document.querySelector("#grid-toggle");
let gridBtn = false

gridToggle.addEventListener("click", () => {
  if (!gridBtn) {
    gridBtn = true;
    gridToggle.classList.add("toggle");
  } else if (gridBtn) {
    gridBtn = false;
    gridToggle.classList.remove("toggle");
  };
});

// Refresh and paint grid

function refreshGrid() {
  let gridItem = document.querySelectorAll(".grid-item");
  gridItem.forEach(item => {
    item.addEventListener('mousedown', (e) => {
    item.style.setProperty("--color-pick", color)
    item.style.setProperty("border", "1px solid #999")
    paintGrid(e)
    });
  });
};

function paintGrid(e) {
  painted = true;
  if (painted) {
    e.target.classList.add("active");
  };
};

// Clear grid

const clearBtn = document.querySelector("#clear-canvas")

clearBtn.onclick = () => clearGrid()

function clearGrid() {
  canvas.innerHTML = "";
  makeGrid(sizeEl.value);
  refreshGrid()
}