import nativePromise from './enqueue-microtask/native-promise';
import browserMutationObserver from './enqueue-microtask/mutation-observer';
import nativeNextTick from './enqueue-microtask/next-tick';
import timers from './enqueue-microtask/timers';

export const enqueueMicrotask = (function() : (microtask: () => void) => void {
  if (nativePromise.supported) {
    return nativePromise.enqueue;
  } else if (browserMutationObserver.supported) {
    return browserMutationObserver.enqueue;
  } else if (nativeNextTick.supported) {
    return nativeNextTick.enqueue;
  } else {
    return timers.enqueue;
  }

}());