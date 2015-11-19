// TODO:
// We should be able to use node type definitions
// here but rollup seems to have an issue with them
// being referenced.
declare var process: any;

const nativeNextTick: {
	supported: boolean,
	enqueue?: (microtask: () => void) => void
} = (() => {
  
  const nextTick = (() => {
    let nextTick = process.nextTick;
    let version = process.versions.node.match(/^(?:(\d+)\.)?(?:(\d+)\.)?(\*|\d+)$/);
    let [_, minor, patch] = version;

    if (Array.isArray(version) && minor === '1' && patch === '10') {
      nextTick = setImmediate;
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