const initialState = {
    ticket: {}
}

const CREATE_TICKET = 'CREATE_TICKET';
const GET_USER_TICKETS = 'GET_USER_TICKETS';
const READ_TICKET = 'READ_TICKET';
const GET_OPEN_TICKETS = 'GET_OPEN_TICKETS';
const DELETE_TICKET = 'DELETE_TICKET';

export function createTicket(ticket){
    return {
        type: CREATE_TICKET,
        payload: ticket
    }
}

export function getUserTickets(ticket){
    return {
        type: GET_USER_TICKETS,
        payload: ticket
    }
}

export function readTicket(ticket){
    return {
        type: READ_TICKET,
        payload: ticket
    }
}

export function getAllOpenTickets(ticket) {
    return {
        type: GET_OPEN_TICKETS,
        payload: ticket
    }
}

export function deleteUserTicket(ticket) {
    return {
        type: DELETE_TICKET
    }
}

export default function reducer(state = initialState, action) {
    switch(action.type){
        case CREATE_TICKET:
            return {
                ...state,
                ticket: action.payload
            }
        case GET_USER_TICKETS:
            return {
                ...state,
                ...action.payload
            }
        case GET_OPEN_TICKETS:
            return {
                ...state,
                ...action.payload
            }
        case READ_TICKET:
            return{
                ...state,
                ...action.payload
            }
        case DELETE_TICKET:
            return {
                ...state
            }
        default: return state
    }
}