import { USER_FOUND, USER_NOT_FOUND } from '../actions/types';

const initialState = {
    found: {}, //GET user that comes in from action
    not_found: {}
}

export default function(state = initialState, action){
    switch(action.type){
        case USER_FOUND:
            return {
                ...state,
                found: action.payload
            }
        case USER_NOT_FOUND:
            return {
                ...state,
                not_found: action.payload
            }
        default: 
            return state;
    }
}