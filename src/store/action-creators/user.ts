import { Dispatch } from 'react'
import { AxiosError }  from 'axios'
import { toast } from "react-toastify"

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
        } catch (error: AxiosError) {
            toast.warn(error.message)
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
            console.log('response = ', response)
        //@ts-ignore
        } catch (error: Error | AxiosError) {
            toast.warn(error!.message)
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
            toast.warn(error!.message)
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
            toast.warn(error!.message)
        } finally {
            dispatch({type: UserActionTypes.LOADING_USER_DATA, payload: false})
        }
    }
}

export const deleteUser = (userId: UserId) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            if (userId) {
                await api.delete(userRoutes.user(userId))
                dispatch({
                    type: UserActionTypes.DELETE_USER, 
                    payload: userId
                })  
            }
        //@ts-ignore
        } catch (error: Error | AxiosError) {
            toast.warn(error!.message)
        } 
    }
}


