class Sound {
  constructor() {
  }

  _finishedLoading(bufferList) {
    // Create two sources and play them both together.
    var source1 = context.createBufferSource();
    var source2 = context.createBufferSource();
    var source3 = context.createBufferSource();
    source1.buffer = bufferList[0];
    source2.buffer = bufferList[1];
    source3.buffer = bufferList[2];

    source1.connect(context.destination);
    source2.connect(context.destination);
    source3.connect(context.destination);
    // source1.start(0);
    // source2.start(0);
    // source3.start(0);
  }

  multiKill() {
    this.multiKillBuffer = new BufferLoader(
        context,
        [
          './MultiKill.mp3',
        ],
        (bufferList) => {
          // Create two sources and play them both together.
          var source1 = context.createBufferSource();
          source1.buffer = bufferList[0];

          source1.connect(context.destination);
          source1.start(0);
        }
      );

    this.multiKillBuffer.load();
  }

  holyShit() {
    this.holyShitBuffer = new BufferLoader(
      context,
      [
        './HolyShit.mp3',
      ],
      (bufferList) => {
        // Create two sources and play them both together.
        var source1 = context.createBufferSource();
        source1.buffer = bufferList[0];

        source1.connect(context.destination);
        source1.start(0);
      }
      );

    this.holyShitBuffer.load();
  }

  prepareToFight() {
    this.prepareToFightBuffer = new BufferLoader(
      context,
      [
        './PrepareToFight.mp3',
      ],
      (bufferList) => {
        // Create two sources and play them both together.
        var source1 = context.createBufferSource();
        source1.buffer = bufferList[0];

        source1.connect(context.destination);
        source1.start(0);
      }
      );

    this.prepareToFightBuffer.load();
  }
}

var sound = new Sound();
