/// <reference path="../../typings/node/node.d.ts" />

const nativeNextTick: {
	supported: boolean,
	enqueue?: (microtask: () => void) => void
} = (() => {
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
    return {
      supported: false,
      enqueue: undefined
    };
  }

  return {
    supported: true,
    enqueue: (microtask:() => void) => {
      nextTick(microtask);
    }
  };
})();

export default nativeNextTick;