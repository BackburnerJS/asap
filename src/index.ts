import nativePromise from './enqueue-microtask/native-promise';
import browserMutationObserver from './enqueue-microtask/mutation-observer';

export const enqueueMicrotask = (function() : (microtask: () => void) => void {
  if (nativePromise.supported) {
    return nativePromise.enqueue;
  } else if (browserMutationObserver.supported) {
    return browserMutationObserver.enqueue;
  }
  
  throw new Error('no supported microtask queue in environment');
}());
