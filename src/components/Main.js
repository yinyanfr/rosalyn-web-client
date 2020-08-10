import React, { useState, useEffect } from 'react'

import { Layout, Menu, Breadcrumb } from 'antd'
import Music from './Music'
import Radio from "./Radio"
import "./Main.scss"
import { BrowserRouter as Router, Route, Switch, useHistory, useLocation } from 'react-router-dom'

const { Header, Content, Footer } = Layout

const Main = () => {

    const history = useHistory()
    const location = useLocation()

    return (
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

                    <Route>
                        <Music />
                    </Route>
                </Switch>
            </Content>

        </Layout>
    )
}

export default Main
