function render (data) {
  // player {x}
  // ball {x, y}
  // bricks [{x, y}]
  const {player, ball, bricks} = data;
  console.log(bricks);

  renderBricks(bricks);

  playerDOM.style.left = player.x + "px";
  ballDOM.style.left = ball.x + "px";
  ballDOM.style.top = ball.y + "px";
}

const initial = {
  player: {
    x: 20
  },
  ball: {
    x: 0,
    y: 20
  },
  bricks: [
    {
      x: 20,
      y: 20
    }
  ]
}

let playerDOM;
let bricks = [];
let ballDOM;

function start(data) {
  playerDOM = document.querySelector('.player');
  ballDOM = document.querySelector('.ball');
  playerDOM.style.top = "380px"

  render(data);
}

function renderBricks(bricksData) {
  const bricksTemplate = document.querySelector('.bricks-template');
  const template = bricksTemplate.content.querySelector('.brick');
  const bricksContainer = document.querySelector('.bricks');

  bricksData.forEach(brickData => {
    let brick = document.importNode(template, true);
    brick.style.left = brickData.x + 'px';
    brick.style.top = brickData.y + 'px';

    bricksContainer.appendChild(brick);
  })
}

document.addEventListener('DOMContentLoaded', start.bind(null, initial));
