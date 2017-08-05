import createReducer from '../lib/createReducer'
import * as types from '../types/confirmation'

export const isShownConfirmationDialog = createReducer( {}, {
    [types.SHOW_CONFIRMATION_DIALOG]( state, action ) {

        let newState = action.isShownConfirmationDialog;

        return newState;
    }
} );

