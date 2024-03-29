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
import Mine from './Mine'
import convert from "../tools/convert"
import useReq from '../services/useReq'

const { Header, Content, Footer } = Layout

const Main = () => {

    const history = useHistory()
    const location = useLocation()

    const stored = localStorage.getItem("playlist")

    const [playlist, setPlaylistRaw] = useState(
        // stored ? JSON.parse(stored) : []
        []
    )

    const [getFavorite, { res: favoriteRes }] = useReq("GET", "/music/favorite")
    const [favorite, setFavorite] = useState([])

    const setPlaylist = music => {
        setPlaylistRaw(convert(music))
    }

    const [audioInfo, setAudioInfo] = useState(null)
    const [player, setPlayer] = useState(null)

    const [drawer, setDrawer] = useState(false)

    const onTrackChange = (currentPlayId, audioLists) => {
        let audioInfo = audioLists.find(e => e.id === currentPlayId)
        if (audioInfo) {
            const { name, singer, cover, album, _id } = audioInfo
            document.title = `${name} - ${singer}`
            setAudioInfo({
                title: name,
                artist: singer,
                picture: [cover],
                album,
                _id,
            })
        }
    }

    useEffect(() => {
        if (location.pathname.match(/^\/share/) && playlist.length) {
            const { name, singer, cover, album, _id } = playlist[0]
            document.title = `${name} - ${singer}`
            setAudioInfo({
                title: name,
                artist: singer,
                picture: [cover],
                album,
                _id,
            })
        }
    }, [playlist])

    useEffect(() => {
        const token = localStorage.getItem("token")
        getFavorite({ token })
    }, [])

    useEffect(() => {
        setFavorite(favoriteRes?.body ?? [])
    }, [favoriteRes])

    const onAudioPlay = (audioInfo) => {
        if (audioInfo) {
            const { name, singer, cover, album, _id } = audioInfo
            document.title = `${name} - ${singer}`
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
            playlist, setPlaylist, setPlaylistRaw,
            audioInfo, setAudioInfo,
            player, favorite, setFavorite,
        }}>
            <Layout className="main-layout">
                <Header className="header">
                    {/* <div className="logo">Hi</div> */}
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={[
                            location.pathname === "/radio" || location.pathname.match(/^\/share/)
                                ? "/player"
                                : location.pathname
                        ]}
                        onSelect={({ item, key }) => {
                            history.push(key)
                        }}
                    >
                        <Menu.Item key="/player">Player</Menu.Item>
                        <Menu.Item key="/library">Library</Menu.Item>
                        <Menu.Item key="/mylist">My List</Menu.Item>
                        <Menu.Item key="/setting">Setting</Menu.Item>
                    </Menu>
                </Header>
                <Content style={{ padding: '0 1vw' }}>
                    <Auth exceptions={["share"]}>
                        <Switch>
                            <Route path="/library">
                                <Music />
                            </Route>

                            <Route path="/player">
                                <Radio />
                            </Route>

                            <Route path="/radio">
                                <Radio radio />
                            </Route>

                            <Route path="/share">
                                <Radio share />
                            </Route>

                            <Route path="/mylist">
                                <Mine />
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
                        onAudioPlay={onAudioPlay}
                    />
                </Footer>

            </Layout>
        </MainContext.Provider>
    )
}

export default Main
