import EnqueueMicrotaskFunc from '../types/enqueue-microtask';

export default (nextStrategy: () => EnqueueMicrotaskFunc): EnqueueMicrotaskFunc => {
  let hasNativePromise = ((): boolean => {
    let type = typeof Promise;
    let fnToString = Function.prototype.toString;
    return type === 'function' && fnToString.call(fnToString).replace('toString', 'Promise') === fnToString.call(Promise);
  })();

  if (!hasNativePromise) {
    return nextStrategy();
  }

  let promise = Promise.resolve();
  return (microtask:() => void) => {
    promise.then(microtask);
  };
};
