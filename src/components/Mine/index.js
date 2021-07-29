import React, { useState, useEffect, useContext } from 'react'
import { Empty, Avatar, message } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
import "./Mine.scss"
import { useHistory } from "react-router-dom"
import useReq from '../../services/useReq'
import MusicTable from '../Music/MusicTable'
import MainContext from '../MainContext'


const Mine = () => {

    const history = useHistory()

    const { favorite } = useContext(MainContext)

    const [getAllMusic, { loading, res: allMusic, err }] = useReq("GET", "/music/infos")
    const [data, setData] = useState(allMusic?.body)

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (favorite) {
            getAllMusic({ token, params: [JSON.stringify(favorite)] })
        }
    }, [favorite])

    useEffect(() => {
        if (allMusic) setData(allMusic.body)
        if (err) {
            console.log(err)
            message.error("Failed to load music.")
        }
    }, [allMusic, err])

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
            <MusicTable
                data={data}
                setData={setData}
                allMusic={allMusic}
                loading={loading}
            />
        </div>
    )
}

export default Mine
