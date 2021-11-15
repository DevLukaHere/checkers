import { fieldID, move } from '../../types';

export const activePawn = (fieldID: fieldID) => {
  return { type: 'ACTIVE_PAWN', payload: fieldID };
};

export const inactivePawn = () => {
  return { type: 'INACTIVE_PAWN' };
};

export const movePawn = (move: move) => {
  return { type: 'MOVE_PAWN', payload: move };
};

export const checkCapturing = () => {
  return { type: 'CHECK_CAPTURING' };
};
