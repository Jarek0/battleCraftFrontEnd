import createReducer from '../lib/createReducer'
import * as types from '../types/entityPanel'
import {entityPanelModes} from '../../main/consts/entityPanelModes'
import {entityPanelTypes} from '../../main/consts/entityPanelTypes'

export const entityPanel = createReducer( {}, {
    [types.ADD_ENTITY]( state, action ) {
        return {
            mode:entityPanelModes.add,
            entityType:action.entityType
        };
    },
    [types.EDIT_ENTITY]( state, action ) {
        return {
            mode:entityPanelModes.edit,
            entityType:action.entityType,
            entityName:action.entityName
        };
    },
    [types.SHOW_ENTITY]( state, action ) {
        return {
            mode:entityPanelModes.show,
            entityType:action.entityType,
            entityName:action.entityName
        };
    },
    [types.DISABLE_ENTITY_PANEL]( state, action ) {
        return {
            mode:entityPanelModes.disabled,
            entityType:entityPanelTypes.none,
            entityName:""
        };
    }
} );
