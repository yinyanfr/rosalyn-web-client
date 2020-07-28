import React, { useState, useEffect } from 'react'
import { Form, Input, Button, Checkbox, Spin, message } from 'antd'
import useReq from '../../services/useReq'

const LibraryForm = () => {

    const [add, { loading, res, err }] = useReq("POST", "/library/add")

    const addDir = ({ path, rec, name, description }) => {
        const token = localStorage.getItem("token")
        add({
            body: { path, rec, name, description },
            token,
        })
        .then(() => {
            message.success("Successfully added a repository")
        })
        .catch(err => {
            message.error("Failed to add this repostory.")
        })
    }


    return (
        <Spin spinning={loading}>
            <Form
                name="add_dir"
            >
                <Form.Item
                    label="Path"
                    name="path"
                    rules={[{ required: true, message: 'Please input your email!' }]}
                    help="Absolute path of the repository that contains music files on your SERVER."
                >
                    <Input />
                </Form.Item>

                <Form.Item name="rec" valuePropName="checked">
                    <Checkbox>including children repos</Checkbox>
                </Form.Item>

                <Form.Item
                    label="Name"
                    name="name"
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Description"
                    name="description"
                >
                    <Input.TextArea rows={10} />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Add Library
                    </Button>
                </Form.Item>

            </Form>
        </Spin>
    )
}

export default LibraryForm
