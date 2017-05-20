var expect = require('chai').expect;

var getNewCoordinates = require("./../engine.js")

describe('get new coordinates', () => {
  it('летит вправо вверх', () => {
    expect(getNewCoordinates(200, 400, 0.54)).to.deep.equal({newX: 205.14135991653114, newY: 391.42291318636177, newAngle: 0.54})
    expect(getNewCoordinates(205.14135991653114, 391.42291318636177, 0.54)).to.deep.equal({newX: 210.2827198330623, newY: 382.84582637272354, newAngle: 0.54})

    //console.log(getNewCoordinates(205.14135991653114, 391.42291318636177, 0.54))
  })
  it('летит вправо вверх + столкновение справа', () => {
    expect(getNewCoordinates(398, 200, 0.54)).to.deep.equal({newX: 396.85864008346886, newY: 191.42291318636177, newAngle: 2.601592653589793})
    //expect(getNewCoordinates(205.14135991653114, 391.42291318636177, 0.54)).to.deep.equal({newX: 210.2827198330623, newY: 382.84582637272354, newAngle: 0.54})

    console.log(getNewCoordinates(398, 200, 0.54))
  })


});
