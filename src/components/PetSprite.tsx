import { useEffect, useState } from "react";
import { animations } from "../pet/animations";
import type { Direction, PetState } from "../pet/types";
import idleBlink from "../assets/cat/idle_blink.png";
import idleEyeBase from "../assets/cat/idle_eye_base.png";

type PetSpriteProps = {
  state: PetState;
  direction: Direction;
  eyeOffset: {
    x: number;
    y: number;
  };
  onMouseDown: () => void;
};

function PetSprite({
  state,
  direction,
  eyeOffset,
  onMouseDown,
}: PetSpriteProps) {
  const [frameIndex, setFrameIndex] = useState(0);
  const [isBlinking, setIsBlinking] = useState(false);

  const animation = animations[state];
  const currentImage =
    state === "IDLE" ? idleEyeBase : animation.frames[frameIndex];

  //use effect
  useEffect(() => {
    setFrameIndex(0);

    if (animation.frames.length <= 1) {
      return;
    }

    const interval = window.setInterval(() => {
      setFrameIndex((currentFrame) => {
        const nextFrame = currentFrame + 1;

        if (nextFrame >= animation.frames.length) {
          return animation.loop ? 0 : currentFrame;
        }

        return nextFrame;
      });
    }, animation.frameDuration);

    return () => {
      clearInterval(interval);
    };
  }, [state, animation]);

  useEffect(() => {
    if (state !== "IDLE") {
      setIsBlinking(false);
      return;
    }

    let blinkTimer: number;
    let openTimer: number;

    const scheduleBlink = () => {
      const delay = 2500 + Math.random() * 3500;

      blinkTimer = window.setTimeout(() => {
        setIsBlinking(true);

        openTimer = window.setTimeout(() => {
          setIsBlinking(false);
          scheduleBlink();
        }, 220);
      }, delay);
    };

    scheduleBlink();

    return () => {
      clearTimeout(blinkTimer);
      clearTimeout(openTimer);
    };
  }, [state]);

  //return
  return (
    <div
      className={`pet-wrapper pet-${state.toLowerCase()}`}
      onMouseDown={onMouseDown}
    >
      <div
        className={`pet-direction ${
          direction === "LEFT" ? "face-left" : "face-right"
        }`}
      >
        <div className="pet-body">
          <img
            src={
              state === "IDLE"
                ? isBlinking
                  ? idleBlink
                  : idleEyeBase
                : animation.frames[frameIndex]
            }
            className={`pet ${state === "SLEEPING" ? "pet-sleeping" : ""}`}
            draggable={false}
            alt="CodeNeko"
          />

          {state === "IDLE" && !isBlinking && (
            <div className="dynamic-eyes">
              <span className="dynamic-eye left-eye">
                <span
                  className="eye-highlight"
                  style={{
                    transform: `translate(${
                      direction === "RIGHT" ? -eyeOffset.x : eyeOffset.x
                    }px, ${eyeOffset.y}px)`,
                  }}
                />
              </span>

              <span className="dynamic-eye right-eye">
                <span
                  className="eye-highlight"
                  style={{
                    transform: `translate(${
                      direction === "RIGHT" ? -eyeOffset.x : eyeOffset.x
                    }px, ${eyeOffset.y}px)`,
                  }}
                />
              </span>
            </div>
          )}
        </div>
      </div>

      {state === "SLEEPING" && (
        <div
          className={`sleep-z-container ${
            direction === "LEFT" ? "z-left" : "z-right"
          }`}
        >
          <span className="sleep-z z1">Z</span>
          <span className="sleep-z z2">Z</span>
          <span className="sleep-z z3">Z</span>
        </div>
      )}
    </div>
  );
}

export default PetSprite;
