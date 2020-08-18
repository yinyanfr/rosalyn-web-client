import React, { useState, useEffect } from 'react'
import { Empty, Avatar } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
import "./Mine.scss"
import { useHistory } from "react-router-dom"


const Mine = () => {

    const history = useHistory()

    return (
        <div>
            <h1>Shortcuts</h1>
            <div className="shortcuts">
                <div
                    className="shortcut-group"
                    onClick={() => {
                        history.push("/radio")
                    }}
                >
                    <Avatar size={100} icon={<PlayCircleOutlined />} />
                    <p>Radio</p>
                </div>
            </div>
            <h1>My favorates</h1>
            <Empty />
        </div>
    )
}

export default Mine
