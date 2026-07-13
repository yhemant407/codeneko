export type PetState = "IDLE" | "DRAGGING" | "SLEEPING";

export type Direction = "LEFT" | "RIGHT";

export type PetAnimation = {
  frames: string[];
  frameDuration: number;
  loop: boolean;
};
