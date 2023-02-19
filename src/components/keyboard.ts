"use client"

import { EventBus } from "@/packages/eventbus";
import { useLayoutEffect } from "react";

export const keyboardEventBus = new EventBus('thc-keyboard');

export const KeyboardProvider = () => {
  useLayoutEffect(() => {
    const f = (e: KeyboardEvent) => {
      keyboardEventBus.emit(e.key, { detail: { event: e }});
    };

    window.addEventListener('keydown', f);

    return () => {

      window.addEventListener('keydown', f);
    }
  }, []);

  return null;
}