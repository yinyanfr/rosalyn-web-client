import React, { useState, useEffect, useContext } from 'react'
import "./radio.scss"
import { Layout, Breadcrumb, Spin, message, Empty, Button } from 'antd'
import RadioMusic from './RadioMusic'
import useReq from '../../services/useReq'
import MainContext from '../MainContext'
import note2014 from "../../assets/note1024.png"
import { useLocation } from "react-router-dom"
import request from "superagent"

const { Header, Content, Footer } = Layout

const Radio = ({ radio, share }) => {
    const [sample, { loading, res, err }] = useReq("GET", "/music/sample")

    const {
        playlist, setPlaylist, setPlaylistRaw,
        audioInfo, setAudioInfo,
        player,
    } = useContext(MainContext)

    const location = useLocation()


    useEffect(() => {
        if (radio) {
            const token = localStorage.getItem("token")
            player.clear()
            sample({ params: [20], token })
                .then(() => {
                    player.updatePlayIndex(0)
                    player.load()
                })
        }
    }, [radio])

    useEffect(() => {
        if (share && player) {
            const l = location.pathname.split("/")
            const shareId = l[l.length - 1]
            request.get(`/music/share/${shareId}`)
                .then(res => {
                    const {
                        title: name,
                        artist: singer,
                        duration, picture,
                        _id,
                        album
                    } = res.body
                    setPlaylistRaw([{
                        name, singer, duration,
                        cover: picture[0] ? `data:${picture[0].format};base64,${picture[0].data}` : note2014,
                        musicSrc: `/music/shared_file/${shareId}`,
                        album,
                        _id,
                    }])
                })
                .catch(err => {
                    console.log(err)
                    message.error("Failed to load music.")
                })
        }

    }, [share, player])

    useEffect(() => {
        if (res) {
            let tmp = [...res.body]
            tmp.sort(() => Math.random() - 0.5)
            setPlaylist(tmp)
            setAudioInfo({
                ...tmp[0],
                picture: tmp[0].picture[0] ? `data:${tmp[0].picture[0].format};base64,${tmp[0].picture[0].data}` : note2014
            })
        }
        if (err) {
            message.error("Failed to get playlist")
        }
    }, [res, err])


    return (
        <section>
            {
                <div className="desktop-only">
                    <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Radio</Breadcrumb.Item>
                    </Breadcrumb>
                </div>
            }
            <Spin spinning={loading}>
                <Layout className="site-layout-background">
                    <Content style={{ minHeight: 280 }}>
                        {
                            audioInfo
                                ? <RadioMusic audioInfo={audioInfo} />
                                : (
                                    <Empty
                                        description={
                                            <span>Nothing is playing</span>
                                        }
                                    >
                                        <Button
                                            type="primary"
                                            onClick={() => {
                                                const token = localStorage.getItem("token")
                                                player.clear()
                                                sample({ params: [20], token })
                                                    .then(() => {
                                                        player.updatePlayIndex(0)
                                                        player.load()
                                                    })

                                            }}
                                        >
                                            Open Radio
                                        </Button>
                                    </Empty>
                                )
                        }
                    </Content>
                </Layout>
            </Spin>
        </section>
    )
}

export default Radio
