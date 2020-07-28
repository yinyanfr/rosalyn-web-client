import React, { useState } from 'react'
import { Tabs } from 'antd'
import LoginForm from './LoginForm'

const { TabPane } = Tabs

const Login = () => {

    return (
        <Tabs defaultActiveKey="1">
            <TabPane tab="Login" key="1">
                <LoginForm />
            </TabPane>
            <TabPane tab="Register" key="2">
                <LoginForm register />
            </TabPane>
        </Tabs>
    )
}

export default Login
