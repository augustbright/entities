import React from 'react';
import './App.css';
import {Scene} from '../Scene';
import { Barnsley } from '../../operator';

export function App() {
  const operator = new Barnsley({
    offsetX: 300,
    offsetY: 600,
    multiply: 45,
    params: [
      {
        a: .0,
        b: .0, 
        c: .0, 
        d: .16,
        e: .0, 
        f: .0,
        pFrom: 0,
        pTo: 1
      },
      {
        a: .85,
        b: .04, 
        c: -.04, 
        d: .85,
        e: .0, 
        f: 1.6,
        pFrom: 2,
        pTo: 85
      },
      {
        a: .2,
        b: -.26, 
        c: .23,
        d: .22,
        e: .0, 
        f: 1.6,
        pFrom: 86,
        pTo: 92
      },
      {
        a: -.15,
        b: .28,
        c: .26,
        d: .24,
        e: .0, 
        f: .44,
        pFrom: 93,
        pTo: 100
      },
    ]
  });
  return (
    <div className="App">
      <span>React application</span>
      <Scene operator={operator} />
    </div>
  );
}
