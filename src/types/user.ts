export interface IUser {
    [key: string]: 'male' | 'famale' | string | number | boolean | undefined
    biography: string
    birth_date: string
    first_name: string
    gender: 'male' | 'famale'
    id?: number
    is_active: boolean
    job: string
    last_name: string
}

export interface IUsersTableHeader {
    [key: string]: string
}

export interface IUserState {
    users: IUser[]
    loading: boolean
    error: null | string
}

export enum UserActionTypes {
    LOADING_USER_DATA = 'LOADING_USER_DATA',
    GET_USERS = 'GET_USERS',
    CREATE_USER = 'CREATE_USER',
    EDIT_USER = 'EDIT_USER',
    DELETE_USER = 'DELETE_USER',
}

interface ILoadingUserDataAction {
    type: UserActionTypes.LOADING_USER_DATA,
    payload: boolean
}

interface IFetchUserAction {
    type: UserActionTypes.GET_USERS,
    payload: IUser[]
}

interface ICreteUserAction {
    type: UserActionTypes.CREATE_USER,
    payload: IUser
}

interface IEditUserAction {
    type: UserActionTypes.EDIT_USER,
    payload: IUser
}

interface IDeleteUserAction {
    type: UserActionTypes.DELETE_USER,
    payload: UserId
}

export type UserAction = 
    ILoadingUserDataAction |
    IFetchUserAction | 
    ICreteUserAction | 
    IEditUserAction |
    IDeleteUserAction

export type UserId = number | null | undefined

export interface IUserRoutes {
    user: (userId?: UserId) => string
}