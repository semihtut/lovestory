import { useEffect, useRef } from 'react';

export function useShake(onShake: () => void, threshold = 30) {
  const lastShake = useRef(0);
  const cbRef = useRef(onShake);
  cbRef.current = onShake;

  useEffect(() => {
    const handler = (e: DeviceMotionEvent) => {
      const a = e.accelerationIncludingGravity;
      if (!a) return;
      const force = Math.abs(a.x || 0) + Math.abs(a.y || 0) + Math.abs(a.z || 0);
      if (force > threshold) {
        const now = Date.now();
        if (now - lastShake.current > 2500) {
          lastShake.current = now;
          cbRef.current();
        }
      }
    };

    // iOS 13+ requires permission
    const dm = DeviceMotionEvent as unknown as { requestPermission?: () => Promise<string> };
    if (typeof dm.requestPermission === 'function') {
      // Permission will be requested on first user interaction
      const requestOnce = () => {
        dm.requestPermission!().then(state => {
          if (state === 'granted') {
            window.addEventListener('devicemotion', handler);
          }
        }).catch(() => {});
        window.removeEventListener('click', requestOnce);
      };
      window.addEventListener('click', requestOnce);
      return () => {
        window.removeEventListener('click', requestOnce);
        window.removeEventListener('devicemotion', handler);
      };
    }

    window.addEventListener('devicemotion', handler);
    return () => window.removeEventListener('devicemotion', handler);
  }, [threshold]);
}
