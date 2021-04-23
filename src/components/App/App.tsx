import React from 'react';
import './App.css';
import {Scene} from '../Scene';
import { Transpose } from '../../operator/Transpose';
import { SpawnEntity } from '../../operator';

export function App() {
  const operator = new Transpose({
    propName: 'position',
    vector: {
      x: 10,
      y: 20
    },
    framesCount: 10
  }, [
    new SpawnEntity({
      types: ['dot'],
      payload: {
        position: {
          x: 20,
          y: 30
        }
      }
    })
  ])
  return (
    <div className="App">
      <span>React application</span>
      <Scene operator={operator} />
    </div>
  );
}
