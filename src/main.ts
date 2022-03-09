import './style.css'

import VideoCropWorker from './worker?worker'


/**
 * Util
 */
function find<K extends keyof HTMLElementTagNameMap>(
  query: string
): HTMLElementTagNameMap[K]
function find<K extends keyof HTMLElementTagNameMap>(query: K) {
  return document.querySelector(query)
}

/**
 * Verifica suporte da API
 */
if (
  typeof MediaStreamTrackProcessor === 'undefined' ||
  typeof MediaStreamTrackGenerator === 'undefined'
) {
  find('output').innerText = 
    `Seu navegador não suporta a API experimental MediaStreamTrack
      para fluxos de mídia que podem ser inseridos. Veja a nota no final da página.`
}

const video = {
  original: find<'video'>('#original'),
  cropped: find<'video'>('#cropped'),
}
const button = find('button')

const worker = new VideoCropWorker()

button.addEventListener('click', async () => {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  })
  video.original.srcObject = stream

  const [track] = stream.getVideoTracks()
  const processor = new MediaStreamTrackProcessor({ track })
  const { readable } = processor

  const generator = new MediaStreamTrackGenerator({ kind: 'video' })
  const { writable } = generator
  video.cropped.srcObject = new MediaStream([generator])

  worker.postMessage(
    {
      operation: 'crop',
      readable,
      writable,
    },
    [readable, writable] as StructuredSerializeOptions
  )
})
