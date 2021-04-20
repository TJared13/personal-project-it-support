const initialState = {
    comment: {}
}

const CREATE_COMMENT = 'CREATE_COMMENT';
const GET_USER_COMMENTS = 'GET_USER_COMMENTS';
const READ_COMMENT = 'READ_COMMENT';
const GET_OPEN_COMMENTS = 'GET_OPEN_COMMENTS';

export function createComment(comment){
    return {
        type: CREATE_COMMENT,
        payload: comment
    }
}

export function getUserComments(comment){
    return {
        type: GET_USER_COMMENTS,
        payload: comment
    }
}

export function readComment (comment){
    return {
        type: READ_COMMENT,
        payload: comment
    }
}



export default function reducer(state = initialState, action) {
    switch(action.type){
        case CREATE_COMMENT:
            return {
                ...state,
                comment: action.payload
            }
        case GET_USER_COMMENTS:
            return {
                ...state,
                ...action.payload
            }
        case GET_OPEN_COMMENTS:
            return {
                ...state,
                ...action.payload
            }
        case READ_COMMENT:
            return{
                ...state,
                ...action.payload
            }
        default: return state
    }
}