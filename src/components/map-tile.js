import React from 'react';


import './map-tile.css';

const MapTile = ({x,y, type}) => {



  return (
    <div className={`tile ${type}`} data-x={x} data-y={y} style={{"--x":x, "--y":y}}>

    </div>
  );
};

export default MapTile;

export const TYPES = {
  BUSH: 'bush',
  GRASS_DETAILS: 'grass-details',
  TALL_HERBS: 'tall-herbs',

  // In one
  TREE: 'tree',

  // In tile
  TREE_00: 'tree-00',
  TREE_10: 'tree-10',
  TREE_01: 'tree-01',
  TREE_11: 'tree-11',


  FENCE: 'fence',
};