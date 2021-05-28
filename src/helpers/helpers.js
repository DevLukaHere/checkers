export const checkActivity = (x, y, activeMoves) => {
  activeMoves.forEach((move) => {
    if (move.toX === x && move.toY === y) return true;
  });

  return false;
};
