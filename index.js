const canvas = document.getElementById("mainCanvas");
const ctx = canvas.getContext("2d");

const PIXEL_SIZE = 3;
const ARRAY_WIDTH = parseInt(canvas.getBoundingClientRect().width / PIXEL_SIZE);
const ARRAY_HEIGHT = parseInt(
  canvas.getBoundingClientRect().height / PIXEL_SIZE,
);

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
    // for (let i = this.height - 1; i >= 0; i--) {
    for (let i = 0; i < this.height; i++) {
      for (let j = this.width - 1; j >= 0; j--) {
        if (this.grainCanFallDown(i, j)) {
          this.moveGrain(i, j, i - 1, j);
        }
        // } else if (j > 0 && this.rows[i - 1][j - 1] == null) {
        //   this.rows[i - 1][j - 1] = this.rows[i][j];
        //   this.rows[i][j] = null;
        // } else if (j < this.width - 1 && this.rows[i - 1][j + 1] == null) {
        //   this.rows[i + 1][j + 1] = this.rows[i][j];
        //   this.rows[i][j] = null;
        // }
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

// buffer = makeArray(ARRAY_HEIGHT, ARRAY_WIDTH);
// fillArrayCheckboard(buffer);
// draw(buffer, ctx);
//
// ctx.fillStyle = "gray";

// function makeArray(d1, d2) {
//   var arr = new Array(d1),
//     i,
//     l;
//   for (i = 0, l = d2; i < l; i++) {
//     arr[i] = new Array(d1);
//   }
//   return arr;
// }
//
// function fillArrayCheckboard(arr) {
//   for (i = 0, l1 = arr.length; i < l1; i++) {
//     for (j = 0, l2 = arr[i].length; j < l2; j++) {
//       if ((i + j) % 2 == 1) {
//         arr[i][j] = true;
//       } else {
//         arr[i][j] = false;
//       }
//     }
//   }
// }
//
// function draw(arr, ctx) {
//   for (i = 0, l1 = arr.length; i < l1; i++) {
//     for (j = 0, l2 = arr[i].length; j < l2; j++) {
//       if (arr[i][j]) {
//         ctx.fillRect(i * PIXEL_SIZE, j * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
//       } else {
//       }
//     }
//   }
// }

// console.log(ARRAY_WIDTH);
// console.log(ARRAY_HEIGHT);
frame.init(ARRAY_WIDTH, ARRAY_HEIGHT);
// frame.dFillHalfCheckboard();
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
    frame.step();
    frame.draw();
    await sleep(20);
  }
});
