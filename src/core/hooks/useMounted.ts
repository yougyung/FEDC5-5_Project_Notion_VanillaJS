import { currentComponent } from "@/core";

const mountedComponents: Record<string, boolean> = {};

export function useMounted(callback: () => void) {
  if (!currentComponent) {
    throw new Error("useMounted는 컴포넌트 안에서만 호출될 수 있습니다.");
  }

  const { id } = currentComponent;

  if (!mountedComponents[id]) {
    mountedComponents[id] = true;
    setTimeout(callback, 0);
  }
}
