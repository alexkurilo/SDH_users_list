import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import { useTypedSelector } from '../hooks/useTypedSelector'
import { IUser } from '../types/user'
import { UsersTableHeader, UserInfoFields } from '../constants/user'

export const UserInfo = () => {
    const navigate = useNavigate()
    const { id } = useParams()
    const { users } = useTypedSelector(state => state.user)   
    const [selectedUser, setSelectedUser] = useState<IUser>({} as IUser)     
        
    useEffect(() => { 
        users.length && id && setSelectedUser(users.find(user => user.id === +id)!)
     }, [users, id])

     return (
        <div className='mx-4'>
            <h1 className='d-flex justify-content-center mt-3'>User info page</h1>
            <div className='d-flex justify-content-end'>
                <button 
                    type="button"   
                    data-toggle="tooltip" 
                    data-placement="bottom" 
                    title="Go back"
                    className="btn btn-outline-secondary m-2"
                    onClick={() => navigate('/')}
                >
                    <i className="fa fa-long-arrow-left px-1"/> 
                    <span className='px-1'>Back</span>
                </button>
            </div>
            {
                Object.keys(selectedUser).length ? (
                    <table className='table table-hover'>
                        <tbody>
                        {
                            Object.keys({...UsersTableHeader, ...UserInfoFields}).map((userField) => {
                                console.log('userField = ', userField)
                                console.log('selectedUser[userField] = ', selectedUser[userField])
                                return(
                                <tr key={`user-info-${userField}`}> 
                                    <td width={'120px'} align='left'>
                                        {userField}
                                    </td>
                                    <td width={'120px'} >
                                        {selectedUser[userField]?.toString()}
                                    </td>
                                </tr>
                        )})}
                        </tbody> 
                    </table>
                ) : null
            }
        </div>
    )
}