import { AnyAction } from 'redux';
import { fieldID, move } from '../../types';
import {
  getPawnMoves,
  showPossibleMoves,
  clearPossibleMoves,
  makeMove,
} from '../../utilities/patternModifiers';

type CheckersProps = {
  activePawn: fieldID | null;
  moves: move[];
  pattern: number[][];
};

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

const initialState: CheckersProps = {
  activePawn: null,
  moves: [],
  pattern: initialPattern,
};

const checkersReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'ACTIVE_PAWN':
      return {
        activePawn: action.payload,
        moves: getPawnMoves(state.pattern, action.payload),
        pattern: showPossibleMoves(state.pattern, action.payload),
      };
    case 'INACTIVE_PAWN':
      return {
        activePawn: null,
        moves: [],
        pattern: clearPossibleMoves(state.pattern),
      };
    case 'MOVE_PAWN':
      return {
        activePawn: null,
        moves: [],
        pattern: makeMove(state.pattern, action.payload),
      };

    default:
      return state;
  }
};

export default checkersReducer;
