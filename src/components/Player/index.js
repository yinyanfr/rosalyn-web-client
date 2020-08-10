import React from 'react'
import ReactJkMusicPlayer from "react-jinke-music-player"
import "react-jinke-music-player/assets/index.css"
import {message} from "antd"

const token = localStorage.getItem("token")

const convert = (music) => {
    return music.map(({
        title: name,
        artist: singer,
        duration, picture,
        _id,
        album,
    }) => ({
        name, singer, duration,
        cover: picture[0] ? `data:${picture[0].format};base64,${picture[0].data}` : "",
        musicSrc: `/music/download/${token}/${_id}`,
        album,
        _id,
    }))
}

const Player = ({music, onTrackChange, getplayer}) => {

    return (
        <ReactJkMusicPlayer 
            glassBg
            showMediaSession
            audioLists={convert(music)}
            remember={true}
            autoPlay={false}
            mode={window.innerWidth < 720 ? "mini" : "full"}
            showReload={false}
            showLyric
            showDownload={false}
            spaceBar
            showThemeSwitch={false}
            defaultPosition={{bottom: 20, right: 10}}
            onAudioPlayTrackChange={
                onTrackChange
                ? onTrackChange
                : () => {}
            }
            onAudioError={(errMsg) => {
                message.error(errMsg)
            }}
            getAudioInstance={
                getplayer
                ? getplayer
                : () => {}
            }
        />
    )
}

export default Player
