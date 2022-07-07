import React from 'react';

import './viewport.css';

const Viewport = ({children}) => {

  return (
    <div id="game-viewport">

      {children}

    </div>
  );
};


export default Viewport;