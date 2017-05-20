class Interface {
    constructor(data) {
        this._player = document.querySelector('.player');
        this._player.style.top = "400px";
        this._playerPosition = (data && data.player && data.player.x) || 0;

        this._ball = document.querySelector('.ball');
        this._ballOffset = {x: this._ball.offsetWidth / 2, y: this._ball.offsetHeight / 2};

        this._bricksTemplate = document.querySelector('.bricks-template');
        this._brickTemplate = this._bricksTemplate.content.querySelector('.brick');
        this._boomTemplate = this._bricksTemplate.content.querySelector('.boom');
        this._bricksContainer = document.querySelector('.bricks');
        this._boomsContainer = document.querySelector('.booms');

        this._bricksKills = [];

        if (data) {
            this.render(data);
        }

        this._initEvents();
    }

    render(data) {
        const {player, ball, bricks} = data;

        this._renderBricks(bricks);

        this._player.style.left = player.x + "px";
        this._ball.style.left = ball.x - this._ballOffset.x + "px";
        this._ball.style.top = ball.y - this._ballOffset.y + "px";
    }

    _renderBricks(bricks) {
        if (this._bricks && this._bricks.length === bricks.length) {
            return;
        }


        if (this._bricks) {
          let removedBrick = this._bricks.filter(brick => {
            return bricks.filter(newBrick => {
              return newBrick.x === brick.x && newBrick.y === brick.y
            }).length === 0;
          });

          this._bricksContainer.textContent = '';

          if (removedBrick.length > 0) {
            let currentKill = Number(new Date());
            if (this._bricksKills.length === 5 && (currentKill - this._bricksKills[0] < 1000 * 5)) {
                this._bricksKills = [];
                // Проиграть звук «multikill»
                sound.multiKill();
            }

            this._bricksKills.push(currentKill);
            this._bricksKills = this._bricksKills.slice(-5);
            let boom = document.importNode(this._boomTemplate, true);
            boom.style.left = removedBrick[0].x + 'px';
            boom.style.top = removedBrick[0].y + 'px';

            this._boomsContainer.appendChild(boom);
            let audio = new AudioSample();
            audio.shoot();

            setTimeout(() => {
              this._boomsContainer.removeChild(boom);
            }, 1000)
          }
        }

        bricks.forEach(brick => {
          let node = document.importNode(this._brickTemplate, true);
          node.style.left = brick.x + 'px';
          node.style.top = brick.y + 'px';

          this._bricksContainer.appendChild(node);
        });

        this._bricks = bricks;

    }

    _initEvents() {
        window.addEventListener(
            "deviceorientation",
            e => {
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
                    this._movePlayer(Math.floor(result / 3));
                }

                if (window.location.search.substr(1) === 'debug') {
                    document.querySelector('.orient-info').textContent = `v8 ${result} ${orientation}`;
                }
            }
        );

        window.addEventListener('keydown', e => {
            let moveTo = 6 * (e.shiftKey ? 5 : 1);

            if (e.keyCode == 39)
                this._movePlayer(moveTo);
            if (e.keyCode == 37)
                this._movePlayer(-moveTo);
        });
    }

    _movePlayer(delta) {
        let newLeft = this._playerPosition + delta;

        newLeft = Math.max(newLeft, 0);
        newLeft = Math.min(newLeft, 400 - parseInt(this._player.offsetWidth));

        this._playerPosition = newLeft;
        this._player.style.left = newLeft + 'px';
    }

    getPlayerPosition () {
        return this._playerPosition;
    }
}
// let audio = new AudioSample();
// audio.shoot();
