import { useSyncExternalStore } from "react";

const subscribe = () => () => {};
/** true in the browser after hydration, false during SSR — without a setState-in-effect. */
export function useIsClient() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}
