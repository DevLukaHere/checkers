import { useDispatch } from 'react-redux';
import Board from './Board';
import { fieldID } from '../utilities/types';
import {
  activePawn,
  inactivePawn,
  movePawn,
  beatPawn,
  changePlayer,
} from '../state/actions';
import {
  isCorrectPlayer,
  isBlank,
  isActivePawn,
  existMoves,
  isSameFieldClicked,
  isCorrectField,
  isCorrectMove,
  isItBeating,
  isMultiBeating,
  isBeatingByLastPawn,
  isBeatingPossible,
} from '../utilities/stateValidators';

export const Engine = () => {
  const dispatch = useDispatch();

  const action = (fieldID: fieldID): void => {
    //Is it a blank field?
    if (!isBlank(fieldID)) {
      //Checking if correct player is doing move
      if (isCorrectPlayer(fieldID)) {
        //Do we have activePawn?
        if (isActivePawn()) {
          //Clicked the same field?
          if (isSameFieldClicked(fieldID) && !isMultiBeating())
            dispatch(inactivePawn());
          else {
            //Other player's field clicked - changing pawn
            if (isCorrectField(fieldID) && !isMultiBeating())
              dispatch(activePawn(fieldID));
            else {
              //Is it a correct move?
              let move = isCorrectMove(fieldID);
              if (move) {
                //Does beat exist on board?
                if (isBeatingPossible()) {
                  //Beating in checkers is required when possible
                  if (isItBeating(move)) {
                    //Can we beat another one?
                    if (isMultiBeating()) {
                      //Is player beating by last pawn?
                      let lastPawn = isBeatingByLastPawn(fieldID);
                      if (lastPawn) {
                        dispatch(beatPawn(move));
                        dispatch(
                          activePawn({
                            row: move.to.row,
                            column: move.to.column,
                          })
                        );
                      }
                    }
                    // No multibeating - standard beat
                    else {
                      console.log('beating move');
                      dispatch(beatPawn(move));
                      dispatch(changePlayer());
                    }
                  }
                }
                //Beating impossible - standard move
                else {
                  console.log('standard move');
                  dispatch(movePawn(move));
                  dispatch(changePlayer());
                }
              }
              //Incorrect move
              else dispatch(inactivePawn());
            }
          }
        } else {
          //We don't have activePawn
          //Checking if exist moves for this field
          if (existMoves(fieldID)) dispatch(activePawn(fieldID));
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
