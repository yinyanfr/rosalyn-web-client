import React, { useState, useEffect, useContext } from 'react'
import { Form, Input, Button, Checkbox, Spin, Alert } from 'antd'
import useReq from '../services/useReq'
import AppContext from '../AppContext'

const LoginForm = ({ register }) => {

    const [run, { loading, res, err }] = useReq("POST", (register ? "/register" : "/login"))
    const { setUser } = useContext(AppContext)

    const submit = ({ email, password, username }) => {
        if (!loading) {
            run({
                body: { email, password, username }
            })
        }
    }

    useEffect(() => {
        if (res?.body?.token) {
            localStorage.setItem("token", res.body.token)
            setUser(res.body)
        }
    }, [res])

    return (
        <Spin spinning={loading}>
            <Form
                name="login"
                initialValues={{ remember: true }}
                onFinish={submit}
            >
                <Form.Item
                    label="Email"
                    name="email"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Password"
                    name="password"
                    rules={[{ required: true, message: 'Please input your password!' }]}
                >
                    <Input.Password />
                </Form.Item>

                {
                    register
                        ? (
                            <Form.Item
                                label="Username"
                                name="username"
                            >
                                <Input />
                            </Form.Item>

                        )
                        : (
                            <Form.Item name="remember" valuePropName="checked">
                                <Checkbox>Remember me</Checkbox>
                            </Form.Item>
                        )
                }

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Submit
                    </Button>
                </Form.Item>
            </Form>
            {
                err
                    ? (
                        <Alert
                            message="Failed"
                            description={err}
                            type="error"
                        />
                    )
                    : ""
            }
        </Spin>
    )
}

export default LoginForm
