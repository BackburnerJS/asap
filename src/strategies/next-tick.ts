import EnqueueMicrotaskFunc from '../types/enqueue-microtask';

export default (nextStrategy: () => EnqueueMicrotaskFunc): EnqueueMicrotaskFunc => {
  const isNode = typeof self === 'undefined' &&
  typeof process !== 'undefined' && {}.toString.call(process) === '[object process]';

  const nextTick = (() => {
    let nextTick;
    if (isNode) {
      nextTick = process.nextTick;
      let version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
      let [_, minor, patch] = version;

      if (Array.isArray(version) && minor === '1' && patch === '10') {
        nextTick = setImmediate;
      }
    }

    return nextTick;
  })();

  let hasNextTick = (() :boolean => {
    let type = typeof nextTick;
    return type === 'function';
  })();

  if (!hasNextTick) {
    return nextStrategy();
  }

  return (microtask:() => void) => {
    nextTick(microtask);
  };
};
