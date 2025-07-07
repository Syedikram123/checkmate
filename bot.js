const game = new Chess();

const board = Chessboard('board', {
  draggable: true,
  position: 'start',
  onDrop: onDrop
});

const engine = new Worker('https://cdn.jsdelivr.net/npm/stockfish/stockfish.js');

function onDrop(source, target) {
  const move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  if (move === null) return 'snapback';

  setTimeout(makeBestMove, 250);
}

function makeBestMove() {
  engine.postMessage('position fen ' + game.fen());
  engine.postMessage('go depth 10');

  engine.onmessage = function (event) {
    const bestMove = event.data.match(/^bestmove\s(\S+)/);
    if (bestMove) {
      game.move({
        from: bestMove[1].substr(0, 2),
        to: bestMove[1].substr(2, 2),
        promotion: 'q'
      });
      board.position(game.fen());
    }
  };
}