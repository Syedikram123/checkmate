/*! chessboard.js v1.0.0 | (c) 2024 Chris Oakman | MIT License | https://github.com/oakmac/chessboardjs */
(function() {
  const Chessboard = function(containerId, config = {}) {
    const container = document.getElementById(containerId);
    let position = config.position || 'start';
    let draggable = config.draggable || false;
    let onDrop = config.onDrop || function() {};

    const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const ranks = ['8', '7', '6', '5', '4', '3', '2', '1'];

    let currentPosition = {};

    function createBoard() {
      container.innerHTML = '';
      const board = document.createElement('div');
      board.className = 'board';

      for (let r = 0; r < 8; r++) {
        for (let f = 0; f < 8; f++) {
          const square = document.createElement('div');
          const file = files[f];
          const rank = ranks[r];
          const squareColor = (r + f) % 2 === 0 ? 'light' : 'dark';

          square.className = `square ${squareColor}`;
          square.dataset.square = file + rank;

          board.appendChild(square);
        }
      }

      container.appendChild(board);
    }

    function setPosition(fen) {
      const squares = container.querySelectorAll('.square');
      squares.forEach(sq => sq.innerHTML = ''); // Clear board

      const fenParts = fen.split(' ')[0];
      const rows = fenParts.split('/');
      for (let r = 0; r < 8; r++) {
        let col = 0;
        for (let ch of rows[r]) {
          if (isNaN(ch)) {
            const square = container.querySelector(`[data-square="${files[col]}${8 - r}"]`);
            const piece = document.createElement('img');
            const color = ch === ch.toUpperCase() ? 'w' : 'b';
            piece.src = `https://chessboardjs.com/img/chesspieces/wikipedia/${color}${ch.toLowerCase()}.png`;
            piece.draggable = draggable;
            piece.className = 'piece';
            square.appendChild(piece);
            col++;
          } else {
            col += parseInt(ch);
          }
        }
      }

      currentPosition = fen;
    }

    function getPosition() {
      return currentPosition;
    }

    createBoard();
    setPosition(position);

    return {
      position: function(pos) {
        if (pos) {
          setPosition(pos);
        } else {
          return getPosition();
        }
      }
    };
  };

  window.Chessboard = Chessboard;
})();
