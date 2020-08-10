import React, { useState, useEffect } from 'react'
import "./radio.scss"
import Player from '../Player'
import { Layout, Breadcrumb, Spin, message } from 'antd'
import RadioMusic from './RadioMusic'
import useReq from '../../services/useReq'

const { Header, Content, Footer } = Layout

const Radio = () => {
    const [sample, { loading, res, err }] = useReq("GET", "/music/sample")

    const [playlist, setPlaylist] = useState([])
    const [audioInfo, setAudioInfo] = useState(null)


    useEffect(() => {
        sample({ params: [20], token: localStorage.getItem("token") })
    }, [])

    useEffect(() => {
        if (res) {
            let tmp = [...res.body]
            tmp.sort(() => Math.random() - 0.5)
            setPlaylist(tmp)
            setAudioInfo({
                ...tmp[0],
                picture: tmp[0].picture[0] ? `data:${tmp[0].picture[0].format};base64,${tmp[0].picture[0].data}` : ""
            })
        }
        if (err) {
            message.err("Failed to get playlist")
        }
    }, [res, err])

    const onTrackChange = (currentPlayId, audioLists) => {
        let audioInfo = audioLists.find(e => e.id === currentPlayId)
        if(audioInfo){
            const {name, singer, cover, album, _id} = audioInfo
            setAudioInfo({
                title: name,
                artist: singer,
                picture: [cover],
                album,
                _id,
            })
        }
    }

    return (
        <section>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Radio</Breadcrumb.Item>
            </Breadcrumb>
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
            <Footer>
                <Player
                    music={playlist}
                    onTrackChange={onTrackChange}
                />
            </Footer>
        </section>
    )
}

export default Radio
