import nativePromise from './enqueue-microtask/native-promise';

export const enqueueMicrotask = (function () : (microtask:()=>void)=>void {
	if (nativePromise.supported) {
    	return nativePromise.enqueue;
    }
    throw new Error('no supported microtask queue in environment');
}());
