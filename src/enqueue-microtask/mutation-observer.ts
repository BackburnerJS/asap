declare var WebKitMutationObserver: any;

const mutationObserverEnqueue: {
  supported: boolean,
  enqueue?: (microtask: () => void) => void
} = (() => {
  let browserWindow = (typeof window !== 'undefined') ? window : undefined;
  let BrowserMutationObserver = MutationObserver || WebKitMutationObserver;
  let hasMutationObserver = (() :boolean =>  {
    return !!(MutationObserver || WebKitMutationObserver);
  })();
  
  if (!hasMutationObserver) {
    return {
      supported: false,
      enqueue: undefined
    };
  }

  return {
    supported: true,
    enqueue: (microtask:() => void) => {
      let iterations = 0;
      let node = document.createTextNode('');
      let observer = new BrowserMutationObserver(microtask);
      observer.observe(node, {
        characterData: true
      });
      
      return () => {
        node.data = `${(iterations = ++iterations % 2)}`;
      }
    }
  };
  
})();

export default mutationObserverEnqueue;