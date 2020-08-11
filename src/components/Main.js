import React, { useState, useEffect } from 'react'

import { Layout, Menu, Drawer } from 'antd'
import Music from './Music'
import Radio from "./Radio"
import "./Main.scss"
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import Auth from "../middlewares/Auth"
import Admin from "./Admin"
import MainContext from "./MainContext"
import Player from './Player'
import Welcome from './Welcome'

const { Header, Content, Footer } = Layout

const Main = () => {

    const history = useHistory()
    const location = useLocation()

    const stored = localStorage.getItem("playlist")

    const [playlist, setPlaylist] = useState(
        stored ? JSON.parse(stored) : []
    )

    const [audioInfo, setAudioInfo] = useState(null)
    const [player, setPlayer] = useState(null)

    const [drawer, setDrawer] = useState(true)

    const onTrackChange = (currentPlayId, audioLists) => {
        let audioInfo = audioLists.find(e => e.id === currentPlayId)
        if (audioInfo) {
            const { name, singer, cover, album, _id } = audioInfo
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
        <MainContext.Provider value={{
            playlist, setPlaylist,
            audioInfo, setAudioInfo,
            player,
        }}>
            <Layout className="main-layout">
                <Header className="header">
                    {/* <div className="logo">Hi</div> */}
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[location.pathname]}
                        onSelect={({ item, key }) => {
                            history.push(key)
                        }}
                    >
                        <Menu.Item key="/radio">Radio</Menu.Item>
                        <Menu.Item key="/library">Library</Menu.Item>
                        <Menu.Item key="/mylist">My List</Menu.Item>
                        <Menu.Item key="/setting">Setting</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 1vw' }}>
                    <Auth>
                        <Switch>
                            <Route path="/library">
                                <Music />
                            </Route>

                            <Route path="/radio">
                                <Radio />
                            </Route>

                            <Route path="/mylist">

                            </Route>

                            <Route path="/setting">

                            </Route>

                            <Route path="/admin">
                                <Auth rank="Admin">
                                    <Admin />
                                </Auth>
                            </Route>

                            <Route>
                                <Music />
                            </Route>
                        </Switch>
                    </Auth>

                    <Drawer
                        title="Hello"
                        placement="right"
                        visible={drawer}
                        onClose={() => {
                            setDrawer(false)
                        }}
                    >
                        <Welcome />
                    </Drawer>
                </Content>
                <Footer>
                    <Player
                        music={playlist}
                        onTrackChange={onTrackChange}
                        getPlayer={player => {
                            setPlayer(player)
                        }}
                    />
                </Footer>

            </Layout>
        </MainContext.Provider>
    )
}

export default Main
