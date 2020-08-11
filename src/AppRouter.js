import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import AppContext from './AppContext'
import useReq from './services/useReq'
import { message, Spin } from "antd"
import Auth from './middlewares/Auth'
import App from './App'
import Admin from './components/Admin'
import FOF from './404'
import Music from './components/Music'

const AppRouter = () => {

    const [user, setUser] = useState(null)
    const [run, { loading, res, err }] = useReq("GET", "/me")

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            run({ token })
            // .then(res => {
            //     setUser(res.body)
            // })
        }
    }, [])

    useEffect(() => {
        if (res) {
            message.success("Successfully logging you in.")
            setUser(res.body)
        }
        if (err) {
            message.error("Your session has expired.")
        }
    }, [res, err])

    return (
        <Spin spinning={loading}>
            <AppContext.Provider value={
                {
                    user, setUser,
                }
            }>
                <Router>
                    <Switch>
                        <Route path="/">
                            <App />
                        </Route>

                        <Route>
                            <FOF />
                        </Route>
                    </Switch>
                </Router>
            </AppContext.Provider>
        </Spin>
    )
}

export default AppRouter
