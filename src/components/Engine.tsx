import { useDispatch } from 'react-redux';
import Board from './Board';
import { fieldID } from '../utilities/types';
import { activePawn, inactivePawn, movePawn } from '../state/actions';
import {
  isCorrectPlayer,
  isBlank,
  isActivePawn,
  existMoves,
  isSameFieldClicked,
  isCorrectField,
  isCorrectMove,
} from '../utilities/stateValidators';

export const Engine = () => {
  const dispatch = useDispatch();

  const action = (fieldID: fieldID): void => {
    //Checking if correct player is doing move
    if (isCorrectPlayer(fieldID) && !isBlank(fieldID)) {
      //Do we have activePawn?
      if (!isActivePawn()) {
        if (!existMoves(fieldID)) return;
        dispatch(activePawn(fieldID));
      } else {
        //Clicked the same field
        if (isSameFieldClicked(fieldID)) {
          dispatch(inactivePawn());
        } else {
          //Changing pawn
          if (isCorrectField(fieldID)) {
            dispatch(activePawn(fieldID));
          } else {
            //Is it a correct move?
            let move = isCorrectMove(fieldID);
            if (move) {
              dispatch(movePawn(move));
            } else {
            }
          }
        }
      }
    }
  };

  return (
    <div>
      <Board callback={action} />
    </div>
  );
};

export default Engine;
