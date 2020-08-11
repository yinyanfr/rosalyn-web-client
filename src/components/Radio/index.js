import React, { useState, useEffect, useContext } from 'react'
import "./radio.scss"
import Player from '../Player'
import { Layout, Breadcrumb, Spin, message } from 'antd'
import RadioMusic from './RadioMusic'
import useReq from '../../services/useReq'
import MainContext from '../MainContext'
import note2014 from "../../assets/note1024.png"

const { Header, Content, Footer } = Layout

const Radio = () => {
    const [sample, { loading, res, err }] = useReq("GET", "/music/sample")

    const {
        playlist, setPlaylist,
        audioInfo, setAudioInfo,
        player,
    } = useContext(MainContext)


    useEffect(() => {
        const token = localStorage.getItem("token")
        player.clear()
        sample({ params: [20], token })
    }, [])

    useEffect(() => {
        if (res) {
            let tmp = [...res.body]
            tmp.sort(() => Math.random() - 0.5)
            setPlaylist(() => tmp)
            setAudioInfo({
                ...tmp[0],
                picture: tmp[0].picture[0] ? `data:${tmp[0].picture[0].format};base64,${tmp[0].picture[0].data}` : note2014
            })
        }
        if (err) {
            message.err("Failed to get playlist")
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
                                : ""
                        }
                    </Content>
                </Layout>
            </Spin>
        </section>
    )
}

export default Radio
