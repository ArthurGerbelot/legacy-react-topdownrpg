/*
 * Map Tile who are:
 *
 *  - Non Interactible (? Do we define here Map Element who are not moving but interactible ?)
 *  - Non Moving
 *  - Tiled (position are int:int - Character position are float)
 */


import React from 'react';

import MapTile, {TYPES} from './map-tile';


const limits = {
  x: {min: 0, max:8},
  y: {min: 0, max:8},
};
const collideTiles = [
  {x:0, y:0},
  {x:1, y:1},
  {x:1, y:5}, {x:2, y:5}, {x:3, y:5}, {x:4, y:5}, {x:5, y:5},
  {x:3, y:6}, {x:4, y:6},
  {x:4, y:7}, {x:5, y:7},
];

const MapTerrain = () => {
  return (
    <div id="map-terrain">
      <MapTile x={0} y={0} type={TYPES.BUSH}/>
      <MapTile x={1} y={1} type={TYPES.BUSH}/>

      <MapTile x={5} y={3} type={TYPES.GRASS_DETAILS}/>
      <MapTile x={6} y={3} type={TYPES.GRASS_DETAILS}/>
      <MapTile x={5} y={1} type={TYPES.TALL_HERBS}/>
      <MapTile x={6} y={1} type={TYPES.TALL_HERBS}/>
      <MapTile x={5} y={2} type={TYPES.TALL_HERBS}/>
      <MapTile x={6} y={2} type={TYPES.TALL_HERBS}/>

      <MapTile x={4} y={6} type={TYPES.TREE}/>
      <MapTile x={3} y={5} type={TYPES.TREE}/>

      <MapTile x={1} y={5} type={TYPES.FENCE}/>
      <MapTile x={2} y={5} type={TYPES.FENCE}/>
      <MapTile x={3} y={5} type={TYPES.FENCE}/>
      <MapTile x={4} y={5} type={TYPES.FENCE}/>
      <MapTile x={5} y={5} type={TYPES.FENCE}/>



      {false && collideTiles.map((c) => {
        return <MapTile x={c.x} y={c.y} type="dev-collide" />

      })}
    </div>
  );
};



export default MapTerrain;