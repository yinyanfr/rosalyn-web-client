import React, { useState, useEffect } from 'react'
import {Typography} from "antd"
import {
    HeartFilled, HeartOutlined,
    DeleteOutlined,
    StepForwardOutlined,
} from "@ant-design/icons"

const {Title} = Typography

const RadioMusic = ({ audioInfo }) => {
    const {
        title, artist, album, picture
    } = audioInfo

    return (
        <article className="single-music">
            <div className="music-icon">
                {
                    picture
                        ? <img
                            className="music-icon-image"
                            alt="cover"
                            src={picture}
                        />
                        : ""
                }
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
                </div>
            </div>
        </article>
    )
}

export default RadioMusic
