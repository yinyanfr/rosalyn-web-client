import React, { useState, useEffect } from 'react'
import MusicTable from './MusicTable'
import Player from '../Player'
import { Layout, Menu, Breadcrumb } from 'antd'

const { Header, Content, Footer } = Layout

const Music = () => {

    const stored = localStorage.getItem("playlist")

    const [playlist, setPlaylist] = useState(
        stored ? JSON.parse(stored) : []
    )

    return (
        <section>
            <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item>Library</Breadcrumb.Item>
            </Breadcrumb>
            <Layout className="site-layout-background">
                <Content style={{ minHeight: 280 }}>
                    <MusicTable setPlaylist={setPlaylist} />
                </Content>
            </Layout>
            <Footer>
                <Player music={playlist} />
            </Footer>
        </section>
    )
}

export default Music
