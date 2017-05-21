const lineSegment1 = {
    a: {
        x: 0,
        y: 4
    },
    b: {
        x: 8,
        y: 0
    }
};

const player = document.getElementById('player');
let playerPosition = 0;
function setPlayerPosition (pos) {
    const newPos = Math.min(Math.max(0, pos), 400)

    playerPosition = newPos;
    player.style.left = `${newPos}px`;
}

const THRESHOLD = 75;

document.body.addEventListener('keydown', (e) => {
    if (e.keyCode === 37) {
        setPlayerPosition(playerPosition - THRESHOLD);
    }
    if (e.keyCode === 39) {
        setPlayerPosition(playerPosition + THRESHOLD);
    }
});

const lineSegment2 = {
    a: {
        x: 0,
        y: 0
    },
    b: {
        x: 3,
        y: 3
    }
};

function degreeToRadians(degree) {
    return (degree * Math.PI) / 180;
}

function radiansToDegree(radian) {
    return (radian * 180) / Math.PI;
}

function lineByTwoPoints(point1, point2) {
    const {x: x1, y: y1} = point1;
    const {x: x2, y: y2} = point2;

    return {
        a: y1 - y2,
        b: x2 - x1,
        c: x1 * y2 - x2 * y1
    };
}

function lineByLineSegment(lineSegment) {
    return lineByTwoPoints(lineSegment.a, lineSegment.b)
}

function getLinesIntersectionPoint(line1, line2) {
    const {a: a1, b: b1, c: c1} = line1;
    const {a: a2, b: b2, c: c2} = line2;


    const x = (c2 / b2 - c1 / b1) / (a1 / b1 - a2 / b2);
    const y = (c2 / a2 - c1 / a1) / (b1 / a1 - b2 / a2);

    if (b1 === 0) {
        // vertical 1
        return {
            x: -c1 / a1,
            y
        }
    } else if (b2 === 0) {
        // vertical 2
        return {
            x: -c2 / a2,
            y
        }
    } else if (a1 === 0) {
        // horizontal 1
        return {
            x,
            y: -c1 / b1
        }
    } else if (a2 === 0) {
        // horizontal 2
        return {
            x,
            y: -c2 / b2
        }
    } else {
        return {x, y};
    }
}

const point1 = getLinesIntersectionPoint(
    lineByTwoPoints({
            x: 0,
            y: 0
        },
        {
            x: 1,
            y: 1
        }),
    lineByTwoPoints({
        x: 0,
        y: 1
    }, {
        x: 1,
        y: 0
    }));
if (point1.x !== 0.5 || point1.y !== 0.5) {
    throw new Error('getLinesIntersectionPoint1')
}

const point2 = getLinesIntersectionPoint(
    lineByTwoPoints({
            x: 0,
            y: 0
        },
        {
            x: 1,
            y: 1
        }),
    lineByTwoPoints({
        x: 0,
        y: 0.5
    }, {
        x: 1,
        y: 0.5
    }));
if (point2.x !== 0.5 || point2.y !== 0.5) {
    throw new Error('getLinesIntersectionPoint2')
}

// function pointIsOnLine(lineSegment, point) {
//     const {a: {x: x1, y: y1}, b: {x: x2, y: y2}} = lineSegment;
//     const {x, y} = point;
//
//     return (x - x1) / (x2 - x1) === (y - y1) / (y2 - y1);
// }

function pointIsOnLineSegmentSquare(lineSegment, point) {
    const {a: {x: x1, y: y1}, b: {x: x2, y: y2}} = lineSegment;
    const {x, y} = point;

    const leftX = x1 < x2 ? x1 : x2;
    const rightX = x1 > x2 ? x1 : x2;
    const leftY = y1 < y2 ? y1 : y2;
    const rightY = y1 > y2 ? y1 : y2;

    return leftX <= x && x <= rightX && leftY <= y && y <= rightY;
}

function getLineSegmentsIntersection(lineSegment1, lineSegment2) {
    const line1 = lineByLineSegment(lineSegment1);
    const line2 = lineByLineSegment(lineSegment2);

    const point = getLinesIntersectionPoint(line1, line2);

    if (point === undefined) {
        return undefined;
    } else {
        if (pointIsOnLineSegmentSquare(lineSegment1, point) && pointIsOnLineSegmentSquare(lineSegment2, point)) {
            return point;
        } else {
            return undefined;
        }
    }
}

let borders = [
    {
        a: {
            x: 0,
            y: 0
        },
        b: {
            x: 0,
            y: 500
        }
    },
    {
        a: {
            x: 0,
            y: 500
        },
        b: {
            x: 500,
            y: 500
        }
    },
    {
        a: {
            x: 500,
            y: 500
        },
        b: {
            x: 500,
            y: 0
        }
    },
    {
        a: {
            x: 500,
            y: 0
        },
        b: {
            x: 0,
            y: 0
        }
    }
];

const bricks = [];

for (let key = 0; key < 12; key++) {
    for (let key1 = 0; key1 < 4; key1++) {
        bricks.push({
            y: key1 * 42,
            x: key  * 42
        })
    }
}

const BRICK_SIZE = 40;
const field = document.getElementById('field');
bricks.forEach((brick) => {
    const $brick = document.createElement('div');
    $brick.style.width = `${BRICK_SIZE}px`;
    $brick.style.height = `${BRICK_SIZE}px`;
    $brick.style.left = `${brick.x}px`;
    $brick.style.top = `${brick.y}px`;
    $brick.style.position = 'absolute';
    $brick.style.backgroundColor = 'green';
    field.appendChild($brick);

    const reverted = {
        x: brick.x,
        y: 500 - brick.y
    };

    const a = {
        x: reverted.x,
        y: reverted.y,
    };

    const b = {
        x: reverted.x + BRICK_SIZE,
        y: reverted.y,
    };

    const c = {
        x: reverted.x,
        y: reverted.y - BRICK_SIZE,
    };

    const d = {
        x: reverted.x + BRICK_SIZE,
        y: reverted.y - BRICK_SIZE,
    };

    borders.push({
        a: a,
        b: b,
        $brick: $brick
    });

    borders.push({
        a: b,
        b: c,
        $brick: $brick
    });

    borders.push({
        a: c,
        b: d,
        $brick: $brick
    });

    borders.push({
        a: d,
        b: a,
        $brick: $brick
    });
});

const MAX_WAY_LENGTH = 1000;
function getFirstIntersection(point, direction, lineSegments) {
    const directionPoint = calculatePointByFirstAndDirection(point, direction, MAX_WAY_LENGTH);

    const startLineSegment = {
        a: point,
        b: directionPoint
    };

    const allObjects = lineSegments
        .map((lineSegment) => {
            const newPoint = getLineSegmentsIntersection(startLineSegment, lineSegment);

            const synchronized = newPoint ? {
                x: Math.min(Math.max(1, newPoint.x), 499),
                y: Math.min(Math.max(1, newPoint.y), 499)
            } : undefined;

            const distance = synchronized ? getDistance(point, synchronized) : 0;

            return ({
                point: synchronized,
                lineSegment,
                distance
            });
        });

    return allObjects.filter((object) => {
        return object.distance > 0.0001;
    })
        .sort((a, b) => {
            return a.distance - b.distance;
        })[0];
}

function getDistance(point1, point2) {
    const {x: x1, y: y1} = point1;
    const {x: x2, y: y2} = point2;

    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1))
}

function calculatePointByFirstAndDirection(point, direction, distance) {
    const offsetX = distance * Math.cos(direction);
    const offsetY = distance * Math.sin(direction);

    return {
        x: point.x + offsetX,
        y: point.y + offsetY
    };
}

function getDirection(lineSegment) {
    const {a: {x: x1, y: y1}, b: {x: x2, y: y2}} = lineSegment;

    const sin = (y1 - y2) / (x1 - x2);
    if (sin === -Infinity) {
        return degreeToRadians(90);
    } else if (sin === Infinity) {
        return degreeToRadians(90);
    } else {
        return Math.asin(sin);
    }
}

const testPoint = {x: 500, y: 330.94010767584984};
const testDirection = 2.0943951023931953;

function getNextPoint(point, direction, distance, lineSegments) {
    let currentDistance = distance;
    let currentPoint = point;
    let currentDirection = direction;

    if (currentPoint.y < 5) {
        if (currentPoint.x < playerPosition || currentPoint.x > (playerPosition + 100)) {
            alert('GAME OVER!');
            location.reload();
        }
    }

    while (true) {
        const firstIntersection = getFirstIntersection(currentPoint, currentDirection, lineSegments);
        const {
            point: intersection,
            lineSegment: intersectionSegment,
            distance: currentDirectDistance
        } = firstIntersection;

        if (currentDistance > currentDirectDistance) {
            currentDistance -= currentDirectDistance;

            if (intersectionSegment.$brick) {
                try {
                    field.removeChild(intersectionSegment.$brick);
                }catch(e){}
                const removing = [];

                borders.forEach((border) => {
                    if (border.$brick === intersectionSegment.$brick) {
                        removing.push(border);
                    }
                });

                removing.forEach((border) => {
                    borders = borders.filter((b) => b !== border);
                })
            }

            const obstacleDirection = getDirection(intersectionSegment);

            const t = obstacleDirection + (Math.PI - ((Math.PI - obstacleDirection) + currentDirection ));

            currentDirection = t % (2 * Math.PI);
            currentPoint = intersection;
        } else {
            const newPoint = calculatePointByFirstAndDirection(currentPoint, currentDirection, currentDistance);

            return {
                point: newPoint,
                direction: currentDirection
            }
        }
    }
}


let point = {
    x: 100,
    y: 100
};
let direction = degreeToRadians(Math.random() * 30 + 30)

const ball = document.getElementById('ball');
setBallCoordinates(point);

function setBallCoordinates({x, y}) {
    ball.style.top = `${(500 - y) - 10}px`;
    ball.style.left = `${x - 10}px`;
}

// console.log(getFirstIntersection(testPoint, testDirection, borders));

let lastTime = Date.now();
const tick = () => {
    const now = Date.now();
    const delay = now - lastTime;
    lastTime = now;
    const {point: newPoint, direction: newDirection} = getNextPoint(point, direction, Math.min(delay / 2, 50), borders);
    setBallCoordinates(newPoint);
    direction = newDirection;
    point = newPoint;

    requestAnimationFrame(tick)
};

requestAnimationFrame(tick);
