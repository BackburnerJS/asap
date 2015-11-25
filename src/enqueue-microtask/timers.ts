const timer: {
  supported: boolean,
  enqueue?: (microtask: () => void) => void
} = (() => {
  
  const timer = (microtask:() => void) => {
    const handle = () => {
      clearInterval(interval);
      clearTimeout(timeout);
      microtask();
    }
    
    let timeout = setTimeout(handle, 0);
    let interval = setInterval(handle, 0);
  }

  return {
    supported: true,
    enqueue: (microtask:() => void) => {
      timer(microtask);
    }
  };
})();

export default timer;