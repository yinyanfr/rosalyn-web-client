import React from 'react'
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Library from './Library'

const Admin = () => {

    return (
        <Router>
            <Route exact path="/admin/library">
                <Library />
            </Route>
        </Router>
    )
}

export default Admin
