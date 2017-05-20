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

window.addEventListener(
    "deviceorientation",
    function(e){
      // e.alpha угол поворота
      // e.beta - угол наклона вперёд назад
      // e.gamma - влево вправо

      let orientationAngle = window.orientation;

      let orientation = 'Portrait';
      if (typeof window.orientation != "undefined" && Math.abs(window.orientation) === 90) {
        orientation = 'Landscape';
      }

      let result = '';
      if (orientation == 'Portrait') {
        result = e.gamma;
      } else {
        result = Math.sign(window.orientation) * e.beta;
      }

      if (Math.abs(result) > 10) {
        move(Math.floor(result * 3));
      }

      document.querySelector('.orient-info').textContent = `v7 ${result} ${orientation}`;
    }
);

// window.addEventListener('keydown', (e) => {
//   if (e.keyCode == 39)
//     move(1);
//   if (e.keyCode == 37)
//     move(-1);
// });

function move(delta) {
  let currentLeft = parseInt(playerDOM.style.left);
  let newLeft = currentLeft + delta;

  newLeft = Math.max(newLeft, 0);
  console.log(newLeft);
  newLeft = Math.min(newLeft, 400 - parseInt(playerDOM.offsetWidth));
  console.log(newLeft);

  playerDOM.style.left = newLeft + 'px';
}
