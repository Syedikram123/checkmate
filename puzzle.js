const puzzles = [
  { fen: "6k1/5ppp/8/8/8/8/5PPP/6K1 w - - 0 1" },
  { fen: "8/8/8/8/8/2k5/3p4/2K5 w - - 0 1" },
];
let current = 0;
const game = new Chess();
const board = Chessboard('board', {
  draggable: true,
  position: puzzles[current].fen,
  onDrop: function(source, target) {
    const move = game.move({ from: source, to: target, promotion: 'q' });
    if (move === null) return 'snapback';
    board.position(game.fen());
  }
});
function loadNextPuzzle() {
  current = (current + 1) % puzzles.length;
  game.load(puzzles[current].fen);
  board.position(game.fen());
}
