import { AnyAction } from 'redux';
import { fieldID, move } from '../../utilities/types';
import { isBeatingGloballyPossible } from '../../utilities/patternModifiers';
import {
  getPawnMoves,
  showPossibleMoves,
  clearPossibleMoves,
  makeMove,
  makeBeat,
} from '../../utilities/patternModifiers';

type CheckersProps = {
  isBlackTurn: boolean;
  activePawn: fieldID | null;
  moves: move[];
  isBeatingPossible: boolean;
  pattern: number[][];
  multiBeating: fieldID | null;
};

const initialPattern: number[][] = [
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 4, 0, 4, 0, 4, 0, 4],
  [4, 0, 4, 0, 4, 0, 4, 0],
  [0, 4, 0, 4, 0, 4, 0, 0],
];

const initialState: CheckersProps = {
  isBlackTurn: true,
  activePawn: null,
  moves: [],
  isBeatingPossible: false,
  pattern: initialPattern,
  multiBeating: null,
};

const checkersReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case 'ACTIVE_PAWN':
      return {
        ...state,
        activePawn: action.payload,
        moves: getPawnMoves(state.pattern, action.payload),
        pattern: showPossibleMoves(state.pattern, action.payload),
      };
    case 'INACTIVE_PAWN':
      return {
        ...state,
        activePawn: null,
        moves: [],
        pattern: clearPossibleMoves(state.pattern),
      };
    case 'MOVE_PAWN':
      return {
        ...state,
        activePawn: null,
        moves: [],
        pattern: makeMove(state.pattern, action.payload),
      };
    case 'BEAT_PAWN':
      return {
        ...state,
        activePawn: null,
        moves: [],
        pattern: makeBeat(state.pattern, action.payload),
      };
    case 'TOGGLE_MULTIBEATING':
      return {
        ...state,
        multiBeating: action.payload,
      };
    case 'CHANGE_PLAYER':
      return {
        ...state,
        isBeatingPossible: isBeatingGloballyPossible(
          state.pattern,
          state.isBeatingPossible
        ),
        isBlackTurn: !state.isBlackTurn,
      };
    default:
      return state;
  }
};

export default checkersReducer;
