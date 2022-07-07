/*
 * Character
 * ---------
 *
 * Data:
 *  - pos: {x<int>, y<int>} Position are on Pixel (from TOP Left)
 *  - skin: int ? @TODO
 *  - dir: DIRECTION
 *  - isWalking: bool
 */


import React from 'react';

import "./character.css";

const Character = ({pos, skin=1, dir, isWalking}) => {
  return <>
    <div
      className={`character skin-${skin} ${dir} ${isWalking && 'is-walking'}`}
      style={{"--x": pos.x, "--y": pos.y}}
    ></div>

    <div
      className={`character borders skin-${skin} ${dir} ${isWalking && 'is-walking'}`}
      style={{"--x": pos.x, "--y": pos.y}}
    ></div>
  </>

};

export const DIRECTION = {
  UP: 'up',
  DOWN: 'down',
  LEFT: 'left',
  RIGHT: 'right',
};

export default Character;