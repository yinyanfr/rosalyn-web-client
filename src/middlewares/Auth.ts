import React, { useContext } from 'react'
import AppContext from '../AppContext'
import Login from '../components/Login'
import {Alert} from "antd"
import {useLocation} from "react-router-dom"

const ranks = [
    "Guest",
    "User",
    "Uploader",
    "Moderator",
    "Admin"
]

const outrank = (user, rank) => ranks.indexOf(user.rank) >= ranks.indexOf(rank)

const isExcepted = (list, exceptions) => {
    for(let e of list){
        if(exceptions.indexOf(e) > -1){
            return true
        }
    }
    return false
}

const Auth = ({children, rank="User", exceptions=[]}) => {
    const {user} = useContext(AppContext)

    const location = useLocation()
    
    return (
        user
        ? (
            outrank(user, rank)
            ? children
            : <Alert 
                message="Unauthorized"
                description={`Viewing this page requires a ${rank} or higher rank.`}
                type="error"
            />
        )
        : (
            isExcepted(location.pathname.split("/"), exceptions)
            ? children
            : <Login />
        )
    )
}

export default Auth
