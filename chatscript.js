// Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

// Create an analyser node
const analyser = audioContext.createAnalyser();
analyser.fftSize = 256; // You can adjust this value to change the resolution of the visualization

// Create a buffer for the audio data
const bufferLength = analyser.frequencyBinCount;
const dataArray = new Uint8Array(bufferLength); // like java when not static

// Create a canvas element for the visualization
const canvas = document.createElement("canvas");
document.body.appendChild(canvas);
const ctx = canvas.getContext("2d");

// Connect the audio context to the analyser
const source = audioContext.createMediaElementSource(audioElement);
source.connect(analyser);
analyser.connect(audioContext.destination);

// Connect the analyser to the destination (speakers)

// Connect the analyser to the destination (speakers)
function visualize() {
  // Get the current frequency data
  analyser.getByteFrequencyData(dataArray);

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the frequency data as a bar graph
  const barWidth = canvas.width / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const barHeight = dataArray[i] / 2;

    ctx.fillStyle = "rgb(" + (barHeight + 100) + ",50,50)";
    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);

    x += barWidth + 1;
  }

  // Call visualize again on the next animation frame
  requestAnimationFrame(visualize);
}

// Start the visualization
visualize();

// Load an audio file
const audioElement = new Audio("./Moneko.mp3");
audioElement.crossOrigin = "anonymous";

// Ensure the audio is loaded before starting the visualization
audioElement.addEventListener("canplay", () => {
  audioElement.play();
});
