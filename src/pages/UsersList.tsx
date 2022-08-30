import React, { useEffect } from 'react'
import { useActions } from '../hooks/useActions'

import { useTypedSelector } from '../hooks/useTypedSelector'
import { IUser } from '../types/user'
import { UsersTableHeader } from '../constants/user'

export const UsersList = () => {
    const {error, loading, users} = useTypedSelector(state => state.user)
    const { getUsers, deleteUser } = useActions()
    useEffect(() => { getUsers() }, [])

    const clickHandler = async (event: React.MouseEvent<HTMLButtonElement | HTMLTableRowElement>, actionType: 'create' | 'detail' | 'edit' | 'delete', user?: IUser) => {  
        event.stopPropagation()
        switch (actionType) {
            case 'create':
                console.log('actionType = ', actionType)
                break
            case 'detail':
                console.log('actionType = ', actionType, 'user = ', user)
                break
            case 'edit':
                console.log('actionType = ', actionType, 'user = ', user)
                break
            case 'delete':
                console.log('actionType = ', actionType, 'user = ', user)
                break
        }
    }

    return (
        loading ? (
            <div> 
                Data is loading...
            </div>
        ) : error ? (
            <div> 
                {error} 
            </div>
        ) : (
            <div>
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
                        Add <i className="fa fa-plus m-2"/>
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
                            <tr key={`user-${user.id}`} onClick={(event) => clickHandler(event, 'detail', user)}> 
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
