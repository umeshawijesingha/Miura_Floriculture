export const initialState = {
    user: null,
    fname: "",
    lname : "",
    role: null
};

export const actionTypes = {
    SET_USER: "SET_USER"
};

const reducer = (state, action) => {

    switch (action.type){
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.user,
                fname: action.fname,
                lname: action.lname,
                role: action.role
            };
        default:
            return state;

    }

};

export default reducer;