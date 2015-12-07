import MicrotaskFunc from './microtask';

interface EnqueueMicrotaskFunc {
  (microtask: MicrotaskFunc): void;
}
export default EnqueueMicrotaskFunc;
