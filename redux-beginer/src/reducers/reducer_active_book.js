// state argument is not global state, only reducer state
export default function(state = null, action){

    switch (action.type) {
        case 'BOOK_SELECTED':
            return action.payload;
    }
    return state;
}