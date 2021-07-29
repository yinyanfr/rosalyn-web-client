import React, { useState, useEffect, useContext } from 'react'
import { Typography, Alert, message } from "antd"
import {
    HeartFilled, HeartOutlined,
    DeleteOutlined,
    StepForwardOutlined,
    ShareAltOutlined
} from "@ant-design/icons"
import useReq from '../../services/useReq'
import copy from 'copy-to-clipboard'
import MainContext from '../MainContext'

const { Title } = Typography

const RadioMusic = ({ audioInfo }) => {
    const {
        title, artist, album, picture, _id
    } = audioInfo

    const [share, { loading, res, err }] = useReq("POST", "/music/share")
    const [favor] = useReq("POST", "/music/taste")
    const [getInfo, {res: infoRes}] = useReq("GET", "/music/info")
    const [coverImage, setCoverImage] = useState(picture)

    const {favorite, setFavorite} = useContext(MainContext)

    useEffect(() => {
        if (res) {
            copy(`${window.location.origin}/share/${res.body?.shareId}`)
            message.success("Link copied to copyboard")
        }
        if(err){
            message.error("Failed to generate share link.")
        }
    }, [res, err])

    useEffect(() => {
        const token = localStorage.getItem("token")
        getInfo({token, params: [_id]})
    }, [_id])

    useEffect(() => {
        if(infoRes?.body?.picture?.length) {
            console.log("fucking rendered")
            if(infoRes.body.picture[0]?.data) {
                setCoverImage(`data:image/jpeg;base64,${infoRes.body.picture[0].data}`)
            }
            
        }
    }, [infoRes])

    return (
        <article className="single-music">
            <div className="music-icon">
                <img
                    className="music-icon-image"
                    alt="cover"
                    src={coverImage}
                />
            </div>
            <div className="music-info">
                <div className="music-info-group">
                    <Title>{title}</Title>
                    <p className="font-150">{artist}</p>
                    <p>{album}</p>
                </div>
                <div className="music-favor">
                    <div
                        onClick={() => {
                            const token = localStorage.getItem("token")
                            if(favorite?.includes(_id)) {
                                setFavorite(favorite => favorite.filter(e => e !== _id))
                            }
                            else {
                                setFavorite(favorite => ([
                                    ...favorite, _id,
                                ]))
                            }
                            favor({
                                token,
                                body: {
                                    musicId: _id,
                                    favor: true
                                }
                            })
                        }}
                    >
                        {
                            favorite?.includes(_id)
                            ? <HeartFilled />
                            : <HeartOutlined />
                        }
                    </div>
                    <div>
                        <DeleteOutlined />
                    </div>
                    <div>
                        <StepForwardOutlined />
                    </div>
                    <div
                        onClick={() => {
                            const token = localStorage.getItem("token")
                            share({
                                body: {
                                    musicId: _id
                                },
                                token
                            })
                        }}
                    >
                        <ShareAltOutlined />
                    </div>
                </div>
            </div>
        </article>
    )
}

export default RadioMusic
