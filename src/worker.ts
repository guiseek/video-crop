/// <reference lib="webworker"/>

function transform(
  frame: CanvasImageSource,
  controller: TransformStreamDefaultController<VideoFrame>
) {
  // O corte de um quadro de vídeo existente
  // é compatível com a API no Chrome 94+.
  const newFrame = new VideoFrame(frame, {
    visibleRect: {
      x: 320, width: 640,
      y: 180, height: 360
    },
  });
  
  controller.enqueue(newFrame);

  if ('close' in frame) {
    frame.close();
  }
}

addEventListener('message', ({ data }) => {
  if (data.operation === 'crop') {
    const { readable, writable } = data;
    readable.pipeThrough(new TransformStream({ transform })).pipeTo(writable);
  } else {
    console.error('Unknown data.operation', data.operation);
    postMessage(`worker response to ${data.operation}`);
  }
});
