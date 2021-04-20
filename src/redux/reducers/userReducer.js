const initialState = {
    user: {}
};

const REGISTER_USER = 'REGISTER_USER';
const UPDATE_USER = 'UPDATE_USER';
const LOGOUT_USER = 'LOGOUT_USER';
const GET_USER = 'GET_USER';

export function getUser(user){
    return {
        type: GET_USER,
        payload: user
    }
}

export function updateUser(user){
    return {
        type: UPDATE_USER,
        payload: user
    }
};

export function registerUser(user){
    return {
        type: REGISTER_USER,
        payload: user
    }
};

export function logoutUser(){
    return {
        type: LOGOUT_USER,
    }
}



export default function reducer(state = initialState, action) {
    switch(action.type){
        case REGISTER_USER:
            return {
                ...state,
                ...action.payload
            }
        case GET_USER:
            return {
                ...state,
                ...action.payload
            }
        case UPDATE_USER:
            return {
                ...state,
                ...action.payload
            }
        case LOGOUT_USER:
                return {
                    state,
                }

        default: return state;
    }
};