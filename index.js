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
            x: a1,
            y
        }
    } else if (b2 === 0) {
        // vertical 2
        return {
            x: a2,
            y
        }
    } else if (a1 === 0) {
        // horizontal 1
        return {
            x,
            y: -c1
        }
    } else if (a2 === 0) {
        // horizontal 2
        return {
            x,
            y: -c2
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

const borders = [
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

const MAX_WAY_LENGTH = 1000;
const startPoint = {
    x: 100,
    y: 100
};

function getFirstIntersection(point, direction, lineSegments) {
    const directionPoint = {
        x: MAX_WAY_LENGTH * Math.cos(direction),
        y: MAX_WAY_LENGTH * Math.sin(direction)
    };

    const startLineSegment = {
        a: point,
        b: directionPoint
    };

    return lineSegments.map((lineSegment) => getLineSegmentsIntersection(startLineSegment, lineSegment))
}

console.log(getFirstIntersection(startPoint, degreeToRadians(30), borders))
