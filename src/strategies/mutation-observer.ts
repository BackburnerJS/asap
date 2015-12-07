import EnqueueMicrotaskFunc from '../types/enqueue-microtask';
import MicrotaskFunc from '../types/microtask';

export default (nextStrategy: () => EnqueueMicrotaskFunc): EnqueueMicrotaskFunc => {
  if (typeof window === 'undefined') {
    return nextStrategy();
  }

  let BrowserMutationObserver: (Function) => void =
    (<any>window).MutationObserver || (<any>window).WebKitMutationObserver;
  if (!BrowserMutationObserver) {
    return nextStrategy();
  }

  return (() => {
    let node = document.createTextNode('');
    let queue: MicrotaskFunc[] = [];
    let observer = new BrowserMutationObserver(() => {
      for (let i = 0; i < queue.length; i++) {
        queue[i]();
      }
      queue.length = 0;
    });
    observer.observe(node, {
      characterData: true
    });

    let i = 0;
    return (microtask: MicrotaskFunc) => {
      queue.push(microtask);
      node.data = '' + (i = ++i % 2);
    }
  })();
};
