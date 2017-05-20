function render (data) {
  const {player, ball, bricks} = data;

  renderBricks(bricks);

  playerDOM.style.left = player.x + "px";
  ballDOM.style.left = ball.x - ballCenter.x + "px";
  ballDOM.style.top = ball.y - ballCenter.y + "px";
}

let playerDOM;
let bricks = [];
let ballDOM;
let ballCenter;

function start() {
    playerDOM = document.querySelector('.player');
    playerDOM.style.top = "380px";

    ballDOM = document.querySelector('.ball');
    ballCenter = {x: ballDOM.offsetWidth / 2, y: ballDOM.offsetHeight / 2};
}

function renderBricks(bricksData) {
  const bricksTemplate = document.querySelector('.bricks-template');
  const template = bricksTemplate.content.querySelector('.brick');
  const bricksContainer = document.querySelector('.bricks');

  bricksTemplate.textContent = '';

  bricksData.forEach(brickData => {
    let brick = document.importNode(template, true);
    brick.style.left = brickData.x + 'px';
    brick.style.top = brickData.y + 'px';

    bricksContainer.appendChild(brick);
  })
}

document.addEventListener('DOMContentLoaded', start);

window.addEventListener(
    "deviceorientation",
    function(e){
      // e.alpha угол поворота
      // e.beta - угол наклона вперёд назад
      // e.gamma - влево вправо

      // let orientationAngle = window.orientation;

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
        move(Math.floor(result / 3));
      }

      document.querySelector('.orient-info').textContent = `v8 ${result} ${orientation}`;
    }
);

window.addEventListener('keydown', (e) => {
  if (e.keyCode == 39)
    move(1);
  if (e.keyCode == 37)
    move(-1);
});

// let audio = new AudioSample();
// audio.shoot();

function move(delta) {
  let currentLeft = parseInt(playerDOM.style.left);
  let newLeft = currentLeft + delta;

  newLeft = Math.max(newLeft, 0);
  newLeft = Math.min(newLeft, 400 - parseInt(playerDOM.offsetWidth));

  playerDOM.style.left = newLeft + 'px';
}
