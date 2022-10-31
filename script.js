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

// Mouse status

let mouseDown = false
canvas.onmousedown = () => (mouseDown = true)
canvas.onmouseup = () => (mouseDown = false)

// Refresh and paint grid

let painted = false

function refreshGrid() {
  let gridItem = document.querySelectorAll(".grid-item");
  gridItem.forEach(item => {
    item.addEventListener("mouseenter", (e) => {
      if (mouseDown) {
        item.style.setProperty("--color-pick", color);
        paintGrid(e);
      };
    });
  });
};

canvas.onclick = (e) => {
  paintGrid(e)
};

function paintGrid(e) {
  if (!eraserBtn) {
    painted = true;
    e.target.classList.add("active");
  } else if (eraserBtn) {
    painted = false
    e.target.classList.remove("active");
  };
  if (!rainbowBtn) {
    return
  } else if (rainbowBtn) {
    painted = true
    e.target.classList.add("active");
  };
};

// Clear grid

const clearBtn = document.querySelector("#clear-canvas");
clearBtn.onclick = () => clearGrid();

function clearGrid() {
  canvas.innerHTML = "";
  makeGrid(sizeEl.value);
  refreshGrid()
};

// Toggle buttons

const eraserToggle = document.querySelector("#eraser-toggle");
let eraserBtn = false

eraserToggle.addEventListener("click", () => {
  if (!eraserBtn) {
    eraserBtn = true;
    eraserToggle.classList.add("toggle");
    eraserToggle.textContent = "Eraser: On";
  } else if (eraserBtn) {
    eraserBtn = false;
    color = document.querySelector("#color").value;
    eraserToggle.classList.remove("toggle");
    eraserToggle.textContent = "Eraser: Off";
  };
});

const rainbowToggle = document.querySelector("#rainbow-toggle");
let rainbowBtn = false

rainbowToggle.addEventListener("click", () => {
  if (!grayBtn) {
    if (!rainbowBtn) {
      rainbowBtn = true;
      rainbowToggle.classList.add("toggle");
      rainbowToggle.textContent = "Rainbow: On";
    } else if (rainbowBtn) {
      rainbowBtn = false;
      rainbowToggle.classList.remove("toggle");
      rainbowToggle.textContent = "Rainbow: Off";
    };
  } else if (grayBtn) {
    return;
  }; 
});

const grayToggle = document.querySelector("#gray-toggle");
let grayBtn = false

grayToggle.addEventListener("click", () => {
  if (!rainbowBtn) {
    if (!grayBtn) {
      grayBtn = true;
      grayToggle.classList.add("toggle");
      grayToggle.textContent = "Grayscale: On";
    } else if (grayBtn) {
      grayBtn = false;
      grayToggle.classList.remove("toggle");
      grayToggle.textContent = "Grayscale: Off";
    };
  } else if (rainbowBtn) {
    return;
  };
});

const gridToggle = document.querySelector("#grid-toggle");
let gridBtn = false

gridToggle.addEventListener("click", () => {
  if (!gridBtn) {
    gridBtn = true;
    gridToggle.classList.add("toggle");
    gridToggle.textContent = "Grid Lines: Off";
  } else if (gridBtn) {
    gridBtn = false;
    gridToggle.classList.remove("toggle");
    gridToggle.textContent = "Grid Lines: On";
  };
});