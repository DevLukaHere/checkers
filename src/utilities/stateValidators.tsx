import { getPawnMoves } from './patternModifiers';
import { store } from '../state/store';
import { fieldID, fieldType, move } from './types';

export const isCorrectPlayer = ({ row, column }: fieldID): boolean => {
  let currentState = store.getState();
  let { isBlackTurn, pattern } = currentState.checkers;

  let type = pattern[row][column];
  let { BLACK_PAWN, RED_PAWN } = fieldType;

  if (type !== BLACK_PAWN && type !== RED_PAWN) return true;

  if (type === BLACK_PAWN && isBlackTurn === true) return true;

  if (type === RED_PAWN && isBlackTurn === false) return true;

  console.log('Incorrect player');
  return false;
};

export const isSameFieldClicked = ({ row, column }: fieldID): boolean => {
  let currentState = store.getState();
  let { activePawn } = currentState.checkers;

  if (activePawn && activePawn.row === row && activePawn.column === column) {
    console.log('Same field clicked!');
    return true;
  }

  return false;
};

export const isCorrectMove = ({ row, column }: fieldID): move | undefined => {
  let currentState = store.getState();
  let { moves } = currentState.checkers;

  let move = moves.find(
    (move: move) => move.to.row === row && move.to.column === column
  );
  if (move) return move;
  else console.log('Incorrect move!');
};

export const isBlank = ({ row, column }: fieldID): boolean => {
  let currentState = store.getState();
  let { pattern } = currentState.checkers;

  let type = pattern[row][column];
  let { BLANK } = fieldType;

  if (type === BLANK) {
    console.log('Field is blank!');
    return true;
  }

  return false;
};

export const isActivePawn = (): boolean => {
  let currentState = store.getState();
  let { activePawn } = currentState.checkers;

  if (activePawn) {
    return true;
  }

  return false;
};

export const existMoves = ({ row, column }: fieldID): boolean => {
  let currentState = store.getState();
  let { pattern } = currentState.checkers;

  let moves = getPawnMoves(pattern, { row, column });

  if (moves.length > 0) return true;
  else {
    console.log('No moves for this field!');
    return false;
  }
};

export const isCorrectField = ({ row, column }: fieldID): boolean => {
  let currentState = store.getState();
  let { pattern, isBlackTurn } = currentState.checkers;

  let type = pattern[row][column];
  let { BLACK_PAWN, RED_PAWN } = fieldType;

  if (isBlackTurn && type === BLACK_PAWN) {
    return true;
  }

  if (!isBlackTurn && type === RED_PAWN) {
    return true;
  }

  return false;
};

export const isItBeating = (move: move): boolean => {
  if (move.capturing) return true;

  console.log('You have to do a beating move!');
  return false;
};

export const isMultiBeating = (): boolean => {
  let currentState = store.getState();
  let { multiBeating } = currentState.checkers;

  if (multiBeating) return true;

  return false;
};

export const isBeatingByLastPawn = ({
  row,
  column,
}: fieldID): fieldID | undefined => {
  let currentState = store.getState();
  let { multiBeating } = currentState.checkers;

  if (
    multiBeating &&
    multiBeating.row === row &&
    multiBeating.column === column
  )
    return multiBeating;

  console.log('You have to beat by last used pawn!');
  return undefined;
};

export const isBeatingPossible = () => {
  let currentState = store.getState();
  let { isBeatingPossible } = currentState.checkers;

  return isBeatingPossible;
};
