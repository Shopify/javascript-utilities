// for now we just use rAF but we should use some kind of fastDOM implementation
export function read(callback: FrameRequestCallback): number {
  return requestAnimationFrame(callback);
}

export function write(callback: FrameRequestCallback): number {
  return requestAnimationFrame(callback);
}
