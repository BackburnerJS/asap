import EnqueueMicrotaskFunc from '../types/enqueue-microtask';

export default (nextStrategy: () => EnqueueMicrotaskFunc): EnqueueMicrotaskFunc => {
  const timer = (microtask:() => void) => {
    const handle = () => {
      clearInterval(interval);
      clearTimeout(timeout);
      microtask();
    }

    let timeout = setTimeout(handle, 0);
    let interval = setInterval(handle, 0);
  }

  return (microtask: () => void) => {
    timer(microtask);
  };
};
