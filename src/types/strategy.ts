import EnqueueMicrotaskFunc from './enqueue-microtask';
interface StrategyFunc {
  (nextStrategy: () => EnqueueMicrotaskFunc): EnqueueMicrotaskFunc;
}
export default StrategyFunc;
