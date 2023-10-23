import { currentComponent } from "@/core";
import { deepEqual, isObject } from "@/utils";

type EffectCallback = () => void;
type DepsArray = ReadonlyArray<unknown>;

const previousDepsMap = new Map<string, DepsArray | []>();

const hasDepsChanged = (newDeps: DepsArray, oldDeps: DepsArray): boolean =>
  newDeps.some((dep, i) => (isObject(dep) ? !deepEqual(dep, oldDeps[i]) : dep !== oldDeps[i]));

export const useEffect = (callback: EffectCallback, deps: DepsArray) => {
  if (!currentComponent) {
    throw new Error("useEffect는 컴포넌트 안에서만 호출될 수 있습니다..");
  }

  const { id } = currentComponent;

  const previousDeps = previousDepsMap.get(id);

  if (!previousDeps) {
    callback();
  }

  if (previousDeps && hasDepsChanged(deps, previousDeps)) {
    callback();
  }

  previousDepsMap.set(id, deps);
};
