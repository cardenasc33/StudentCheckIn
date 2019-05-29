import { USER_FOUND , USER_NOT_FOUND } from './types';


// fetch api that checks if user exits

export const fetchUser = (uin) => dispatch => {
        
    fetch('/student/' + uin)
        .then(res => res.json())
        .then(user => dispatch({
            type: USER_FOUND,
            payload: user
        }))
        .catch(user_not_found => dispatch({
            type: USER_NOT_FOUND,
            payload: {uin: uin, rsvp: "No", checkIn: "Yes"}
        }));
}


/*
export const fetchUser = (uin) => dispatch => {
    fetch(('/student/' + uin))
        .then(res => res.json())
        .then(user => dispatch({
            type: USER_FOUND,
            payload: user
        }))
        .catch(user_not_found => dispatch({
            type: USER_NOT_FOUND,
            payload: user_not_found
        }));
        
        
}
*/