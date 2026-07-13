import idle from "../assets/cat/idle.png";
import dragging from "../assets/cat/dragging.png";
import sleeping from "../assets/cat/sleeping.png";

import type { PetAnimation, PetState } from "./types";

export const animations: Record<PetState, PetAnimation> = {
  IDLE: {
    frames: [idle],
    frameDuration: 500,
    loop: true,
  },

  DRAGGING: {
    frames: [dragging],
    frameDuration: 150,
    loop: true,
  },

  SLEEPING: {
    frames: [sleeping],
    frameDuration: 500,
    loop: true,
  },
};
