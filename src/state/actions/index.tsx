import { fieldID, move } from '../../utilities/types';

export const activePawn = (fieldID: fieldID) => {
  return { type: 'ACTIVE_PAWN', payload: fieldID };
};

export const inactivePawn = () => {
  return { type: 'INACTIVE_PAWN' };
};

export const movePawn = (move: move) => {
  return { type: 'MOVE_PAWN', payload: move };
};

export const beatPawn = (move: move) => {
  return { type: 'BEAT_PAWN', payload: move };
};

export const checkPossibleCapturings = () => {
  return { type: 'CHECK_POSSIBLE_CAPTURINGS' };
};

export const checkMultiCapturing = (fieldID: fieldID) => {
  return { type: 'CHECK_MULTI_CAPTURING', payload: fieldID };
};

export const makeMultiCapturing = (fieldID: fieldID) => {
  return { type: 'MAKE_MULTI_CAPTURING', payload: fieldID };
};
