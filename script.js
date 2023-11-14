// make a visualizer for audio
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

// also check https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Basic_usage
const audioCtx = new AudioContext();
const analyzer = audioCtx.createAnalyser();
SourceBuffer.connect(analyzer);
analyzer.connect(distortion);
distortion.connect(audioCtx.destination);
// make a canvas that displays audio in a visual way
const canvas = document.querySelector(".visualizer"); // select canvas
const canvasCtx = canvas.getContext("2d"); // get context
const WIDTH = canvas.width; // get width
const HEIGHT = canvas.height; // get height
// draw the audio
function draw() {
  // make a buffer
  requestAnimationFrame(draw);
  const bufferLength = analyzer.frequencyBinCount;
  const dataArray = new Uint8Array(bufferLength);
  analyzer.getByteFrequencyData(dataArray);
  // clear canvas
  canvasCtx.clearRect(0, 0, WIDTH, HEIGHT);
  // draw bars
  const barWidth = (WIDTH / bufferLength) * 2.5;
  let barHeight;
  let x = 0;
  for (let i = 0; i < bufferLength; i++) {
    barHeight = dataArray[i];
    canvasCtx.fillStyle = "rgb(" + (barHeight + 100) + ", 50, 50)";
    canvasCtx.fillRect(x, HEIGHT - barHeight / 2, barWidth, barHeight / 2);
    x += barWidth + 1;
  }
}
draw();
// make a button that plays the audio
const playButton = document.querySelector(".play");
playButton.addEventListener("click", function () {
  audioCtx.resume().then(() => {
    console.log("Playback resumed successfully");
  });
});
// make a button that pauses the audio
const pauseButton = document.querySelector(".pause");
pauseButton.addEventListener("click", function () {
  audioCtx.suspend().then(() => {
    console.log("Playback paused successfully");
  });
});
// make a button that stops the audio
const stopButton = document.querySelector(".stop");
stopButton.addEventListener("click", function () {
  audioCtx.close().then(() => {
    console.log("Playback stopped successfully");
  });
});
