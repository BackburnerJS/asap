import nativePromise from './strategies/native-promise';
import browserMutationObserver from './strategies/mutation-observer';
import nativeNextTick from './strategies/next-tick';
import timers from './strategies/timers';
import EnqueueMicrotaskFunc from './types/enqueue-microtask';
import StrategyFunc from './types/strategy';

const strategies: StrategyFunc[] = [nativePromise, browserMutationObserver, nativeNextTick, timers];
let index = 0;

function nextStrategy(): EnqueueMicrotaskFunc {
  return strategies[index++](nextStrategy);
}

export default nextStrategy();
