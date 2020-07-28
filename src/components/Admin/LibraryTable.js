import React, { useState, useEffect } from 'react'
import { Table, Button, Spin, message, Empty } from 'antd'
import useReq from '../../services/useReq'
import LibraryForm from './LibraryForm'

const columns = [
    {
        title: "Path", name: "path", key: "path",
    },
    {
        title: "Name", name: "name", key: "name",
    },
    {
        title: "Actions", name: "actions", key: "actions",
        render: (text, record, index) => (
            <>
                <Button
                    type="primary"
                >
                    Update
                </Button>
                <Button
                    danger
                >
                    Remove
                </Button>
            </>
        )
    }
]

const LibraryTable = () => {
    const [getlibs, { res }] = useReq('GET', "/library/all")
    const [update, updateReq] = useReq("POST", "/library/add")
    const [remove, removeReq] = useReq("DELETE", "/library/remove")

    useEffect(getlibs, [])

    return (
        res?.body
            ? (
                <Spin loading={updateReq.loading || removeReq.loading}>
                    <Table
                        columns={columns}
                        dataSource={res.body.map(e => ({ ...e, key: e._id }))}
                    />
                </Spin>
            )
            : <Empty />
    )
}

export default LibraryForm
