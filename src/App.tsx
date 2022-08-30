import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { UsersList } from './pages/UsersList'

import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<UsersList />} />
                </Routes>
            </BrowserRouter>
        </div>
  );
}

export default App


