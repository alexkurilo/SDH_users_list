import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useActions } from '../hooks/useActions'
import { useTypedSelector } from '../hooks/useTypedSelector'
import { HandleUserActionTypes, IUser } from '../types/user'
import { UsersTableHeader } from '../constants/user'

export const UsersList = () => {
    const { loading, users } = useTypedSelector(state => state.user)
    const { deleteUser } = useActions()
    const navigate = useNavigate()

    const clickHandler = async (
            event: React.MouseEvent<HTMLButtonElement | HTMLTableRowElement>, 
            actionType: HandleUserActionTypes, 
            user?: IUser
        ) => {  
            event.stopPropagation()
            switch (actionType) {
                case 'create':
                    navigate(`/user/create`)
                    break
                case 'detail':
                    navigate(`/user/${user!.id}/info`)
                    break
                case 'edit':
                    navigate(`/user/${user!.id}/edit`)
                    break
                case 'delete':
                    deleteUser(user!.id)
                    break
            }
        }

    return (
        loading ? (
            <div className='w-100 h-100-vh d-flex justify-content-center align-items-center'>
                <div className="spinner-border text-secondary" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        ) : (
            <div className='mx-4'>
                <h1 className='d-flex justify-content-center mt-3'> Users list </h1>
                <div className='d-flex justify-content-end'>
                    <button 
                        type="button"   
                        data-toggle="tooltip" 
                        data-placement="bottom" 
                        title="Add user"
                        className="btn btn-outline-secondary m-2"
                        onClick={(event) => clickHandler(event, 'create')}
                    >
                        <span className='px-1'>Add</span>
                        <i className="fa fa-plus px-1"/>
                    </button>
                </div>
                <table className='table table-hover table-sm'>
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            {Object.keys(UsersTableHeader).map(headerAlias => (
                                <th key={`header-${headerAlias}`}>
                                    {UsersTableHeader[headerAlias]}
                                </th>
                            ))}
                            <th/>
                        </tr>
                    </thead>
                    <tbody>
                    {users.length ? 
                        users.map((user, index) => (
                            <tr 
                                key={`user-${user.id}`} 
                                onClick={(event) => clickHandler(event, 'detail', user)}
                                className=''
                            > 
                                <th scope="row">{index + 1}</th>
                                { Object.keys(UsersTableHeader).map(headerAlias => (
                                    <td key={`user-${user.id}-${headerAlias}`}>
                                        {user[headerAlias]?.toString()}
                                    </td>
                                ))}
                                <td width={'120px'} align='right'>
                                    <button 
                                        type="button" 
                                        data-toggle="tooltip" 
                                        ata-placement="bottom" 
                                        title="Edit user"
                                        className="btn btn-outline-warning m-2"
                                        onClick={(event) => clickHandler(event, 'edit', user)}
                                    >
                                        <i className="fa fa-pencil"/>
                                    </button>
                                    <button 
                                        type="button"   
                                        data-toggle="tooltip" 
                                        data-placement="bottom" 
                                        title="Delete user"
                                        className="btn btn-outline-danger m-2"
                                        onClick={(event) => clickHandler(event, 'delete', user)}
                                    >
                                        <i className="fa fa-trash"/>
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr> 
                                <td align='center' colSpan={9}>
                                    Not find any user... 
                                </td>
                            </tr>
                        )
                    }
                    </tbody> 
                </table>
            </div>
        )
    )
}
