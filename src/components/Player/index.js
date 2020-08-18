import React, { useState, useEffect, useContext } from 'react'
import ReactJkMusicPlayer from "react-jinke-music-player"
import "react-jinke-music-player/assets/index.css"
import { message } from "antd"
import note1024 from "../../assets/note1024.png"
import {useHistory} from "react-router-dom"

const Player = ({
    music, onTrackChange, getPlayer, onAudioPlay
}) => {

    const history = useHistory()

    return (
        <ReactJkMusicPlayer
            glassBg
            showMediaSession
            audioLists={music}
            // remember={true}
            autoPlay={false}
            // mode={window.innerWidth < 720 ? "mini" : "full"}
            // mode={music.length ? "full" : "mini"}
            mode="full"
            showReload={false}
            showLyric
            showDownload={false}
            spaceBar
            showThemeSwitch={false}
            defaultPosition={{ bottom: 20, right: 10 }}
            onAudioPlayTrackChange={
                onTrackChange
                    ? onTrackChange
                    : () => { }
            }
            onAudioError={(errMsg) => {
                message.error("audio error")
                console.log(errMsg)
            }}
            getAudioInstance={getPlayer}
            onAudioPlay={onAudioPlay}
            onCoverClick={() => {
                history.push("/player")
            }}
            onAudioListsChange={(currentPlayId,audioLists,audioInfo) => {
                console.log(audioLists)
                console.log(audioInfo)
            }}
        />
    )
}

export default Player
