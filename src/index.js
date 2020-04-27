const blessed = require("blessed");
const contrib = require("blessed-contrib");
const Terminal = require('./Terminal');

const screen = blessed.screen();
const grid = new contrib.grid({
    rows: 12,
    cols: 12,
    screen: screen,
});

let initTerminal = new Terminal(blessed, screen, grid);

initTerminal.createTerminal();

screen.key(["escape", "q", "C-c"], function (ch, key) {
  return process.exit(0);
});