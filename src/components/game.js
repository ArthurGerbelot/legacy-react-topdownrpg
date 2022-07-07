import React, { useEffect, useState } from 'react';
// import useKeypress from 'use-keyboard-shortcut';

import Viewport from './viewport';
import Map from './map';
import Character, { DIRECTION } from './character';

const MOVING_DISTANCE = 16; // px/frame
const MOVING_TIME = 1000/10; // ms - 20 FPS

const Game = () => {

  let [isPlayerMove, setPlayerMove] = useState(false);
  let [playerPos, setPlayerPos] = useState({x:128, y:128});
  let [playerDir, setPlayerDir] = useState(DIRECTION.DOWN);
  let [lastMoveTime, setLastMoveTime] = useState(0);//
  // let playerDir = DIRECTION.DOWN;

  // Keep witch key is pressed
  let [isUpPressed, setUpPressed] = useState(false);
  let [isDownPressed, setDownPressed] = useState(false);
  let [isRightPressed, setRightPressed] = useState(false);
  let [isLeftPressed, setLeftPressed] = useState(false);

  // even press is flooded... so dont "reupdate for direction" if already pressed on that direction, only when it's new
  const onKeyPress = (e) => {
    setPlayerMove(true);
    if (e.keyCode == 38 && !isUpPressed) {
      setUpPressed(true);
      // playerDir = DIRECTION.UP;
      setPlayerDir(DIRECTION.UP);
      playerDir = DIRECTION.UP;
    }
    if (e.keyCode == 40 && !isDownPressed) {
      setDownPressed(true);
      // playerDir = DIRECTION.DOWN;
      setPlayerDir(DIRECTION.DOWN);
      playerDir = DIRECTION.DOWN;
    }
    if (e.keyCode == 37 && !isLeftPressed) {
      setLeftPressed(true);
      // playerDir = DIRECTION.LEFT;
      setPlayerDir(DIRECTION.LEFT);
      playerDir = DIRECTION.LEFT;
    }
    if (e.keyCode == 39 && !isRightPressed) {
      setRightPressed(true);
      // playerDir = DIRECTION.RIGHT;
      setPlayerDir(DIRECTION.RIGHT);
      playerDir = DIRECTION.RIGHT;
    }
  };

  const onKeyUp = (e) => {
    // console.log("onKeyUp" + playerDir);
    if (e.keyCode == 38) {
      setUpPressed(false);
      if (playerDir == DIRECTION.UP) {
        setPlayerMove(false);
      }
    }
    if (e.keyCode == 40) {
      setDownPressed(false);
      if (playerDir == DIRECTION.DOWN) {
        setPlayerMove(false);
      }
    }
    if (e.keyCode == 37) {
      setLeftPressed(false);
      if (playerDir == DIRECTION.LEFT) {
        setPlayerMove(false);
      }
    }
    if (e.keyCode == 39) {
      setRightPressed(false);
      if (playerDir == DIRECTION.RIGHT) {
        setPlayerMove(false);
      }
    }
  };

  // Add event listener

  useEffect(() => {
    window.addEventListener('keyup', onKeyUp);
    window.addEventListener('keydown', onKeyPress);
    return () => {
      window.removeEventListener('keyup', onKeyUp);
      window.removeEventListener('keydown', onKeyPress);
    };
  },[]);

  // Tic for animation...

  useEffect(() => {
    const id = setTimeout(() => {
      console.log("Tic " + playerDir, `[${playerPos.x};${playerPos.y}]`);
      setLastMoveTime(new Date().getTime()); // Make it recall later

    }, MOVING_TIME);

    return () => {
      clearTimeout(id);
    }
  }, [lastMoveTime]);

  useEffect(() => {

    if (playerDir == DIRECTION.UP && isUpPressed) {
      setPlayerPos({x:playerPos.x, y:playerPos.y - MOVING_DISTANCE});
    }
    else if (playerDir == DIRECTION.DOWN && isDownPressed) {
      setPlayerPos({x:playerPos.x, y:playerPos.y + MOVING_DISTANCE});
    }
    else if (playerDir == DIRECTION.LEFT && isLeftPressed) {
      setPlayerPos({x:playerPos.x - MOVING_DISTANCE, y:playerPos.y});
    }
    else if (playerDir == DIRECTION.RIGHT && isRightPressed) {
      setPlayerPos({x:playerPos.x + MOVING_DISTANCE, y:playerPos.y});
    }


  }, [lastMoveTime, playerDir, isUpPressed, isDownPressed, isLeftPressed, isRightPressed]);


  return <>
    <Viewport >
      <Map>
        <Character pos={playerPos} dir={playerDir} isWalking={isPlayerMove} />
      </Map>

      <div> UP:{isUpPressed && "YES"} </div>
      <div> DOWN:{isDownPressed && "YES"} </div>
      <div> LEFT:{isLeftPressed && "YES"} </div>
      <div> RIGHT:{isRightPressed && "YES"} </div>
      <hr/>
      <div> Dir:{playerDir} </div>
      <hr/>
      <div> isMoving:{isPlayerMove ? "Yes" : "No"} </div>

    </Viewport>
  </>;
};


export default Game;