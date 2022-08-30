import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { UsersList } from './pages/UsersList'
import { UserInfo } from './pages/UserInfo'
import { useActions } from './hooks/useActions'

import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  const { getUsers, deleteUser } = useActions()
    useEffect(() => { getUsers() }, [])
    
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UsersList />} />
                    <Route path="/user/:id/info" element={<UserInfo />} />
                </Routes>
            </BrowserRouter>
        </div>
  );
}

export default App


