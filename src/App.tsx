import { useEffect, useRef, useState } from "react";
import { getCurrentWindow, cursorPosition } from "@tauri-apps/api/window";

import PetSprite from "./components/PetSprite";
import type { Direction, PetState } from "./pet/types";

import "./App.css";

type PetState = "IDLE" | "DRAGGING" | "SLEEPING";
type Direction = "LEFT" | "RIGHT";

const SLEEP_TIMEOUT = 20000;

function App() {
  const [petState, setPetState] = useState<PetState>("IDLE");
  const [direction, setDirection] = useState<Direction>("RIGHT");
  const [eyeOffset, setEyeOffset] = useState({
    x: 0,
    y: 0,
  });

  const previousX = useRef<number | null>(null);
  const sleepTimer = useRef<number | null>(null);

  const resetSleepTimer = () => {
    if (sleepTimer.current !== null) {
      clearTimeout(sleepTimer.current);
    }

    if (petState === "SLEEPING") {
      setPetState("IDLE");
    }

    sleepTimer.current = window.setTimeout(() => {
      setPetState("SLEEPING");
    }, SLEEP_TIMEOUT);
  };

  //use effects

  useEffect(() => {
    resetSleepTimer();

    return () => {
      if (sleepTimer.current !== null) {
        clearTimeout(sleepTimer.current);
      }
    };
  }, []);

  useEffect(() => {
    const appWindow = getCurrentWindow();

    let cleanup: (() => void) | undefined;

    appWindow
      .onMoved(({ payload }) => {
        const currentX = payload.x;

        if (previousX.current !== null) {
          if (currentX > previousX.current) {
            setDirection("RIGHT");
          } else if (currentX < previousX.current) {
            setDirection("LEFT");
          }
        }

        previousX.current = currentX;
        resetSleepTimer();
      })
      .then((unlisten) => {
        cleanup = unlisten;
      });

    return () => {
      cleanup?.();
    };
  }, []);

  useEffect(() => {
    if (petState !== "IDLE") {
      return;
    }

    const appWindow = getCurrentWindow();

    const trackCursor = async () => {
      try {
        const cursor = await cursorPosition();
        const windowPosition = await appWindow.outerPosition();
        const windowSize = await appWindow.outerSize();

        const nekoCenterX = windowPosition.x + windowSize.width / 2;

        const nekoCenterY = windowPosition.y + windowSize.height / 2;

        const deltaX = cursor.x - nekoCenterX;
        const deltaY = cursor.y - nekoCenterY;

        const maxDistance = 1.5;

        const eyeX = Math.max(
          -maxDistance,
          Math.min(maxDistance, deltaX / 250)
        );

        const eyeY = Math.max(-1, Math.min(0.7, deltaY / 300));

        setEyeOffset({
          x: eyeX,
          y: eyeY,
        });

        if (cursor.x < nekoCenterX) {
          setDirection("LEFT");
        } else {
          setDirection("RIGHT");
        }
      } catch (error) {
        console.error("Cursor tracking failed:", error);
      }
    };

    trackCursor();

    const interval = window.setInterval(trackCursor, 100);

    return () => {
      clearInterval(interval);
    };
  }, [petState]);

  const startDragging = async () => {
    setPetState("DRAGGING");
    resetSleepTimer();

    await getCurrentWindow().startDragging();
  };

  const stopDragging = () => {
    setPetState("IDLE");
    resetSleepTimer();
  };

  const getCurrentSprite = () => {
    switch (petState) {
      case "DRAGGING":
        return catDragging;

      case "SLEEPING":
        return catSleeping;

      default:
        return catIdle;
    }
  };

  return (
    <main className="pet-container" onMouseUp={stopDragging}>
      <PetSprite
        state={petState}
        direction={direction}
        eyeOffset={eyeOffset}
        onMouseDown={startDragging}
      />
    </main>
  );
}

export default App;
