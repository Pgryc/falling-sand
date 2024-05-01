const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

const PIXEL_SIZE = 3;
const ARRAY_WIDTH = parseInt(canvas.getBoundingClientRect().width / PIXEL_SIZE);
const ARRAY_HEIGHT = parseInt(
  canvas.getBoundingClientRect().height / PIXEL_SIZE,
);
const FPS_CAP = 250;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}
const row = {
  cells: Array(),
};

const frame = {
  width: null,
  height: null,
  rows: Array(),
  init(width, height) {
    this.width = width;
    this.height = height;
    this.rows = Array(height);
    for (let i = 0; i < height; i++) {
      this.rows[i] = new Array(width);
    }
  },
  draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if (this.rows[i][j]) {
          ctx.fillStyle = this.rows[i][j].color;
          ctx.fillRect(
            j * PIXEL_SIZE,
            (this.height - i) * PIXEL_SIZE,
            PIXEL_SIZE,
            PIXEL_SIZE,
          );
        } else {
        }
      }
    }
  },
  dFillCheckboard() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        if ((i + j) % 2 == 1) {
          this.rows[i][j] = new Object();
          Object.assign(this.rows[i][j], grain);
        }
      }
    }
  },
  dFillHalfCheckboard() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width / 2; j++) {
        if ((i + j) % 2 == 1) {
          this.rows[i][j] = new Object();
          Object.assign(this.rows[i][j], grain);
        }
      }
    }
  },
  async step() {
    for (let i = 0; i < this.height; i++) {
      for (let j = this.width - 1; j >= 0; j--) {
        if (this.grainCanFallDown(i, j)) {
          this.moveGrain(i, j, i - 1, j);
        }
      }
    }
  },
  clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  placeGrain(x, y, color) {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.rows[x][y] = new Object();
      Object.assign(this.rows[x][y], grain);
      this.rows[x][y].color = color;
    }
  },
  grainCanFallDown(x, y) {
    if (x > 0 && this.rows[x - 1][y] == null) {
      return true;
    } else {
      return false;
    }
  },
  moveGrain(x, y, x2, y2) {
    this.rows[x2][y2] = this.rows[x][y];
    this.rows[x][y] = null;
  },
};

const grain = {
  color: "#0FfFff",
};
frame.init(ARRAY_WIDTH, ARRAY_HEIGHT);
console.log(frame);
frame.step();
console.log(frame);
frame.draw();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
document.addEventListener("DOMContentLoaded", async function () {
  let i = 0;
  while (true) {
    console.log(i++);
    frame.placeGrain(50, 50, "#0F0f0f");
    frame.placeGrain(50, 150, "#0F0f0f");
    frame.step();
    frame.draw();
    await sleep(1000 / FPS_CAP);
  }
});
