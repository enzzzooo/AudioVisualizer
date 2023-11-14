// make a visualizer for audio
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API
const audioCtx = new AudioContext();
const analyzer = audioCtx.createAnalyser();
SourceBuffer.connect(analyzer);
analyzer.connect(distortion);
distortion.connect(audioCtx.destination);
