var expect = require('chai').expect;

var getNewCoordinates = require("../engine.js")

describe('get new coordinates', () => {
  it('в середине вправо вверх', () => {
    expect(getNewCoordinates(200, 400, 0.54)).to.deep.equal({ newX: 205.14135991653114,
      newY: 391.42291318636177,
        newAngle: 0.54 })
  })
})
