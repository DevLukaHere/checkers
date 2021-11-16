import { AnyAction } from 'redux';
import { fieldID, move } from '../../types';

import {
  getPawnMoves,
  showPossibleMoves,
  clearPossibleMoves,
  pawnAction,
  checkIfCapturingExists,
} from '../../utilities/patternModifiers';

type CheckersProps = {
  isBlackTurn: boolean;
  activePawn: fieldID | null;
  moves: move[];
  pattern: number[][];
  isCapturingMove: boolean;
  multiCapturing: move[];
};

const initialPattern: number[][] = [
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 2, 0, 2, 0, 2, 0, 2],
  [2, 0, 2, 0, 2, 0, 2, 0],
  [0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 4, 0, 0, 0],
  [0, 4, 0, 4, 0, 0, 0, 4],
  [4, 0, 4, 0, 4, 0, 4, 0],
  [0, 4, 0, 4, 0, 4, 0, 0],
];

const initialState: CheckersProps = {
  isBlackTurn: true,
  activePawn: null,
  moves: [],
  pattern: initialPattern,
  isCapturingMove: false,
  multiCapturing: [],
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
        isBlackTurn: !state.isBlackTurn,
        activePawn: null,
        moves: [],
        pattern: pawnAction(state.pattern, action.payload),
      };
    case 'BEAT_PAWN':
      return {
        ...state,
        isBlackTurn: !state.isBlackTurn,
        activePawn: null,
        moves: [],
        pattern: pawnAction(state.pattern, action.payload),
      };
    case 'CHECK_POSSIBLE_CAPTURINGS':
      return {
        ...state,
        isCapturingMove: checkIfCapturingExists(
          state.pattern,
          state.isBlackTurn
        ),
      };
    case 'CHECK_MULTI_CAPTURING':
      let { row, column } = action.payload;
      return {
        ...state,
        multiCapturing: getPawnMoves(state.pattern, {
          row,
          column,
        }).filter((move) => move.capturing),
      };
    case 'MAKE_MULTI_CAPTURING':
      return {
        ...state,
        isBlackTurn: !state.isBlackTurn,
        multiCapturing: [],
      };
    default:
      return state;
  }
};

export default checkersReducer;
