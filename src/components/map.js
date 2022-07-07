import React from 'react';
import MapTerrain from './map-terrain';

import MapTile, {TYPES} from './map-tile';

import './map.css';

const Map = ({children}) => {

  const tileSize = 64; // px
  const w = 8; // tile
  const h = 8; // tile

  return (
    <div id="map" data-w={w} data-h={h} style={{"--w":w, "--h":h}}>

      <MapTerrain />

      {children}

    </div>
  );
};



export default Map;