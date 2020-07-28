import React, { useContext } from 'react'
import AppContext from '../AppContext'
import Login from '../components/Login'
import {Alert} from "antd"

const ranks = [
    "Guest",
    "User",
    "Uploader",
    "Moderator",
    "Admin"
]

const outrank = (user, rank) => ranks.indexOf(user.rank) >= ranks.indexOf(rank)

const Auth = ({children, rank="User"}) => {
    const {user} = useContext(AppContext)

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
        : <Login />
    )
}

export default Auth
