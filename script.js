// GENERATE GRID

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

// MOUSE STATUS

let mouseDown = false
canvas.onmousedown = () => (mouseDown = true)
canvas.onmouseup = () => (mouseDown = false)

// REFRESH GRID

function refreshGrid() {
  let gridItem = document.querySelectorAll(".grid-item");
  gridItem.forEach(item => {
    item.addEventListener("mousedown", (e) => {
      item.style.setProperty("--color-pick", color);
      paintGrid(e)
    });
    item.addEventListener("mouseenter", (e) => {
      if (mouseDown) {
        item.style.setProperty("--color-pick", color);
        paintGrid(e);
      } else if (!mouseDown) {
        return
      }
    });
  });
};

// PAINT GRID

let color = document.querySelector("#color").value;
let painted = false

function paintGrid(e) {
  if (!eraserBtn) {
    painted = true;
    e.target.classList.add("active");
  } else if (eraserBtn) {
    painted = false
    e.target.classList.remove("active");
  };
  if (rainbowBtn) {
    color = `hsl(${Math.random() * 360}, 100%, 50%)`;
  } else if (!rainbowBtn) {
    color = document.querySelector("#color").value;
  };
  if (grayBtn) {
    color = "rgba(0, 0, 0, 0.1)"; // PLACEHOLDER
  } else if (!grayBtn) {
    color = document.querySelector("#color").value;
  }
};

// GRID SIZE SLIDER

const sizeEl = document.querySelector("#size-el");
const sizeLabel = document.querySelector("#size-label");

sizeEl.addEventListener("input", () => {
  let size = sizeEl.value;
  sizeLabel.textContent = `${size}x${size}`;
  canvas.innerHTML = "";
  makeGrid(sizeEl.value);
  refreshGrid();
});

// COLOR PICKER

const colorPicker = document.querySelector("#color")

colorPicker.addEventListener("input", () => {
  color = document.querySelector("#color").value;
})

// CLEAR CANVAS

const clearBtn = document.querySelector("#clear-canvas");
clearBtn.onclick = () => clearGrid();

function clearGrid() {
  canvas.innerHTML = "";
  makeGrid(sizeEl.value);
  refreshGrid()
};

// GRID BORDER

function gridBorder() {
  let gridItem =  document.querySelectorAll(".grid-item")
  gridItem.forEach(item => {
    if (gridBtn) {
      item.classList.add("grid-border");
    } else if (!gridBtn) {
      item.classList.remove("grid-border");
    }
  });
  refreshGrid();
};

// TOGGLE BUTTONS

const eraserToggle = document.querySelector("#eraser-toggle");
let eraserBtn = false

eraserToggle.addEventListener("click", () => {
  if (!grayBtn && !rainbowBtn) {
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
  } else if (grayBtn || rainbowBtn) {
    return;
  };
});

const rainbowToggle = document.querySelector("#rainbow-toggle");
let rainbowBtn = false

rainbowToggle.addEventListener("click", () => {
  if (!grayBtn && !eraserBtn) {
    if (!rainbowBtn) {
      rainbowBtn = true;
      rainbowToggle.classList.add("toggle");
      rainbowToggle.textContent = "Rainbow: On";
    } else if (rainbowBtn) {
      rainbowBtn = false;
      rainbowToggle.classList.remove("toggle");
      rainbowToggle.textContent = "Rainbow: Off";
    };
  } else if (grayBtn || eraserBtn) {
    return;
  };
});

const grayToggle = document.querySelector("#gray-toggle");
let grayBtn = false

grayToggle.addEventListener("click", () => {
  if (!rainbowBtn && !eraserBtn) {
    if (!grayBtn) {
      grayBtn = true;
      grayToggle.classList.add("toggle");
      grayToggle.textContent = "Grayscale: On";
    } else if (grayBtn) {
      grayBtn = false;
      grayToggle.classList.remove("toggle");
      grayToggle.textContent = "Grayscale: Off";
    };
  } else if (rainbowBtn || eraserBtn) {
    return;
  };
});

const gridToggle = document.querySelector("#grid-toggle");
let gridBtn = false

gridToggle.addEventListener("click", () => {
  if (!gridBtn) {
    gridBtn = true;
    gridToggle.classList.add("toggle");
    gridToggle.textContent = "Grid Lines: On";
    gridBorder()
  } else if (gridBtn) {
    gridBtn = false;
    gridToggle.classList.remove("toggle");
    gridToggle.textContent = "Grid Lines: Off";
    gridBorder()
  };
});