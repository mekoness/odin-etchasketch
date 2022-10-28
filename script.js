// Generate grid

const canvas = document.querySelector("#canvas");

function makeGrid(size) {
  canvas.style.setProperty('--grid-rows', size);
  canvas.style.setProperty('--grid-cols', size);
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
  canvas.innerHTML = ""
  makeGrid(sizeEl.value);
})