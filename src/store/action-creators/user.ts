import { Dispatch } from 'react'
import axios, { AxiosError }  from 'axios'

import { api } from '../../api'
import { UserAction, UserActionTypes } from '../../types/user'
import { userRoutes } from '../routes/userRoutes'
import { UserId, IUser } from '../../types/user'

const baseUrl = process.env.REACT_APP_API_LINK
const apiVersion = process.env.REACT_APP_API_VERSION

export const getUsers = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({type: UserActionTypes.LOADING_USER_DATA, payload: true})
        try {
            const response = await api.get(userRoutes.user())
            dispatch({
                type: UserActionTypes.GET_USERS, 
                payload: response.data
            })
        //@ts-ignore
        } catch (error: Error | AxiosError) {
            if (axios.isAxiosError(error))  {
                console.log('error: ', error)
            } else {
                console.log('error: ', error)
            }
        } finally {
            dispatch({type: UserActionTypes.LOADING_USER_DATA, payload: false})
        }
    }
}

export const getUser = (userId: UserId) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({type: UserActionTypes.LOADING_USER_DATA, payload: true})
        try {
            const response = await api.get(userRoutes.user(userId))
        //@ts-ignore
        } catch (error: Error | AxiosError) {
            console.log('error: ', error)
            if (axios.isAxiosError(error))  {
                console.log('error: ', error)
            } else {
                console.log('error: ', error)
            }
        } finally {
            dispatch({type: UserActionTypes.LOADING_USER_DATA, payload: false})
        }
    }
}

export const createUser = (body: IUser) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({type: UserActionTypes.LOADING_USER_DATA, payload: true})
        try {
            const response = await api.post(userRoutes.user(), body)
            dispatch({
                type: UserActionTypes.CREATE_USER, 
                payload: response.data
            })
        // @ts-ignore
        } catch (error: Error | AxiosError) {
            console.log('error: ', error)
            if (axios.isAxiosError(error))  {
                console.log('error: ', error)
            } else {
                console.log('error: ', error)
            }
        } finally {
            dispatch({type: UserActionTypes.LOADING_USER_DATA, payload: false})
        }
    }
}

export const editUser = (body: IUser) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({type: UserActionTypes.LOADING_USER_DATA, payload: true})
        try {
            const response = await api.put(userRoutes.user(body.id), body)
            dispatch({
                type: UserActionTypes.EDIT_USER, 
                payload: response.data
            })            
        //@ts-ignore
        } catch (error: Error | AxiosError) {
            console.log('error: ', error)
            if (axios.isAxiosError(error))  {
                console.log('error: ', error)
            } else {
                console.log('error: ', error)
            }
        } finally {
            dispatch({type: UserActionTypes.LOADING_USER_DATA, payload: false})
        }
    }
}

export const deleteUser = (userId: UserId) => {
    return async (dispatch: Dispatch<UserAction>) => {
        dispatch({type: UserActionTypes.LOADING_USER_DATA, payload: true})
        try {
            const response = await api.delete(userRoutes.user(userId))
        //@ts-ignore
        } catch (error: Error | AxiosError) {
            if (axios.isAxiosError(error))  {
                console.log('error: ', error)
            } else {
                console.log('error: ', error)
            }
        } finally {
            dispatch({type: UserActionTypes.LOADING_USER_DATA, payload: false})
        }
    }
}


