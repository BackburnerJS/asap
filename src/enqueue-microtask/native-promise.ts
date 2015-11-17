const nativePromiseEnqueue: {
	supported: boolean,
	enqueue?: (microtask:()=>void)=>void
} = (() => {
  let hasNativePromise = (function () : boolean {
    let type = typeof Promise;
    let fnToString = Function.prototype.toString;
    return type === 'function' && fnToString.call(fnToString).replace('toString', 'Promise') === fnToString.call(Promise);
  })();

  if (!hasNativePromise) {
    return {
      supported: false,
      enqueue: undefined
    };
  }
  let promise = Promise.resolve();
  return {
    supported: true,
    enqueue: (microtask:()=>void)=>{
      promise.then(microtask);
    }
  };
})();

export default nativePromiseEnqueue;