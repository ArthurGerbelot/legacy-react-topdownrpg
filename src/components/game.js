import { useEffect, useReducer, useRef } from "react";

import Character, { DIRECTION } from "./character";
import Map from "./map";
import Viewport from "./viewport";

const MOVING_DISTANCE = 16; // px/frame
const MOVING_TIME = 1000 / 10; // ms - 20 FPS

window.keys = {
  [DIRECTION.UP]: false,
  [DIRECTION.DOWN]: false,
  [DIRECTION.RIGHT]: false,
  [DIRECTION.LEFT]: false,
};
window.lastMoveTime = 0;

const useFrameLoop = (callback) => {
  const requestID = useRef();
  const previousTime = useRef();

  const loop = (time) => {
    if (previousTime.current !== undefined) {
      const deltaTime = time - previousTime.current;
      callback(time, deltaTime);
    }

    previousTime.current = time;
    requestID.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    requestID.current = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(requestID.current);
  }, []);
};

function reducer(state, action) {
  switch (action.type) {
    case "update":
      return {
        ...state,
        playerDir: action.newState.playerDir ?? state.playerDir,
        playerPos: {
          x: state.playerPos.x + action.newState.playerPos.x,
          y: state.playerPos.y + action.newState.playerPos.y,
        },
        isPlayerMove: action.newState.isPlayerMove ?? state.isPlayerMove,
      };

    default:
      throw new Error();
  }
}

const movementMap = (dir) => {
  switch (dir) {
    case DIRECTION.UP:
      return { x: 0, y: -MOVING_DISTANCE };
    case DIRECTION.DOWN:
      return { x: 0, y: MOVING_DISTANCE };
    case DIRECTION.LEFT:
      return { x: -MOVING_DISTANCE, y: 0 };
    case DIRECTION.RIGHT:
      return { x: MOVING_DISTANCE, y: 0 };
    default:
      return { x: 0, y: 0 };
  }
};

const Game = () => {
  const [state, dispatch] = useReducer(reducer, {
    playerDir: DIRECTION.DOWN,
    playerPos: { x: 128, y: 128 },
    isPlayerMove: false,
    lastMoveTime: 0,
  });

  const onKeyPress = (e) => {
    if (e.keyCode === 38) {
      window.keys.up = true;
    }
    if (e.keyCode === 40) {
      window.keys.down = true;
    }
    if (e.keyCode === 37) {
      window.keys.left = true;
    }
    if (e.keyCode === 39) {
      window.keys.right = true;
    }
  };
  const onKeyUp = (e) => {
    if (e.keyCode === 38) {
      window.keys.up = false;
    }
    if (e.keyCode === 40) {
      window.keys.down = false;
    }
    if (e.keyCode === 37) {
      window.keys.left = false;
    }
    if (e.keyCode === 39) {
      window.keys.right = false;
    }
  };

  // Add event listener
  useEffect(() => {
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onKeyPress);
    return () => {
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onKeyPress);
    };
  }, []);

  useFrameLoop(() => {
    const keysPressed = Object.keys(window.keys).filter(
      (k) => window.keys[k] === true
    );
    if (window.lastMoveTime + MOVING_TIME < new Date().getTime()) {
      if (keysPressed.length > 0) {
        keysPressed.forEach((key) => {
          dispatch({
            type: "update",
            newState: {
              playerDir: key,
              playerPos: { x: movementMap(key).x, y: movementMap(key).y },
              isPlayerMove: true,
            },
          });
        });

        window.lastMoveTime = new Date().getTime();
      } else {
        dispatch({
          type: "update",
          newState: {
            playerPos: { x: 0, y: 0 },
            isPlayerMove: false,
          },
        });
      }
    }
  });

  return (
    <>
      <Viewport>
        <Map>
          <Character
            pos={state.playerPos}
            dir={state.playerDir}
            isWalking={state.isPlayerMove}
          />
        </Map>

        <div> UP:{window.keys.up && "YES"} </div>
        <div> DOWN:{window.keys.down && "YES"} </div>
        <div> LEFT:{window.keys.left && "YES"} </div>
        <div> RIGHT:{window.keys.right && "YES"} </div>
        <hr />
        <div> Dir:{state.playerDir} </div>
        <hr />
        <div> isMoving:{state.isPlayerMove ? "Yes" : "No"} </div>
      </Viewport>
    </>
  );
};

export default Game;
