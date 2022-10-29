// Generate grid

const canvas = document.querySelector("#canvas");

function makeGrid(size) {
  canvas.style.setProperty("--grid-rows", size);
  canvas.style.setProperty("--grid-cols", size);
  for (c = 0; c < (size * size); c++) {
    let cell = document.createElement("div");
    canvas.appendChild(cell).className = "grid-item";
  };
  
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
});

// Color picker

const colorPicker = document.querySelector("#color")
let color = document.querySelector("#color").value;

colorPicker.addEventListener("input", () => {
  color = document.getElementById("color").value;
})

// Paint grid

let gridItem = document.querySelectorAll(".grid-item");
let painted = false;

gridItem.forEach(item => {
  item.addEventListener('mouseover', (e) => {
  item.style.setProperty("--color-pick", color)
  item.style.setProperty("border", "1px solid #555")
  paintGrid(e)
  });
});

function paintGrid(e) {
  painted = true;
  if (painted) {
    e.target.className = "active";
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