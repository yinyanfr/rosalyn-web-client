import React, { useState, useEffect } from 'react'
import { Typography, Alert, message } from "antd"
import {
    HeartFilled, HeartOutlined,
    DeleteOutlined,
    StepForwardOutlined,
    ShareAltOutlined
} from "@ant-design/icons"
import useReq from '../../services/useReq'
import copy from 'copy-to-clipboard'

const { Title } = Typography

const RadioMusic = ({ audioInfo }) => {
    const {
        title, artist, album, picture, _id
    } = audioInfo

    const [share, { loading, res, err }] = useReq("POST", "/music/share")

    useEffect(() => {
        if (res) {
            copy(`${window.location.origin}/share/${res.body?.shareId}`)
            message.success("Link copied to copyboard")
        }
        if(err){
            message.error("Failed to generate share link.")
        }
    }, [res, err])

    return (
        <article className="single-music">
            <div className="music-icon">
                <img
                    className="music-icon-image"
                    alt="cover"
                    src={picture}
                />
            </div>
            <div className="music-info">
                <div className="music-info-group">
                    <Title>{title}</Title>
                    <p className="font-150">{artist}</p>
                    <p>{album}</p>
                </div>
                <div className="music-favor">
                    <div>
                        <HeartOutlined />
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
