import { AnyAction } from 'redux';

import {
  FieldID,
  activeFields,
  inactiveFields,
  Move,
  getMoves,
  makeMove,
} from '../utilities/modifiers';

const initialPattern: number[][] = [
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 4, 0, 4, 0, 4, 0, 4],
  [4, 0, 4, 0, 4, 0, 4, 0],
  [0, 4, 0, 4, 0, 4, 0, 4],
];

const pattern = (state = initialPattern, action: AnyAction) => {
  switch (action.type) {
    case 'PAWN_MOVE':
      return makeMove(state, action.payload);

    default:
      return state;
  }
};

export default pattern;
