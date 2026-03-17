import { useEffect } from "react";
import type { RefObject } from "react";

type Params = {
  isOpen: boolean;
  refs: Array<RefObject<HTMLElement | null>>;
  onClose: () => void;
};

export function useOutsideClose({ isOpen, refs, onClose }: Params) {
  useEffect(() => {
    if (!isOpen) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      for (const r of refs) {
        const el = r.current;
        if (el && el.contains(target)) return;
      }
      onClose();
    };

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("pointerdown", onPointerDown, true);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("pointerdown", onPointerDown, true);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [isOpen, onClose, refs]);
}

