import { 
    IUserState, 
    UserActionTypes, 
    UserAction 
} from '../../types/user'

const initialState: IUserState = {
    users: [],
    loading: false,
}

export const userReducer = (state = initialState, action: UserAction): IUserState => {
    switch (action.type) {
        case UserActionTypes.LOADING_USER_DATA:
            return {
                ...state,
                loading: action.payload,
            }
        case UserActionTypes.GET_USERS:
            return {
                ...state,
                users: action.payload,
            }
        case UserActionTypes.CREATE_USER:
            return {
                ...state,
                users: [...state.users, action.payload],
            }
        case UserActionTypes.EDIT_USER:
            return {
                ...state,
                users: [
                    ...state.users.filter(user => user.id !== action.payload.id), 
                    action.payload
                ],
            }
        case UserActionTypes.DELETE_USER:
            return {
                ...state,
                users: [
                    ...state.users.filter(user => user.id !== action.payload), 
                ],
            }
        default:
            return {...state}
    }
}