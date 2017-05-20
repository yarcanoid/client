class Sound {
  constructor() {
    this.bufferLoader = new BufferLoader(
      context,
      [
        './MultiKill.mp3',
        './HolyShit.mp3',
        './PrepareToFight.mp3',
      ],
      this._finishedLoading.bind(this)
      );

    this.bufferLoader.load();
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
    source1.start(0);
    // source2.start(0);
    // source3.start(0);
  }

  multiKill() {
    source1.start(0);
  }

  holyShit() {
    source2.start(0);
  }

  prepareToFight() {
    source3.start(0);
  }
}
