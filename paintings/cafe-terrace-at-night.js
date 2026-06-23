const { Jimp } = require("jimp");
const path = require("path");
const { renderPixel } = require("./render");

async function draw({ rows, columns }) {
  const img = await Jimp.read(path.join(__dirname, "img/cafe-terrace-at-night.jpg"));
  img.resize({ w: columns, h: rows * 2 });

  const lines = [];
  for (let r = 0; r < rows; r++) {
    let row = "";
    for (let c = 0; c < columns; c++) {
      row += renderPixel(img.getPixelColor(c, r * 2));
    }
    lines.push(row);
  }

  process.stdout.write(lines.join("\n") + "\n");
}

module.exports = { draw };