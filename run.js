const name = process.argv[2];

if (!name) {
  console.error("Usage: node run.js <painting name>");
  process.exit(1);
}

const paintings = {
  "starry night": () => require("./paintings/starry-night"),
  "starry night over the rhone": () =>  require("./paintings/starry-night-over-the-rhone"),
  "cafe terrace at night": () => require("./paintings/cafe-terrace-at-night"),
  "whistlers nocturne": () => require("./paintings/whistlers-nocturne"),
};

const key = name.toLowerCase();
const load = paintings[key];

if (!load) {
  console.error(`Unknown painting: "${name}"`);
  console.error("Available:", Object.keys(paintings).join(", "));
  process.exit(1);
}

const { draw } = load();
const { rows, columns } = process.stdout;
const cols = columns;

process.stdout.write("\x1b[?25l\x1b[2J\x1b[H");
draw({ rows, columns: cols }).catch(e => { console.error(e); process.exit(1); });
process.stdout.write("\x1b[?25h");