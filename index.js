const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

const PIXEL_SIZE = 3;
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
  init(canvas) {
    this.width = parseInt(canvas.getBoundingClientRect().width / PIXEL_SIZE);
    this.height = parseInt(canvas.getBoundingClientRect().height / PIXEL_SIZE);
    this.rows = Array(this.height);
    for (let i = 0; i < this.height; i++) {
      this.rows[i] = new Array(this.width);
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
        } else if (getRandomInt(2) == 0) {
          if (this.grainCanFallDownRight(i, j)) {
            this.moveGrain(i, j, i - 1, j + 1);
          } else if (this.grainCanFallDownLeft(i, j)) {
            this.moveGrain(i, j, i - 1, j - 1);
          }
        } else {
          if (this.grainCanFallDownLeft(i, j)) {
            this.moveGrain(i, j, i - 1, j - 1);
          } else if (this.grainCanFallDownRight(i, j)) {
            this.moveGrain(i, j, i - 1, j + 1);
          }
          // check if it can fall diagonally but start opposite dir
        }
      }
    }
  },
  clear() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  },
  placeGrain(x, y, color) {
    if (x >= 0 && x < this.height && y >= 0 && y < this.width) {
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
  grainCanFallDownLeft(x, y) {
    if (x > 0 && y > 0 && this.rows[x - 1][y - 1] == null) {
      return true;
    } else {
      return false;
    }
  },
  grainCanFallDownRight(x, y) {
    if (x > 0 && y < this.width - 1 && this.rows[x - 1][y + 1] == null) {
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
frame.init(canvas);
console.log(frame);
frame.step();
console.log(frame);
frame.draw();
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
document.addEventListener("DOMContentLoaded", async function () {
  let i = 0;
  let colorInt = 1048576;
  while (true) {
    console.log(i++);
    frame.placeGrain(50, 50, "#0F0f0f");
    frame.placeGrain(100, 75, "#" + colorInt.toString(16));
    colorInt += 64;
    console.log(colorInt.toString(16));
    frame.step();
    frame.draw();
    await sleep(1000 / FPS_CAP);
  }
});
